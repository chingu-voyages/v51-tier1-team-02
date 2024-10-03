import { members } from "./arrays.js";
import { getSelectedEvent } from "./events.js";
console.log(getSelectedEvent);
//main check

// Variables
let expenses = [];
let editingExpenseId = null;
let lastSplit = 0;
let total = 0;

const totalAmount = document.getElementById("totalAmount");
const splitAmount = document.getElementById("splitAmount");
const numberOfPeople = document.getElementById("numberOfPeople");
const warning = document.getElementById("expense-warning");
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");
const addButton = document.getElementById("addExpenseButton");
let UsDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// event handlers
addButton.addEventListener("click", addExpense);

// Create a new obj of expense
function addExpense() {
  const name = expenseNameInput.value; /****  values for names and amount *** */
  const amount = parseFloat(expenseAmountInput.value);

  if (name && !isNaN(amount) && amount > 0) {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dDate = `${month}/${day}`;

    if (editingExpenseId === null) {
      const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        members: 0,
        date: dDate,
      };
      expenses.push(expense); /* Events data to Expense data */
    } else {
      const expense = expenses.find(
        (expense) => expense.id === editingExpenseId
      );
      if (expense) {
        expense.name = name;
        expense.amount = amount;
      }
      editingExpenseId = null; /* Reset editing state */
      addButton.innerText = "Add Expense";
    }

    render();
    updateTotal();
    clearInputs();
    split();
  } else {
    warning.innerHTML = `
      <h3>Please enter an event name and a valid number.</h3>
      `;
    setTimeout(() => {
      warning.innerHTML = "";
    }, 5000); /* Clear warning at 5 sec */
  }
}

function render() {
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";
  expenses.forEach((expen) => {
    const li = document.createElement("li");
    li.classList.add("expense-item"); /* Todo */
    li.innerHTML = `
    ${expen.id}
       <p>${expen.date}</p>
      <p>${expen.name}: $${expen.amount.toFixed(2)}</p>
      <button class="edit-btn" data-id="${expen.id}" >Edit</button>     
      <button class="delete-btn" data-id="${expen.id}">Delete</button>
    `;
    expenseList.appendChild(li);
  });
  // Bind click events
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      startEditingExpense(parseInt(e.target.dataset.id)); //Get expense ID
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      deleteExpense(parseInt(e.target.dataset.id));
    });
  });
}

function startEditingExpense(id) {
  const expense = expenses.find((expense) => expense.id === id);
  if (expense) {
    warning.innerHTML = `<h1>Edit name || amount || members </h1>`;
    // Populate inputs fields with the current expense details
    expenseNameInput.value = `${expense.name}`;
    expenseAmountInput.value = `${expense.amount}`;
    numberOfPeople.value = `${expense.members}`;

    // Update the editing expense id
    editingExpenseId = id;

    // Change the add expense button text to "Update Expense"
    addButton.innerText = "Update Expense";
    split();
  }
}

function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  render();
  updateTotal();
  split();
}

function updateTotal() {
  total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  totalAmount.innerText = `${UsDollar.format(total)}`;
}

function split() {
  lastSplit = parseInt(numberOfPeople.value);
  total = parseFloat(totalAmount.textContent.replace(/[^0-9.-]+/g, ""));
  // Remove currency formatting
  if (lastSplit > 0) {
    const split = total / lastSplit;
    splitAmount.innerText = `${UsDollar.format(split)}`;
  } else {
    splitAmount.textContent = "0";
  }
}

function clearInputs() {
  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
}
/**************************************************/
