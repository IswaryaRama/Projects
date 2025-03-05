// DOM Elements
const transactionForm = document.getElementById("transaction-form");
const transactionTable = document.getElementById("transactions").getElementsByTagName("tbody")[0];
const totalIncomeElement = document.getElementById("total-income");
const totalExpenseElement = document.getElementById("total-expense");
const netIncomeElement = document.getElementById("net-income");
const filterCategory = document.getElementById("filter-category");

// Transaction Data
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add Transaction
transactionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (!date || !description || !category || isNaN(amount)) {
    alert("Please fill all fields with valid data.");
    return;
  }

  const transaction = {
    id: Date.now(),
    type,
    date,
    description,
    category,
    amount,
  };

  transactions.push(transaction);
  saveTransactions();
  renderTransactions();
  updateSummary();
  transactionForm.reset();
});

// Render Transactions
function renderTransactions(filteredTransactions = transactions) {
  transactionTable.innerHTML = "";
  filteredTransactions.forEach((transaction) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.description}</td>
      <td>
        <span class="${transaction.type === 'income' ? 'income-label' : 'expense-label'}">
          ${transaction.type}
        </span>
      </td>
      <td>${transaction.category}</td>
      <td>${transaction.amount.toFixed(2)}</td>
      <td><button onclick="deleteTransaction(${transaction.id})">Delete</button></td>
    `;
    transactionTable.appendChild(row);
  });
}

// Delete Transaction
function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  saveTransactions();
  renderTransactions();
  updateSummary();
}

// Update Summary
function updateSummary() {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const netIncome = totalIncome - totalExpense;

  totalIncomeElement.textContent = totalIncome.toFixed(2);
  totalExpenseElement.textContent = totalExpense.toFixed(2);
  netIncomeElement.textContent = netIncome.toFixed(2);
}

// Filter Transactions by Category
function filterTransactions() {
  const selectedCategory = filterCategory.value;
  if (selectedCategory === "All") {
    renderTransactions();
  } else {
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.category === selectedCategory
    );
    renderTransactions(filteredTransactions);
  }
}

// Save Transactions to Local Storage
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initial Render
renderTransactions();
updateSummary();
