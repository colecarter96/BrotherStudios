# Test Workflows

This document lists test flows you can run (and extend) for the site.

## Unit / Integration (Vitest)

### Cart logic (useCart)
- Add items → merges by `priceId + size`
- Update item quantity
- Remove item
- Clear cart
- Checkout posts to `/api/checkout`:
  - Metadata includes `size`, `slug`, `title`, `priceId`
  - Redirects to `/success?session_id=...`

### API: `/api/checkout`
- Batch checkout:
  - Resolves product/price IDs
  - `allow_promotion_codes: true`
  - `metadata.cart` (JSON) includes `title`, `slug`, `size`, `quantity`, `priceId`
  - Shipping rates applied conditionally
- Single-item checkout:
  - `metadata` and `payment_intent_data.metadata` include `title` and `priceId`

### Success Page (server)
- Given a `session_id`, loads Stripe session + line items
- Renders order id, total, items (qty + subtotals), and receipt email
- Shows a helpful message if session cannot be loaded

## End-to-End (Playwright - suggested)

Not included yet, but recommended flows:
- PDP → choose size → Add to Bag → Bag shows 1 row with correct size
- Change quantity and size in Bag; Clear bag → shows empty state
- Checkout (route-mocked to `/success`) → lands on `/success` with heading

## Running tests

```bash
npm run test        # run once
npm run test:watch  # watch mode
```

## Extending
- Add Playwright for full E2E (stripe route mocked in test).
- Add visual regression on the home hero and 2x2 grid.
- Add accessibility checks (axe) on critical pages (home, PDP, bag, success).

