 // ============================================================
// Expense Tracker — starter scaffold
// The HTML/CSS is done. Your job: make it interactive.
// This file only wires up references + leaves TODOs.
// ============================================================

// ---- DOM references you'll need ----
const form          = document.getElementById('entry-form');
const dateInput      = document.getElementById('entry-date');
const descInput       = document.getElementById('entry-desc');
const categoryInput   = document.getElementById('entry-category');
const typeInput       = document.getElementById('entry-type');
const amountInput     = document.getElementById('entry-amount');

const ledgerBody     = document.getElementById('ledger-body');
const emptyState     = document.getElementById('empty-state');

const balanceAmountEl = document.getElementById('balance-amount');
const totalCreditEl   = document.getElementById('total-credit');
const totalDebitEl    = document.getElementById('total-debit');

const categoryListEl  = document.getElementById('category-list');
const periodNav       = document.getElementById('period-nav');

// ---- In-memory store ----
// Suggested shape for each transaction. Feel free to adjust.
// { id, date, description, category, type: 'debit' | 'credit', amount }
let transactions = [];

// ---- TODO 1: handle form submit ----
// - preventDefault()
// - build a transaction object from the form fields
// - push it into `transactions`
// - re-render the table + balance + category breakdown
// - reset the form
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // your code here
});

// ---- TODO 2: render the table ----
// - clear ledgerBody
// - loop over transactions (in date order), compute a running balance
// - build a <tr> per transaction matching the markup shape shown
//   in the HTML comment inside #ledger-body
// - toggle emptyState depending on whether transactions.length === 0
function renderTable() {
  // your code here
}

// ---- TODO 3: compute + render totals ----
// - sum credits, sum debits, balance = credits - debits
// - format as currency, e.g. formatKES(amount) -> "KES 12,345.00"
// - write into balanceAmountEl / totalCreditEl / totalDebitEl
function renderTotals() {
  // your code here
}

// ---- TODO 4: render category breakdown ----
// - group transactions by category (debits only, probably)
// - find the largest category total to scale the bar widths
// - rebuild categoryListEl's <li> items
function renderCategoryBreakdown() {
  // your code here
}

// ---- TODO 5: remove a transaction ----
// Each rendered row has a .remove-btn. Easiest approach: event
// delegation on ledgerBody, read the row's data-id, filter it
// out of `transactions`, then re-render.
ledgerBody.addEventListener('click', (event) => {
  // your code here
});

// ---- TODO 6 (stretch): period filtering ----
// periodNav buttons have data-period="YYYY-MM" or "all".
// On click: toggle .is-active, filter transactions by month,
// re-render everything against the filtered set.
periodNav.addEventListener('click', (event) => {
  // your code here
});

// ---- Helper you may want ----
function formatKES(amount) {
  return 'KES ' + Number(amount).toLocaleString('en-KE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}