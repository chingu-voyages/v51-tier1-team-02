// Add Event
let events = [
  { name: "Movie", eventID: 1234, expense: 100 },
  { name: "Dinner Party", eventID: 1235, expense: 200 },
  { name: "Ski Tip", eventID: 12534, expense: 300 },
];

let expenses = [];
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");

function addExpense() {
  const name = document.getElementById("expenseName").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);

  if (name && !isNaN(amount) && amount > 0) {
    const expense = {
      id: Date.now(),
      name: name,
      amount: amount,
    };
    expenses.push(expense);
    render();
    updateTotal();
    clearInputs();
    // split();
  } else {
    alert("Nope");
  }
}

function render() {
  expenseList.innerHTML = "";
  expenses.forEach((expen, index) => {
    const li = document.createElement("li");
    li.classList.add("expense-item"); /* Todo */
    li.innerHTML = `
      <span>${expen.name}: $${expen.amount.toFixed(2)}</span>
      <input type="number value="${expen.amount}" oninput="editExpense(${
      expen.id
    }, this.value)" >
      <button onclick="deleteExpense(${expen.id})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
}

function updateTotal() {
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  totalAmount.textContent = total;
  console.log(expenses);
}

function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
  render();
  updateTotal();
}

function editExpense(id, newAmount) {
  const expense = expenses.find((exp) => exp.id === id);
  if (expense) {
    expense.amount = parseFloat(newAmount) || 0;
  }
}

function clearInputs() {
  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
}
/**************************************************/
/* change branch to expense */
