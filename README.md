# Expense Tracker — Ledger UI

A practice project: a static HTML/CSS interface styled like a ledger book (bank passbook / accounting ledger), left as a scaffold for you to wire up with vanilla JavaScript.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure — spine sidebar + ledger table + entry form |
| `style.css` | All styling, layout, and design tokens |
| `script.js` | Starter scaffold — DOM references + `TODO`s, no logic yet |

Open `index.html` in a browser to view it as-is. Nothing is interactive until `script.js` is filled in.

## Design concept

The interface is modeled on a physical ledger book rather than a typical dashboard:

- **Spine** (left, dark green) — the "cover" of the book. Shows your running balance, a month selector, and a category breakdown.
- **Page** (right, parchment) — the "paper." Holds the add-entry form and a ruled transaction table with running balance per row.

Fonts: **Fraunces** (serif, headings) + **JetBrains Mono** (tabular figures for all money values, so amounts align in columns).

## Data shape

Each transaction is expected to look like this:

```js
{
  id: 1,
  date: "2026-09-04",
  description: "Naivas groceries",
  category: "food",       // food | transport | rent | utilities | business | leisure | other
  type: "debit",          // "debit" (expense) or "credit" (income)
  amount: 2450.00
}
```

Categories match the `<option>` values in the `#entry-category` select in `index.html`.

## Key DOM elements (`script.js` reference)

| Element | id | Notes |
|---|---|---|
| Form | `#entry-form` | Submit event → build a transaction |
| Date/Desc/Category/Type/Amount inputs | `#entry-date`, `#entry-desc`, `#entry-category`, `#entry-type`, `#entry-amount` | Read on submit |
| Table body | `#ledger-body` | Rows get appended here |
| Empty state message | `#empty-state` | Toggle visible when no transactions |
| Balance display | `#balance-amount` | Total credits − total debits |
| Totals | `#total-credit`, `#total-debit` | Sum of each type |
| Category list | `#category-list` | Rebuilt from grouped totals |
| Period nav | `#period-nav` | Buttons with `data-period="YYYY-MM"` or `"all"` |

## Build order (suggested)

1. **TODO 1** — Handle form submit: read inputs, push a transaction object, reset the form, re-render.
2. **TODO 2** — Render the table: loop transactions in date order, compute a running balance, build `<tr>` rows.
3. **TODO 3** — Render totals: sum credits/debits, format with `formatKES()`, update the spine.
4. **TODO 5** — Remove a transaction: event delegation on `#ledger-body`, filter by `data-id`.
5. **TODO 4** — Render category breakdown: group by category, scale bar widths against the largest total.
6. **TODO 6 (stretch)** — Period filtering: filter transactions by month when a `#period-nav` button is clicked.

A `formatKES(amount)` helper is already included — it returns strings like `KES 12,345.00`.

## Notes

- Row markup shape is shown as an HTML comment inside `#ledger-body` in `index.html` — match that structure when you build rows in JS.
- No backend, no persistence — everything lives in the `transactions` array in memory. Refreshing the page clears it (a good next step once the core logic works: `localStorage`).
