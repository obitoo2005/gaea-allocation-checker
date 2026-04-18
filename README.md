# Gaea Allocation Checker

A small web app to estimate **GAEA token allocation** from **Soul Points (SP)** and **Soul XP (SXP)** using custom conversion ratios, an optional **Godhood ID boost**, additive **Discord role allocations**, and **NFT tier allocations**. It also uses a selected **Fully Diluted Valuation (FDV)** to derive implied token price and USD value.

Live logic in the UI:

- `tokens_from_sp = SP * SP_ratio`
- `tokens_from_sxp = SXP * SXP_ratio`
- `base_total_tokens = tokens_from_sp + tokens_from_sxp`
- `boost = based on Godhood ID level`
- `boosted_tokens = base_total_tokens * (1 + boost)`
- `role_tokens = sum of selected Discord role allocations`
- `nft_tokens = sum(quantity * allocation_per_nft for each selected tier)`
- `final_tokens = boosted_tokens + role_tokens + nft_tokens`
- `token_price = FDV / 1_000_000_000` (fixed total supply assumption)
- `allocation_value = final_tokens * token_price`

Godhood boost tiers:

- Levels `1-9` -> `5%`
- Levels `10-19` -> `10%`
- Levels `20-30` -> `20%`
- Empty or invalid input -> `0%`

## Features

- Separate inputs for SP and SXP with custom SP-to-GAEA and SXP-to-GAEA ratios
- Godhood ID level input with automatic boost bands from level `1` to `30`
- Discord role allocation section with multi-select support for:
  - `Olympus God`
  - `Titan God`
  - `Anima Origin`
  - `Supportive God`
  - `Ambassador`
- NFT configuration section with tier-by-tier inputs for:
  - `Tier 1`
  - `Tier 2`
  - `Tier 3`
  - `Tier 4`
- Real-time results for SP tokens, SXP tokens, base tokens, boost percentage, boosted tokens, role tokens, NFT tokens, final total tokens, token price, and total USD value
- Input sanitization with safe handling for empty values and no negative numbers in calculations

## Tech stack

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [Framer Motion](https://www.framer.com/motion/) (result number transitions)

## Getting started

```bash
git clone https://github.com/obitoo2005/gaea-allocation-checker.git
cd gaea-allocation-checker
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## URL parameters (optional)

The app can read and sync these query parameters:

- `sp`, `spRatio`, `sxp`, `sxpRatio`
- `preset` (preset FDV value as a number string, or `custom`)
- `fdv` (custom FDV when using custom preset)
- `godhoodLevelBoost`
- Discord roles:
  - `<roleKey>Selected`
  - `<roleKey>Allocation`
- NFT tiers:
  - `<tierKey>Selected`
  - `<tierKey>Quantity`
  - `<tierKey>AllocationPerNft`

Role keys:

- `olympusGod`
- `titanGod`
- `animaOrigin`
- `supportiveGod`
- `ambassador`

Tier keys:

- `tier1`
- `tier2`
- `tier3`
- `tier4`

Example:

`/?sp=46500&spRatio=0.5&sxp=7300&sxpRatio=0.5&preset=100000000&godhoodLevelBoost=12&olympusGodSelected=1&olympusGodAllocation=2500&tier1Selected=1&tier1Quantity=2&tier1AllocationPerNft=500`

## Disclaimer

**This tool provides estimates only.** Results depend on the inputs and assumptions you enter, including FDV, conversion ratios, Godhood boost level, Discord role allocations, and NFT settings, and **may not match** any official allocation, airdrop, or token distribution.

**Nothing in this repository or application is financial, investment, or tax advice.** Use at your own risk and **verify all figures with official Gaea sources** before making any decisions.

The authors and contributors are not responsible for any loss or damage arising from use of this software or reliance on its outputs.

---

Repository: [github.com/obitoo2005/gaea-allocation-checker](https://github.com/obitoo2005/gaea-allocation-checker)
