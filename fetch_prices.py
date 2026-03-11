#!/usr/bin/env python3
"""
Claduta Corp — Commodity Price Fetcher
Runs via GitHub Actions every 6 hours.
Outputs: prices.json to repo root (read by commodities page)

FOB prices = YOUR supplier contract prices. Update SUPPLIER_FOB when pricing changes.
CIF = FOB + freight estimates + 0.5% insurance. Recalculates every run.

Coffee is split into two separate commodities:
  - coffee_arabica:  NY 2/3 Screen 17/18 — FOB Santos — ICE Coffee C (New York)
  - coffee_robusta:  Conilon 7/8 — FOB Vitoria — ICE Robusta (London)
"""

import json
import re
from datetime import datetime, timezone

import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/121.0.0.0 Safari/537.36"
}

# ── SUPPLIER FOB PRICES (USD/MT) ─────────────────────────────────────────────
# These are YOUR prices from supplier. Update when pricing changes.
# Arabica  = NY 2/3 Screen 17/18 (premium grade, ICE Coffee C — New York)
# Robusta  = Conilon 7/8 Standard (ICE Robusta — London)
# Last updated: Mar 2026
SUPPLIER_FOB = {
    "pepper_brazil_black_asta570": 6175,  # USD/MT FOB Vitoria
    "sugar_icumsa45":               560,  # USD/MT FOB Santos
    "coffee_arabica":              6292,  # USD/MT FOB Santos — NY 2/3 Screen 17/18 (+10% on $5,720)
    "coffee_robusta":              4715,  # USD/MT FOB Vitoria — Conilon 7/8 (+10% on $4,286.47)
}

# ── FREIGHT ESTIMATES (USD/MT, 20ft container) ───────────────────────────────
# Update quarterly from Freightos or your forwarder
FREIGHT = {
    "dubai":     85,
    "singapore": 110,
    "lagos":     120,
    "jakarta":   130,
    "guangzhou": 105,
}

INSURANCE_RATE = 0.005  # 0.5% of FOB


def fetch_pepper_ipc():
    """Try live IPC scrape for Brazil Black Pepper ASTA 570. Fall back to SUPPLIER_FOB."""
    try:
        r = requests.get("https://www.ipcnet.org/", headers=HEADERS, timeout=15)
        soup = BeautifulSoup(r.text, "html.parser")
        for row in soup.find_all("tr"):
            cells = row.find_all("td")
            if len(cells) >= 2:
                label = cells[0].get_text(strip=True)
                if "Brazil Black" in label and "570" in label:
                    raw = cells[1].get_text(strip=True).replace(",", "")
                    price = float(re.sub(r"[^\d.]", "", raw))
                    print(f"[Pepper] IPC live price: ${price}/MT")
                    return price
    except Exception as e:
        print(f"[Pepper] IPC scrape failed: {e}")
    fallback = SUPPLIER_FOB["pepper_brazil_black_asta570"]
    print(f"[Pepper] Using supplier FOB: ${fallback}/MT")
    return fallback


def fetch_sugar_price():
    """Use supplier FOB price. Update SUPPLIER_FOB manually when pricing changes."""
    price = SUPPLIER_FOB["sugar_icumsa45"]
    print(f"[Sugar] Supplier FOB: ${price}/MT")
    return price


def fetch_coffee_arabica():
    """
    Arabica — ICE Coffee C (New York), NY 2/3 Screen 17/18.
    Use supplier FOB price. Update SUPPLIER_FOB manually when pricing changes.
    """
    price = SUPPLIER_FOB["coffee_arabica"]
    print(f"[Coffee Arabica] Supplier FOB: ${price}/MT")
    return price


def fetch_coffee_robusta():
    """
    Robusta/Conilon — ICE Robusta (London), Conilon 7/8 Standard.
    Use supplier FOB price. Update SUPPLIER_FOB manually when pricing changes.
    """
    price = SUPPLIER_FOB["coffee_robusta"]
    print(f"[Coffee Robusta] Supplier FOB: ${price}/MT")
    return price


def calc_cif(fob, dest):
    """CIF = FOB + Freight + Insurance (0.5% of FOB)"""
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


def main():
    print("=== Claduta Price Fetcher ===")
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    pepper_fob        = fetch_pepper_ipc()
    sugar_fob         = fetch_sugar_price()
    arabica_fob       = fetch_coffee_arabica()
    robusta_fob       = fetch_coffee_robusta()

    dests = list(FREIGHT.keys())

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
                "price": arabica_fob,
                "unit": "USD/MT",
                "source": "ICE Coffee C — New York (NY 2/3 Screen 17/18)",
                "grade": "Green Arabica NY 2/3"
            },
            "coffee_robusta": {
                "price": robusta_fob,
                "unit": "USD/MT",
                "source": "ICE Robusta — London (Conilon 7/8)",
                "grade": "Conilon Robusta 7/8 Standard"
            }
        },
        "freight_usd_mt": FREIGHT,
        "cif": {
            "pepper":         {d: calc_cif(pepper_fob,  d) for d in dests},
            "sugar":          {d: calc_cif(sugar_fob,   d) for d in dests},
            "coffee_arabica": {d: calc_cif(arabica_fob, d) for d in dests},
            "coffee_robusta": {d: calc_cif(robusta_fob, d) for d in dests},
        }
    }

    with open("prices.json", "w") as f:
        json.dump(data, f, indent=2)

    print(f"\n✓ Written to prices.json")
    print(f"  Pepper:         ${pepper_fob}/MT FOB  | CIF Dubai: ${data['cif']['pepper']['dubai']['cif']}/MT")
    print(f"  Sugar:          ${sugar_fob}/MT FOB   | CIF Dubai: ${data['cif']['sugar']['dubai']['cif']}/MT")
    print(f"  Coffee Arabica: ${arabica_fob}/MT FOB | CIF Dubai: ${data['cif']['coffee_arabica']['dubai']['cif']}/MT")
    print(f"  Coffee Robusta: ${robusta_fob}/MT FOB | CIF Dubai: ${data['cif']['coffee_robusta']['dubai']['cif']}/MT")
    return data


if __name__ == "__main__":
    main()
