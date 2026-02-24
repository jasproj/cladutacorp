#!/usr/bin/env python3
"""
Claduta Corp — Commodity Price Fetcher
Runs via GitHub Actions every 6 hours.
Outputs: prices.json to repo root (read by commodities page)

Sources:
- Black Pepper: IPC (ipcnet.org) — scraped
- Sugar ICUMSA 45: Quandl/ICE proxy via investing.com scrape or hardcoded fallback
- Coffee Arabica: ICE C proxy
- Freight: Freightos API (free tier) or flat estimates by route

Output format:
{
  "updated": "2026-02-23T14:00:00Z",
  "pepper": {
    "brazil_black_asta570": { "fob_usd_mt": 6125, "source": "IPC" }
  },
  "sugar": {
    "icumsa45": { "fob_usd_mt": 520, "source": "ICE #5 proxy" }
  },
  "coffee": {
    "arabica_green": { "fob_usd_mt": 5200, "source": "ICE C proxy" }
  },
  "freight": {
    "santos_to_dubai": 85,
    "santos_to_singapore": 110,
    "santos_to_lagos": 120,
    "santos_to_jakarta": 130
  },
  "cif": {
    "pepper": {
      "dubai": null,
      "singapore": null,
      "lagos": null,
      "jakarta": null
    },
    "sugar": { ... },
    "coffee": { ... }
  }
}
"""

import json
import re
import sys
from datetime import datetime, timezone

import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/121.0.0.0 Safari/537.36"
}

# ── Fallback prices (updated manually when scrapers break) ──────────────────
FALLBACKS = {
    "pepper_brazil_black": 6125,   # USD/MT — IPC Feb 20 2026
    "sugar_icumsa45":       520,   # USD/MT — approx ICE London #5
    "coffee_arabica":      5200,   # USD/MT — approx ICE C (NY)
}

# ── Flat freight estimates Santos → port (USD/MT, 20ft container) ───────────
# Update quarterly from Freightos or your forwarder
FREIGHT = {
    "dubai":     85,
    "singapore": 110,
    "lagos":     120,
    "jakarta":   130,
    "guangzhou": 105,
}

INSURANCE_RATE = 0.005  # 0.5% of FOB


# ────────────────────────────────────────────────────────────────────────────
# SCRAPER: IPC Black Pepper (Brazil ASTA 570)
# ────────────────────────────────────────────────────────────────────────────
def fetch_pepper_ipc():
    url = "https://www.ipcnet.org/"
    try:
        r = requests.get(url, headers=HEADERS, timeout=15)
        soup = BeautifulSoup(r.text, "html.parser")
        # Find the daily prices table
        for row in soup.find_all("tr"):
            cells = row.find_all("td")
            if len(cells) >= 2:
                label = cells[0].get_text(strip=True)
                if "Brazil Black" in label and "570" in label:
                    raw = cells[1].get_text(strip=True).replace(",", "")
                    price = float(re.sub(r"[^\d.]", "", raw))
                    print(f"[IPC] Brazil Black Pepper ASTA 570: ${price}/MT")
                    return price
    except Exception as e:
        print(f"[IPC] Scrape failed: {e}")
    print(f"[IPC] Using fallback: ${FALLBACKS['pepper_brazil_black']}/MT")
    return FALLBACKS["pepper_brazil_black"]


# ────────────────────────────────────────────────────────────────────────────
# SCRAPER: Sugar ICUMSA 45 — proxy via macrotrends or hardcoded
# ICE London #5 white sugar futures (USD/MT)
# Free public source: markets.businessinsider.com or hardcoded
# ────────────────────────────────────────────────────────────────────────────
def fetch_sugar_price():
    """
    Try to get ICE White Sugar #5 front-month price.
    Falls back to last known price if scrape fails.
    ICUMSA 45 Brazil = ICE #5 + ~$10-20 premium typically.
    """
    try:
        # Try investing.com sugar futures page (fragile but often works)
        url = "https://www.investing.com/commodities/white-sugar"
        r = requests.get(url, headers=HEADERS, timeout=15)
        soup = BeautifulSoup(r.text, "html.parser")
        # Look for price in data attributes or spans
        tag = soup.find("span", {"data-test": "instrument-price-last"})
        if tag:
            raw = tag.get_text(strip=True).replace(",", "")
            # investing.com shows price in USD/ton (short ton) — convert
            price_per_short_ton = float(re.sub(r"[^\d.]", "", raw))
            # ICE #5 quoted in USD per metric ton already
            price = price_per_short_ton
            print(f"[Sugar] ICE #5 price: ${price}/MT")
            return price
    except Exception as e:
        print(f"[Sugar] Scrape failed: {e}")

    print(f"[Sugar] Using fallback: ${FALLBACKS['sugar_icumsa45']}/MT")
    return FALLBACKS["sugar_icumsa45"]


