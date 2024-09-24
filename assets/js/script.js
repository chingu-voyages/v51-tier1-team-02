// Add Event
let events = [
    {name: "Movie", eventID: 1234},
    {name: "Dinner Party",eventID: 1235},
    {name: "Ski Trip",eventID: 12534},
];
const addEvent = document.getElementById("addEvent");
const eventContainer = document.getElementById("eventContainer");
const row = document.getElementById("events-list");
const eventHeader = document.getElementById("event-header");
const eventMembers = document.getElementById("event-members");
const eventExpenses = document.getElementById("event-expenses");


// function will display array of events
function renderEvents() {
    row.innerHTML = "";
    events.forEach((event, index) => {
        const eventItem = createEventItem(event, index);
        row.appendChild(eventItem);
    });
}

// The event details will render here.  Currently there is just an H2 with the event name
function renderEventDetails(eventName) {
    eventHeader.innerHTML = `<h2>${eventName}</h2>`;
    eventMembers.innerHTML = `<h3>members</h3>`;
    eventExpenses.innerHTML = `<h3>expenses</h3>`;
}

// Creates an individual event list item and a delete buttton
function createEventItem(event,index) {
    const eventItem = document.createElement("li");
    eventItem.textContent = event.name;
    eventItem.classList.add("event-item");
    eventItem.classList.add("event-button");

    // Create a container for each event and its delete button
    const eventContainerItem = document.createElement("div");
    eventContainerItem.classList.add("event-container"); // add this class to apply the css

    const deleteEventButton = createDeleteButton(event, index);
    eventItem.addEventListener("click", () => renderEventDetails(event.name));

    // const listItem = document.createElement("div");
    eventContainerItem.appendChild(eventItem);
    eventContainerItem.appendChild(deleteEventButton);

    return eventContainerItem;
}

// This function adds the input field so the user can type a new event
function addNewEvent() {
    if(!eventContainer.querySelector("input")) {
        const eventInputBox = createInputElement();
        const eventInputButton = createAddButton(eventInputBox);
        eventContainer.appendChild(eventInputBox);
        eventContainer.appendChild(eventInputButton);
    }
}

// This function creates the input field and returns the input to be used in the event array
// the input value is used in the createAddButton function
function createInputElement() {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter event name";
    return input;
}

// This function adds an "Add" button when the "Add" button is clicked
// the input value is added to an new object "newEvent" which is pushed to the "events"
// array.  Finally the field is cleared.
function createAddButton(input) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Add";
    button.addEventListener("click", () => {
        const eventName = input.value.trim();
        if(eventName) {
            const newEvent = {name: eventName, eventItem: Date.now()};
            events.push(newEvent);
            renderEvents();
            // The new event will automatically render so you can add all member and expense information
            renderEventDetails(newEvent.name);
            eventContainer.innerHTML = "";
        }
    });
    return button;
}

// this function creates a delete button and listens for the confirm delete event
function createDeleteButton(event, index) {
    const deleteEventButton = document.createElement("button");
    // Create a container for each event and its delete button
    const eventContainerItem = document.createElement("div");
    eventContainerItem.classList.add("event-container"); // add this class to apply the css
    deleteEventButton.type = "button";
    deleteEventButton.textContent = "X";
    deleteEventButton.classList.add("delete-button");
    
    deleteEventButton.addEventListener("click", () => confirmDelete(event, index));
    return deleteEventButton;
}

// this function asks user whether they want to delete or not
function confirmDelete(event, index) {
    const warning = document.createElement("p");
    warning.classList.add("warning-text");
    warning.textContent = `Are you sure you want to delete ${event.name}?`;

    // When clicking the yes button, the event will be removed from the events array
    const yesButton = document.createElement("button");
    yesButton.textContent = "Yes";
    yesButton.addEventListener("click", () => {
        events.splice(index, 1);
        renderEvents();
    });

    // When clicking the no button, the event will not be removed and the warning and 
    // yes/no buttons will go away
    const noButton = document.createElement("button");
    noButton.textContent = "No";
    noButton.addEventListener("click", () => {
        warning.remove();
        yesButton.remove();
        noButton.remove();
    });

    row.appendChild(warning);
    row.appendChild(yesButton);
    row.appendChild(noButton);
}

addEvent.addEventListener("click", addNewEvent);

renderEvents();
