// Add Event
let events = [
    {name: "Movie", eventID: 1234},
    {name: "Dinner Party",eventID: 1235},
    {name: "Ski Tip",eventID: 12534},
];
const addEvent = document.getElementById("addEvent");
const eventContainer = document.getElementById("eventContainer");

// display array
function renderEvents() {
    eventContainer.innerHTML = "";

    // loop through the events and create a list
    const row = document.getElementById("events-list");
    row.innerHTML = "";
    
    // Loop through the events and create a list
    events.forEach(event => {
        const eventItem = document.createElement("li");
        eventItem.textContent = event.name;
        const deleteEventButton = document.createElement("button");
        deleteEventButton.type = "button";
        deleteEventButton.textContent = "X";

        eventItem.addEventListener("click", () =>{
            console.log(`${event.name} clicked`);
            
        });
        
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

    eventInputButton.addEventListener("click", () =>{
        const eventName = eventInputBox.value;
        console.log(eventName);
        if(eventName) {
            const newEvent = {name:eventName, eventID: Date.now() };
            events.push(newEvent); // Add event to the array
            console.log("Event add:", newEvent.name);
            console.log("Event ID:",newEvent.eventID);
            eventInputBox.value = "";
            renderEvents();
        }
    })
    // Append the input box to the container
    eventContainer.appendChild(eventInputBox);
    eventContainer.appendChild(eventInputButton);
});



