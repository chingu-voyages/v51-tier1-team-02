

import { getSelectedEvent } from './events.js'
console.log(getSelectedEvent);

// Variables
let expenses = []
let editingExpenseId = null;
let total = 0; 
let id = null;
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const splitAmount = document.getElementById("splitAmount");
const numberOfPeople = document.getElementById("numberOfPeople");
const warning = document.getElementById("expense-warning");
const expenseNameInput = document.getElementById("expenseName")
const expenseAmountInput = document.getElementById("expenseAmount")
const addButton = document.getElementById("addExpenseButton")
let UsDollar =  new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// event handlers
addButton.addEventListener("click", addExpense);
document.addEventListener("editButton", startEditingExpense)
document.addEventListener("deleteButton", deleteExpense)


// Create a new obj of expense
function addExpense() {
  const name = expenseNameInput.value        /****  values for names and amount *** */ 
  const amount = parseFloat(expenseAmountInput.value);

  if (name && !isNaN(amount) && amount > 0) {
    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dDate = `${month}/${day}`

    if (editingExpenseId === null) {
      const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        date: dDate
      };
      expenses.push(expense);  /* Events data to Expense data */
    } else {
      const expense = expenses.find((expense) => expense.id === editingExpenseId);
      if(expense) {
        expense.name = name;
        expense.amount = amount;
      } 
      editingExpenseId = null;
      addButton.innerText = "Add Expense"
    }
    
    render();
    updateTotal();
    clearInputs();
    split()
  } else {
    warning.innerHTML = `
      <h3>Please enter an event name and a valid number.</h3>
      `;
    setTimeout( () => {
      warning.innerHTML = ""
    },5000) /* Clear warning at 5 sec */
    }
}

function render() {  
  expenseList.innerHTML = "";
  expenses.forEach((expen) => {
    const li = document.createElement("li");
    li.classList.add("expense-item"); /* Todo */
    li.innerHTML = `
    ${expen.id}
       <p>${expen.date}</p>
      <p>${expen.name}: $${expen.amount.toFixed(2)}</p>
      <button id="editButton">Edit</button>     
      <button id="deleteButton" onclick="deleteExpense(${expen.id})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
}
// onclick="startEditingExpense(${expen.id}
function updateTotal() {
  total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  totalAmount.innerText = `${UsDollar.format(total)}`;
}

function split() {     
  const numPeople = parseInt(numberOfPeople.value)
  total = parseFloat(totalAmount.textContent.replace(/[^0-9.-]+/g,""));
  // Remove currency formatting
  if (numPeople > 0) {
    const split = total / numPeople;
    splitAmount.innerText = `${UsDollar.format(split)}`;
  } else {
    splitAmount.textContent = "0";
  }
}

function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  render();
  updateTotal();
}

function startEditingExpense(id) {
  const expense = expenses.find(expense => expense.id === id)
  if(expense) {
    // Populate inputs fields with the current expense details
    expenseNameInput.value = `Edit name:  ${expense.name}`;
    expenseAmountInput.value = `Edit amount ${expense.amount}`;

    // Update the editing expense id
    editingExpenseId = id;

    // Change the add expense button text to "Update Expense"
    addButton.innerText = "Update Expense"
  }
}

function clearInputs() {
  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
}
/**************************************************/

