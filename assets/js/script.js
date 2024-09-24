// Add Event
let events = [
    {name: "Movie", eventID: 1234},
    {name: "Dinner Party",eventID: 1235},
    {name: "Ski Trip",eventID: 12534},
];
const addEvent = document.getElementById("addEvent");
const eventContainer = document.getElementById("eventContainer");
const row = document.getElementById("events-list");
const eventMods = document.getElementById("event-modifications");

// function will display array of events
function renderEvents() {
    row.innerHTML = "";
    events.forEach((event, index) => {
        const eventItem = createEventItem(event, index);
        row.appendChild(eventItem);
    });
}
// Creates an individual event list item and a delete buttton
function createEventItem(event,index) {
    const eventItem = document.createElement("li");
    eventItem.textContent = event.name;

    const deleteEventButton = createDeleteButton(event, index);
    eventItem.addEventListener("click", () => renderEventDetails(event.name));

    const listItem = document.createElement("div");
    listItem.appendChild(eventItem);
    listItem.appendChild(deleteEventButton);

    return listItem;
}
// The event details will render here.  Currently there is just an H2 with the event name
function renderEventDetails(eventName) {
    eventMods.innerHTML = `<h2>${eventName}</h2>`;
}

// this function creates a delete button and listens for the confirm delete event
function createDeleteButton(event, index) {
    const deleteEventButton = document.createElement("button");
    deleteEventButton.type = "button";
    deleteEventButton.textContent = "X";
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
            eventContainer.innerHTML = "";
        }
    });
    return button;
}

addEvent.addEventListener("click", addNewEvent);

renderEvents();
