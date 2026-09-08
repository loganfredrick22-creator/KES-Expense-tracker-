// ============================================================
// Expense Tracker — starter scaffold
// ============================================================

// ---- DOM references you'll need ----
const form            = document.getElementById('entry-form');
const dateInput       = document.getElementById('entry-date');
const descInput       = document.getElementById('entry-desc');
const categoryInput   = document.getElementById('entry-category');
const typeInput       = document.getElementById('entry-type');
const amountInput     = document.getElementById('entry-amount');

const ledgerBody      = document.getElementById('ledger-body');
const emptyState      = document.getElementById('empty-state');

const balanceAmountEl = document.getElementById('balance-amount');
const totalCreditEl   = document.getElementById('total-credit');
const totalDebitEl    = document.getElementById('total-debit');

const categoryListEl  = document.getElementById('category-list');
const periodNav       = document.getElementById('period-nav');

// ---- In-memory store ----
let transactions = [];


// ============================================================
// TODO 1: HANDLE FORM SUBMIT
// ============================================================

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const expenseList = {
    id: Date.now(),
    date: dateInput.value,
    description: descInput.value,
    category: categoryInput.value,
    type: typeInput.value,
    amount: Number(amountInput.value)
  };

  transactions.push(expenseList);

  renderTable();
  renderTotals();
  renderCategoryBreakdown();

  form.reset();
});


// ============================================================
// TODO 2: RENDER TABLE
// ============================================================

