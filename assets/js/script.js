// Add Event
let events = [
  { name: "Movie", eventID: 1234, expense: 100 },
  { name: "Dinner Party", eventID: 1235, expense: 200 },
  { name: "Ski Tip", eventID: 12534, expense: 300 },
];
const addEvent = document.getElementById("addEvent");
const eventContainer = document.getElementById("eventContainer");

let group = []; /* array for push expense group  */

// display array
function renderEvents() {
  eventContainer.innerHTML = "";

  // loop through the events and create a list
  const row = document.getElementById("events-list");
  row.innerHTML = "";

  // Loop through the events and create a list
  events.forEach((event, index) => {
    const eventItem = document.createElement("li");
    eventItem.textContent = event.name;
    const deleteEventButton = document.createElement("button");
    deleteEventButton.type = "button";
    deleteEventButton.textContent = "X";

    // event listener for when an event is clicked should render modify page
    const eventMods = document.getElementById("event-modifications");

    eventItem.addEventListener("click", () => {
      console.log(`${event.name} clicked`);
      eventMods.innerHTML = "";
      const eventHeader = document.createElement("h2");
      eventHeader.textContent = `${event.name}`;
      eventMods.appendChild(eventHeader);
    });

    // event listener to delete the event from the main page
    deleteEventButton.addEventListener("click", () => {
      const eventDeleteWarning = document.createElement("p");
      eventDeleteWarning.textContent = `Are you sure you want to delete the ${event.name} event?`;
      eventDeleteWarning.classList.add("warning-text");

      // Create a "yes" button
      const yesDeleteButton = document.createElement("button");
      yesDeleteButton.type = "button";
      yesDeleteButton.textContent = "Yes";

      // handle the delete action on the "yes" click
      yesDeleteButton.addEventListener("click", function () {
        events.splice(index, 1);
        renderEvents();
      });
      // Create and handle the "no" button
      const noDeleteButton = document.createElement("button");
      noDeleteButton.type = "button";
      noDeleteButton.textContent = "No";
      noDeleteButton.addEventListener("click", function () {
        row.removeChild(eventDeleteWarning);
        row.removeChild(yesDeleteButton);
        row.removeChild(noDeleteButton);
      });
      // append the warning and the yes/no buttons
      row.appendChild(eventDeleteWarning);
      row.appendChild(yesDeleteButton);
      row.appendChild(noDeleteButton);
    });
    // append the event list and the delete buttons
    row.appendChild(eventItem);
    row.appendChild(deleteEventButton);
  });
}
// Render the events table on refresh
renderEvents();

// Click the add button to add an event
addEvent.addEventListener("click", () => {
  console.log("clicked");

  // Create a new input element
  const eventInputBox = document.createElement("input");
  eventInputBox.type = "text";
  eventInputBox.placeholder = "Enter event name";
  const eventInputButton = document.createElement("button");
  eventInputButton.type = "button";
  eventInputButton.textContent = "Add";

  eventInputButton.addEventListener("click", () => {
    const eventName = eventInputBox.value;
    let value = parseFloat(
      document.getElementById("expense-input").value
    ); /* expense input */
    if (eventName) {
      const newEvent = { name: eventName, eventID: Date.now(), expense: value };
      group.push(newEvent); /* for expense div */
      events.push(newEvent); // Add event to the array
      console.log("Event add:", newEvent.name);
      console.log("Event ID:", newEvent.eventID);
      eventInputBox.value = "";
      renderEvents();
      expenseDiv(); /* expense function */
    }
  });
  // Append the input box to the container
  eventContainer.appendChild(eventInputBox);
  eventContainer.appendChild(eventInputButton);
});

/**************************************************/

// Expense functions
let display = [];
function expenseDiv() {
  group.forEach((item) => {
    display = `
    <div class="expense-container">
        <h3>Event: ${item.name}</h3>
        <spam> $${item.expense}</spam>
        <button id="delete-btn">Delete</button>
        <button id="edit-btn" >Edit</button>
    </div>
    `;
  });
  document.getElementById("result").innerHTML += display;
}
function deleteBtn() {
  console.log("hi");
}

/**************************************************/
