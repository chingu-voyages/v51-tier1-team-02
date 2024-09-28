let expenses = [];
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const splitAmount = document.getElementById("splitAmount");
const numOfPeople = document.getElementById("numPeople");
const warning = document.getElementById("expense-warning");

function addExpense() {
  const name = document.getElementById("expenseName").value;
  const amount = parseFloat(document.getElementById("expenseAmount").value);

  if (name && !isNaN(amount) && amount > 0) {
    const date = new Date()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const dDate = `${month}/${day}`
    const expense = {
      id: Date.now(),
      name: name,
      amount: amount,
      date: dDate
    };
    expenses.push(expense);
    render();
    updateTotal();
    clearInputs();
    split();
  } else if (isNaN(amount)){
    warning.innerHTML = `
      <h3>Please enter an event name and a valid number.</h3>
      `;
    setTimeout( () => {
      warning.innerHTML = ""
    },5000)
    }
}

function render() {
  expenseList.innerHTML = "";
  expenses.forEach((expen, index) => {
    const li = document.createElement("li");
    li.classList.add("expense-item"); /* Todo */
    li.innerHTML = `
      <p>${expen.date}</p>
      <p>${expen.name}: $${expen.amount.toFixed(2)}</p>
      <input id="input-amount" type="number" value="${
        expen.amount
      }" oninput="editExpense(${expen.id}, this.value)" >
      <button onclick="deleteExpense(${expen.id})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
}

function updateTotal() {
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  totalAmount.innerHTML = `<p>$${total}</p>`;
  console.log(expenses);
}

function split() {     /*  TODO  */
  const numPeople = parseInt(numOfPeople.value)
  const total = parseFloat(totalAmount.textContent);

  if (numOfPeople > 0) {
    const split = total / numPeople;
    splitAmount.innerHTML = `<p>${split.toFixed(2)}</p>`;
  } else {
    splitAmount.textContent = "0";
  }
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
    split();
  }
}

function clearInputs() {
  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
}
/**************************************************/

