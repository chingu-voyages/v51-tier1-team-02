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
    alert("Please enter an event name and amount.");
  }
}

function render() {
  expenseList.innerHTML = "";
  expenses.forEach((expen, index) => {
    const li = document.createElement("li");
    li.classList.add("expense-item"); /* Todo */
    li.innerHTML = `
      <span>${expen.name}: $${expen.amount.toFixed(2)}</span>
      <input id="input-amount" type="number value="${
        expen.amount
      }" oninput="editExpense(${expen.id}, this.value)" >
      <button onclick="deleteExpense(${expen.id})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
}

function updateTotal() {
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  totalAmount.textContent = `$${total}`;
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
    updateTotal();
  }
}

function clearInputs() {
  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
}
/**************************************************/
/* change branch to expense */