# ────────────────────────────────────────────────────────────────────────────
# SCRAPER: Arabica Coffee — ICE C front month (cents/lb → USD/MT)
# ────────────────────────────────────────────────────────────────────────────
def fetch_coffee_price():
    try:
        url = "https://www.investing.com/commodities/coffee"
        r = requests.get(url, headers=HEADERS, timeout=15)
        soup = BeautifulSoup(r.text, "html.parser")
        tag = soup.find("span", {"data-test": "instrument-price-last"})
        if tag:
            raw = tag.get_text(strip=True).replace(",", "")
            cents_per_lb = float(re.sub(r"[^\d.]", "", raw))
            # Convert cents/lb → USD/MT: × 100 lb/cwt × 22.0462 cwt/MT
            usd_per_mt = round((cents_per_lb / 100) * 2204.62, 0)
            print(f"[Coffee] ICE C: {cents_per_lb}¢/lb = ${usd_per_mt}/MT")
            return usd_per_mt
    except Exception as e:
        print(f"[Coffee] Scrape failed: {e}")

    print(f"[Coffee] Using fallback: ${FALLBACKS['coffee_arabica']}/MT")
    return FALLBACKS["coffee_arabica"]


# ────────────────────────────────────────────────────────────────────────────
# CIF CALCULATOR
# CIF = FOB + Freight + Insurance(FOB × 0.5%)
# ────────────────────────────────────────────────────────────────────────────
def calc_cif(fob, dest):
    freight = FREIGHT.get(dest, 100)
    insurance = round(fob * INSURANCE_RATE, 2)
    cif = round(fob + freight + insurance, 0)
    return {
        "fob": fob,
        "freight": freight,
        "insurance": insurance,
        "cif": cif,
        "dest": dest
    }


# ────────────────────────────────────────────────────────────────────────────
# MAIN
# ────────────────────────────────────────────────────────────────────────────
def main():
    print("=== Claduta Price Fetcher ===")
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    pepper_fob = fetch_pepper_ipc()
    sugar_fob  = fetch_sugar_price()
    coffee_fob = fetch_coffee_price()

    destinations = list(FREIGHT.keys())

    data = {
        "updated": now,
        "note": "Prices are indicative. CIF = FOB + freight + 0.5% insurance. Contact us for firm quotes.",
        "fob": {
            "pepper_brazil_black_asta570": {
                "price": pepper_fob,
                "unit": "USD/MT",
                "source": "IPC (ipcnet.org)",
                "grade": "Brazil Black Pepper ASTA 570"
            },
            "sugar_icumsa45": {
                "price": sugar_fob,
                "unit": "USD/MT",
                "source": "ICE London #5 (indicative)",
                "grade": "ICUMSA 45 White Refined"
            },
            "coffee_arabica": {
                "price": coffee_fob,
                "unit": "USD/MT",
                "source": "ICE C NY (indicative)",
                "grade": "Green Arabica"
            }
        },
        "freight_usd_mt": FREIGHT,
        "cif": {
            "pepper": {d: calc_cif(pepper_fob, d) for d in destinations},
            "sugar":  {d: calc_cif(sugar_fob, d)  for d in destinations},
            "coffee": {d: calc_cif(coffee_fob, d) for d in destinations},
        }
    }

    out = "prices.json"
    with open(out, "w") as f:
        json.dump(data, f, indent=2)

    print(f"\n✓ Written to {out}")
    print(f"  Pepper: ${pepper_fob}/MT FOB | CIF Dubai: ${data['cif']['pepper']['dubai']['cif']}/MT")
    print(f"  Sugar:  ${sugar_fob}/MT FOB | CIF Dubai: ${data['cif']['sugar']['dubai']['cif']}/MT")
    print(f"  Coffee: ${coffee_fob}/MT FOB | CIF Dubai: ${data['cif']['coffee']['dubai']['cif']}/MT")
    return data


if __name__ == "__main__":
    main()
