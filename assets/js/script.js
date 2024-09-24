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

function createDeleteButton(event, index) {
    const deleteEventButton = document.createElement("button");
    deleteEventButton.type = "button";
    deleteEventButton.textContent = "X";
    deleteEventButton.addEventListener("click", () => confirmDelete(event, index));
    return deleteEventButton;
}

function confirmDelete(event, index) {
    const warning = document.createElement("p");
    warning.textContent = `Are you sure you want to delete ${event.name}?`;

    const yesButton = document.createElement("button");
    yesButton.textContent = "Yes";
    yesButton.addEventListener("click", () => {
        events.splice(index, 1);
        renderEvents();
    });

    const noButton = document.createElement("button");
    noButton.textContent = "No";
    noButton.addEventListener("click", () => warning.remove());

    row.appendChild(warning);
    row.appendChild(yesButton);
    row.appendChild(noButton);
}

function addNewEvent() {
    if(!eventContainer.querySelector("input")) {
        const eventInputBox = createInputElement();
        const eventInputButton = createAddButton(eventInputBox);
        eventContainer.appendChild(eventInputBox);
        eventContainer.appendChild(eventInputButton);
    }
}

function createInputElement() {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter event name";
    return input;
}

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
