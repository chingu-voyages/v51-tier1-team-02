// Add Event
let events = [
  { name: "Movie", eventID: 1234, expense: 100 },
  { name: "Dinner Party", eventID: 1235, expense: 200 },
  { name: "Ski Tip", eventID: 12534, expense: 300 },
];


let group = []; /* array for push expense group  */

// display array

/**************************************************/

// Expense functions
let display = [];
function expenseDiv() {
  group.forEach((item, index) => {
    display = `
    <div class="expense-container">
        <h3>Event: ${item.name}</h3>
        <span> $${item.expense}</span>
        <button onclick=(${deleteBtn()}) id="delete-btn">Delete</button>
        <button id="edit-btn" >Edit</button>
        <p>${index}</p>
    </div>
    `;
  });

  document.getElementById("result").innerHTML += display;

  function deleteBtn() {
    console.log("hi");
  }
}

/**************************************************/
