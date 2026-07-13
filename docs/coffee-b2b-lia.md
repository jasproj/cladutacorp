# Legitimate Interest Assessment — Coffee B2B Cold Outreach

**Controller:** Claduta Corporation
**Prepared:** 2026-07-13 · **Owner:** Jason Dudney · **Review cycle:** every 6 months
**Scope:** Outbound B2B email to green-coffee importers, roasters, and trading
houses in the EU/EEA and UK, sent by the drip (`claduta_drip.py`, product =
`coffee`). Sugar and pepper outreach is **out of scope** and remains blocked for
these regions.

> ⚠️ **Not legal advice.** This is an internal good-faith assessment of the
> GDPR Art. 6(1)(f) legitimate-interest basis for B2B coffee outreach. Have
> counsel review before relying on it. It does **not** cover Canada (CASL) or
> Austria — both remain blocked in code.

---

## 1. Purpose test — is there a legitimate interest?

Claduta is a commodity trading intermediary sourcing Brazilian green coffee (Fine
Cup, Rio Minas, Serra de Canastra) direct from origin. The legitimate interest is
**commercial: introducing a relevant origin-supply offer to businesses whose
stated purpose is buying/importing/roasting green coffee.** The recipients are
organisations (and role inboxes), not consumers. Establishing supplier
relationships is a core, lawful business activity, and the recipients operate in
the exact market the message concerns. Precedent from real conversions
(Ekoart/Turkey, a German specialty roaster, US importers) shows the outreach is
relevant and welcomed by the target audience, not indiscriminate.

## 2. Necessity test — is direct email reasonably necessary?

Yes. Green-coffee sourcing is a relationship business conducted buyer-to-supplier;
there is no less-intrusive channel that reaches procurement decision-makers at
importers/roasters at comparable cost and specificity. The message is narrowly
targeted (coffee buyers only), low-frequency, and carries a concrete commercial
proposition — not bulk advertising. Processing is limited to the minimum needed
to make the introduction.

## 3. Balancing test — do the individual's rights override the interest?

**Data processed (data minimisation):** business email address, company name,
and business location only. **No** special-category data, **no** personal/home
data, **no** enrichment of individuals. Preference is for **functional/role
addresses** (`info@`, `sales@`, `procurement@`) over named individuals.

**Reasonable expectations:** recipients are trade businesses that publish these
addresses for commercial contact; a relevant supply enquiry is within their
reasonable expectations. Addresses are sourced from published business/trade
listings.

**Safeguards actually in force (enforced in code):**
- **Opt-out honored** — unsubscribe scanner + `suppression_unsubscribes.csv`
  merge into the suppression list every run; a `--send` is refused if the
  scanner is unhealthy/stale.
- **SendGrid suppression sync** — bounces/blocks/spam/invalid are fetched and
  excluded before every send.
- **Frequency caps** — max **3** touches per address, min **30 days** between
  touches, 4-day cooldown; daily volume capped and ramped.
- **Role-address preference & tiering** — outreach is tier-sorted toward
  functional inboxes.
- **Germany restriction** — DE is admitted for **role addresses only**
  (tier 1/2: `info@`/`sales@`/`procurement@`); named/personal German mailboxes
  are excluded, reflecting Germany's stricter UWG §7 regime.
- **Country scope** — Austria and Canada remain **blocked** (higher-risk
  regimes: AT opt-in, CA CASL). US firms are never blocked (CAN-SPAM, opt-out).

**Outcome:** Given business-only data, role-address preference, easy and honored
opt-out, strict frequency caps, and narrow targeting to the recipient's own
market, the processing is low-risk and the individuals' rights do **not**
override the legitimate interest. **Legitimate interest basis is available for
Tier-A EU/EEA/UK coffee outreach and for German role addresses.**

## 4. Rights & retention

- **Object/opt-out:** every message provides an opt-out; honored via the
  suppression list (see safeguards). Objection stops all further processing.
- **Access/erasure:** on request, the address is removed from candidate sources
  and added to suppression.
- **Retention:** addresses are retained only while the outreach programme is
  active; suppressed addresses are retained on the suppression list solely to
  guarantee we do not re-contact them.

## 5. Countries in / out of scope (coffee)

**In scope (admitted):** UK, Ireland, France, Italy, Spain, Netherlands,
Belgium, Luxembourg, Denmark, Sweden, Finland, Portugal, Greece, Poland,
Czechia, Slovakia, Slovenia, Hungary, Romania, Bulgaria, Croatia, Estonia,
Latvia, Lithuania, Malta, Cyprus, Switzerland, Norway, Iceland, Liechtenstein;
**Germany — role addresses only.**

**Out of scope (still blocked for coffee):** **Austria** (opt-in regime),
**Canada** (CASL). Non-role German addresses.

**Config location:** `COFFEE_UNBLOCK` / `COFFEE_UNBLOCK_ROLE_ONLY` in
`claduta_drip.py`. Changing scope means editing those sets and updating this
assessment.

---

*Revision history*
- 2026-07-13 — initial assessment; coffee EU/UK admitted (Tier A + DE role-only),
  Austria/Canada held.