function renderTable() {

  // Clear existing rows
  ledgerBody.innerHTML = '';

  // Show/hide empty state
  if (transactions.length === 0) {
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  // Put transactions in date order
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let runningBalance = 0;

  sortedTransactions.forEach((transaction, index) => {

    // Calculate running balance
    if (transaction.type === 'credit') {
      runningBalance += transaction.amount;
    } else {
      runningBalance -= transaction.amount;
    }

    // Format date
    const date = new Date(transaction.date);

    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short'
    });

    // Display category nicely
    const categoryName =
      transaction.category.charAt(0).toUpperCase() +
      transaction.category.slice(1);

    // Decide where the amount goes
    const debitAmount =
      transaction.type === 'debit'
        ? transaction.amount.toLocaleString('en-KE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        : '';

    const creditAmount =
      transaction.type === 'credit'
        ? transaction.amount.toLocaleString('en-KE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        : '';

    // Build the row
    const row = document.createElement('tr');

    row.className = 'ledger-row';
    row.dataset.id = transaction.id;

    row.innerHTML = `
      <td class="col-no">${index + 1}</td>

      <td class="col-date">${formattedDate}</td>

      <td class="col-desc">${transaction.description}</td>

      <td class="col-cat">
        <span class="cat-tag" data-category="${transaction.category}">
          ${categoryName}
        </span>
      </td>

      <td class="col-debit debit">
        ${debitAmount}
      </td>

      <td class="col-credit">
        ${creditAmount}
      </td>

      <td class="col-balance">
        ${formatKES(runningBalance)}
      </td>

      <td class="col-action">
        <button
          class="remove-btn"
          aria-label="Remove entry"
        >
          ×
        </button>
      </td>
    `;

    ledgerBody.appendChild(row);
  });
}


// ============================================================
// TODO 3: COMPUTE + RENDER TOTALS
// ============================================================

function renderTotals(data) {
  const creditBalance = 0;
  const debitBalance = 0;

  data.forEach(transaction => {
    if(transaction.type === 'credit'){
    creditBalance += transaction.amount;
    }

    if(transaction.type === 'debit'){
      debitBalance += transaction.amount
    }
  });
  

  balanceAmountEl.textContent = formatKES(balance);
  totalCreditEl.textContent = formatKES(totalCredit);
  totalDebitEl.textContent = formatKES(totalDebit);
}


// ============================================================
// TODO 4: RENDER CATEGORY BREAKDOWN
// ============================================================

function renderCategoryBreakdown(data) {
  categoryList.innerHTML='';

  const categoryTotals={};

  data.forEach(transaction => {
    if(transaction.type !=='debit'){
      return;
    }

    if(!categoryTotals[transaction.category]){
   categoryTotals[transaction.category]= 0;

   }
   categoryTotals[transaction.category] += transasction.amount;
  });

 const categories = Object.entries(categoryTotals);

  if (categories.length === 0) {

    categoryListEl.innerHTML = `
      <li class="category-row" data-category="placeholder">

        <span class="category-name">
          No entries yet
        </span>

        <span class="category-bar">
          <span class="category-fill" style="width:0%"></span>
        </span>

        <span class="category-amount">
          KES 0.00
        </span>

      </li>
    `;

  const largestCategory = Math.max(
  ...categories.map(([category, total]) => total)
);
 categories.forEach(([category, total]) => {
  const categoryName = category.charAt(0).toUpperCase + category.slice(0);

  const percentage =
  (total / largestCategory) * 100;
 });



   categoryListEl.innerHTML += `
      <li class="category-row" data-category="${category}">

        <span class="category-name">
          ${categoryName}
        </span>

        <span class="category-bar">
          <span
            class="category-fill"
            style="width:${percentage}%"
          ></span>
        </span>

        <span class="category-amount">
          ${formatKES(total)}
        </span>

      </li>
    `;
  }
}


// ============================================================
// TODO 5: REMOVE A TRANSACTION
// ============================================================

ledgerBody.addEventListener('click', (event) => {

  if (!event.target.classList.contains('remove-btn')) {
    return;
  }

  const row = event.target.closest('.ledger-row');

  const id = Number(row.dataset.id);

  transactions = transactions.filter(
    transaction => transaction.id !== id
  );

  renderTable();
  renderTotals();
  renderCategoryBreakdown();
});


// ============================================================
// TODO 6: PERIOD FILTERING
// ============================================================

let selectedPeriod = '2026-09';

periodNav.addEventListener('click', (event) => {

  const button = event.target.classList('.remove-btn');

  if(!button){return};
 
  selectedPeriod = button.dataset.period;

  document.querySelectorAll().forEach(btn => {
    btn.classList.remove('is-active');

  });
  button.classList.add('is-active');




  renderFilteredData();
});


// ============================================================
// FILTER DATA
// ============================================================

function renderFilteredData() {

  let filteredTransactions;

  if (selectedPeriod === 'all') {

    filteredTransactions = transactions;

  } else {

    filteredTransactions = transactions.filter(transaction =>
      transaction.date.startsWith(selectedPeriod)
    );
  }

  renderFilteredTable(filteredTransactions);
  renderFilteredTotals(filteredTransactions);
  renderFilteredCategories(filteredTransactions);
}


// ============================================================
// FILTERED TABLE
// ============================================================

function renderFilteredTable(data) {

  ledgerBody.innerHTML = '';

  if (data.length === 0) {
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  const sortedTransactions = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let runningBalance = 0;

  sortedTransactions.forEach((transaction, index) => {

    if (transaction.type === 'credit') {
      runningBalance += transaction.amount;
    } else {
      runningBalance -= transaction.amount;
    }

    const date = new Date(transaction.date);

    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short'
    });

    const categoryName =
      transaction.category.charAt(0).toUpperCase() +
      transaction.category.slice(1);

    const debitAmount =
      transaction.type === 'debit'
        ? transaction.amount.toLocaleString('en-KE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        : '';

    const creditAmount =
      transaction.type === 'credit'
        ? transaction.amount.toLocaleString('en-KE', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        : '';

    const row = document.createElement('tr');

    row.className = 'ledger-row';
    row.dataset.id = transaction.id;

    row.innerHTML = `
      <td class="col-no">${index + 1}</td>

      <td class="col-date">${formattedDate}</td>

      <td class="col-desc">${transaction.description}</td>

      <td class="col-cat">
        <span class="cat-tag" data-category="${transaction.category}">
          ${categoryName}
        </span>
      </td>

      <td class="col-debit debit">
        ${debitAmount}
      </td>

      <td class="col-credit">
        ${creditAmount}
      </td>

      <td class="col-balance">
        ${formatKES(runningBalance)}
      </td>

      <td class="col-action">
        <button class="remove-btn" aria-label="Remove entry">
          ×
        </button>
      </td>
    `;

    ledgerBody.appendChild(row);
  });
}


// ============================================================
// FILTERED TOTALS
// ============================================================

function renderFilteredTotals(data) {

  let totalCredit = 0;
  let totalDebit = 0;

  data.forEach(transaction => {

    if (transaction.type === 'credit') {
      totalCredit += transaction.amount;
    }

    if (transaction.type === 'debit') {
      totalDebit += transaction.amount;
    }
  });

  const balance = totalCredit - totalDebit;

  balanceAmountEl.textContent = formatKES(balance);
  totalCreditEl.textContent = formatKES(totalCredit);
  totalDebitEl.textContent = formatKES(totalDebit);
}


// ============================================================
// FILTERED CATEGORY BREAKDOWN
// ============================================================

function renderFilteredCategories(data) {

  categoryListEl.innerHTML = '';

  const categoryTotals = {};

  data.forEach(transaction => {

    if (transaction.type !== 'debit') {
      return;
    }

    if (!categoryTotals[transaction.category]) {
      categoryTotals[transaction.category] = 0;
    }

    categoryTotals[transaction.category] += transaction.amount;
  });

  const categories = Object.entries(categoryTotals);

  if (categories.length === 0) {

    categoryListEl.innerHTML = `
      <li class="category-row" data-category="placeholder">

        <span class="category-name">
          No entries yet
        </span>

        <span class="category-bar">
          <span class="category-fill" style="width:0%"></span>
        </span>

        <span class="category-amount">
          KES 0.00
        </span>

      </li>
    `;

    return;
  }

  const largestCategory = Math.max(
    ...categories.map(([category, total]) => total)
  );

  categories.forEach(([category, total]) => {

    const categoryName =
      category.charAt(0).toUpperCase() +
      category.slice(1);

    const percentage =
      (total / largestCategory) * 100;

    categoryListEl.innerHTML += `
      <li class="category-row" data-category="${category}">

        <span class="category-name">
          ${categoryName}
        </span>

        <span class="category-bar">
          <span
            class="category-fill"
            style="width:${percentage}%"
          ></span>
        </span>

        <span class="category-amount">
          ${formatKES(total)}
        </span>

      </li>
    `;
  });
}


// ============================================================
// HELPER
// ============================================================

function formatKES(amount) {

  return 'KES ' + Number(amount).toLocaleString('en-KE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
