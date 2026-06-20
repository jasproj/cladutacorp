#!/usr/bin/env python3
"""
push_to_call_tracker.py
Pushes whatsapp_all_contactable.csv to the Claduta Call Tracker Google Sheet.
Deduplicates by phone. Skips active deals.
Run: /usr/bin/python3 ~/cladutacorp/push_to_call_tracker.py
"""

import sys, os, csv
sys.path.insert(0, '/usr/local/lib/python3.9/site-packages')

import gspread
from google.oauth2.service_account import Credentials

# ── CONFIG ────────────────────────────────────────────────────────────────────

CREDS_FILE   = os.path.expanduser("~/.secrets/claduta-sheets-service-account.json")
TRACKER_ID   = "1bZaDKj8I3jJPNxkoS57pZAl7U2DBqR_AK-WZ_0aH7lM"
WA_CSV       = os.path.expanduser("~/cladutacorp/whatsapp/whatsapp_all_contactable.csv")

# Active deals — never overwrite these
PROTECTED_EMAILS = {
    "omar@coffeebeansksa.com",
    "supply@coffeebeansksa.com",
    "waleed@coffeebeansksa.com",
    "md@ceylonsugar.com",
    "ty@gssfoods.com",
    "info@qnie.com",
    "mail@mincing.com",
}

COLUMNS = [
    "Company", "Contact Name", "Phone", "Email", "Country",
    "Product Interest", "Call Date", "Called By", "Outcome",
    "Notes", "Next Step", "Follow-up Date", "WhatsApp", "Status"
]

SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]

# ── MAIN ──────────────────────────────────────────────────────────────────────

def main():
    print("Loading credentials...")
    creds = Credentials.from_service_account_file(CREDS_FILE, scopes=SCOPES)
    gc = gspread.authorize(creds)
    sh = gc.open_by_key(TRACKER_ID)

    # Get or create sheet
    try:
        ws = sh.worksheet("Leads")
    except gspread.WorksheetNotFound:
        ws = sh.add_worksheet("Leads", rows=2000, cols=20)
        ws.append_row(COLUMNS)
        print("Created 'Leads' tab")

    # Load existing phones to dedup
    existing = ws.get_all_records()
    existing_phones = set()
    existing_emails = set()
    for row in existing:
        p = str(row.get("Phone", "")).strip()
        e = str(row.get("Email", "")).strip().lower()
        if p:
            existing_phones.add(p)
        if e:
            existing_emails.add(e)

    print(f"Existing rows: {len(existing)} | Phones: {len(existing_phones)}")

    # Load WA contacts
    new_rows = []
    skipped = 0
    with open(WA_CSV, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            email = (row.get("Email") or "").strip().lower()
            phone = (row.get("Phone_Clean") or row.get("Phone") or "").strip()
            company = (row.get("Company") or "").strip()
            country = (row.get("Country/Region") or row.get("Country") or "").strip()
            product = (row.get("Product") or "").strip()
            wa = (row.get("WhatsApp_Likelihood") or row.get("WhatsApp_Confirmed") or "").strip()

            # Skip protected
            if email in PROTECTED_EMAILS:
                skipped += 1
                continue

            # Skip dupes
            if phone and phone in existing_phones:
                skipped += 1
                continue
            if email and email in existing_emails:
                skipped += 1
                continue

            new_rows.append([
                company,           # Company
                "",                # Contact Name
                phone,             # Phone
                email,             # Email
                country,           # Country
                product,           # Product Interest
                "",                # Call Date
                "",                # Called By
                "",                # Outcome
                "",                # Notes
                "",                # Next Step
                "",                # Follow-up Date
                "YES" if wa in ("HIGH", "MEDIUM") else "",  # WhatsApp
                "NEW",             # Status
            ])

            if phone:
                existing_phones.add(phone)
            if email:
                existing_emails.add(email)

    print(f"New rows to add: {len(new_rows)} | Skipped: {skipped}")

    if new_rows:
        # Batch append
        ws.append_rows(new_rows, value_input_option="RAW")
        print(f"✓ Added {len(new_rows)} rows to Call Tracker")
    else:
        print("Nothing new to add.")

    print(f"Sheet: https://docs.google.com/spreadsheets/d/{TRACKER_ID}/edit")

if __name__ == "__main__":
    main()
