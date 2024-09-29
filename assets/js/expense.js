
// Variables
let expenses = []; /* events data */
let dollars = false; 
let euros = false;
let total = 0; 
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const splitAmount = document.getElementById("splitAmount");
const numOfPeople = document.getElementById("numPeople");
const warning = document.getElementById("expense-warning");
const dollarBtn = document.getElementById("dollar-btn");
const euroBtn = document.getElementById("euro-btn");

// function currency(){ 
  
// } 
// dollarBtn.addEventListener("click", currency)

// Create a new obj of expense
function addExpense() {
  const name = document.getElementById("expenseName").value;        /****  values for names and amount *** */ 
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
    expenses.push(expense);  /* Events data to Expense data */
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
    },5000) /* Clear warning at 5 sec */
    }
}

function render() {  
  expenseList.innerHTML = "";
  expenses.forEach((expen, index) => {
    const li = document.createElement("li");
    li.classList.add("expense-item"); /* Todo */
    // li.classList.add('hidden');
    li.innerHTML = `
       
      <p>${expen.date}</p>
      <p>${expen.name}: $${expen.amount.toFixed(2)}</p>
      <button onclick="editExpense(${expen.id})">Edit</button>  
      <button onclick="deleteExpense(${expen.id})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
}

function updateTotal() {
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  // Add Currency Format
  let UsDollar =  new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

  totalAmount.innerText = `${UsDollar.format(total)}`;
}

function split() {     /*  TODO friday 28  */ 
  const numPeople = parseInt(numOfPeople.value)
  total = parseFloat(totalAmount.textContent.replace(/[^0-9.-]+/g,""));

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

function editExpense(id) {
   const expense = expenses.find((expense) => expense.id === id)
   if (expense) {
    const newName = prompt(`Edit name:`, expense.name)
    const newAmount = parseFloat(prompt(`edith the amount:`, expense.amount))

    if(!newName || isNaN(newAmount) || newAmount <= 0) {
      alert('nope');
      return;
    }
    
    expense.name = newName;
    expense.amount = newAmount;

    render();
    updateTotal();
    split();

   }
}

// function editExpense(id, newAmount) {
//   const expense = expenses.find((exp) => exp.id === id);
//   if (expense) {
//     expense.amount = parseFloat(newAmount) || 0;
//     updateTotal();
//     split();
//   }
// }

function clearInputs() {
  document.getElementById("expenseName").value = "";
  document.getElementById("expenseAmount").value = "";
}
/**************************************************/

{/* <input id="input-amount" type="number" value="${expen.amount}" > */}



// const price = 14340;

// // Format the price above to USD using the locale, style, and currency.
// let USDollar = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
// });

// console.log(`The formated version of ${price} is ${USDollar.format(price)}`);
// The formated version of 14340 is $14,340.00