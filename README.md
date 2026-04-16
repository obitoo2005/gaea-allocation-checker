# Gaea Allocation Checker

A small web app to estimate **GAEA token allocation** from **Soul Points (SP)** and **Soul XP (SXP)** using your own conversion ratios, plus a selected **Fully Diluted Valuation (FDV)** to derive implied token price and USD value of the allocation.

Live logic in the UI:

- `tokensFromSP = SP × SP_ratio`
- `tokensFromSXP = SXP × SXP_ratio`
- `total_tokens = tokensFromSP + tokensFromSXP`
- `token_price = FDV ÷ 1_000_000_000` (fixed total supply assumption)
- `allocation_value = total_tokens × token_price`

## Features

- Separate inputs for SP and SXP with custom SP→GAEA and SXP→GAEA ratios
- FDV presets ($50M–$500M) or custom FDV in USD
- Real-time results: per-source tokens, total allocation, token price, total USD value
- Input sanitization (non-negative values; empty fields treated safely)
- Shareable state via URL query parameters (updates as you edit)
- Dark, minimal black-and-white UI with a short in-app disclaimer at the bottom

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

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server with HMR |
| `npm run build`| Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint               |

## URL parameters (optional)

The app can read and sync these query parameters:

- `sp`, `spRatio`, `sxp`, `sxpRatio`
- `preset` (preset FDV value as a number string, or `custom`)
- `fdv` (custom FDV when using custom preset)

Example:

`/?sp=46500&spRatio=0.5&sxp=7300&sxpRatio=0.5&preset=100000000`

## Disclaimer

**This tool provides estimates only.** Results depend on the inputs and assumptions you enter (including FDV and conversion ratios) and **may not match** any official allocation, airdrop, or token distribution.

**Nothing in this repository or application is financial, investment, or tax advice.** Use at your own risk and **verify all figures with official Gaea sources** before making any decisions.

The authors and contributors are not responsible for any loss or damage arising from use of this software or reliance on its outputs.

---

Repository: [github.com/obitoo2005/gaea-allocation-checker](https://github.com/obitoo2005/gaea-allocation-checker)
