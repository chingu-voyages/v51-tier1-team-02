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
    events.forEach((event, index) => {
        // Create a container for each event and its delete button
        const eventContainerItem = document.createElement("div");
        eventContainerItem.classList.add("event-container"); // add this class to apply the css
        
        // Create the event item (event name)
        const eventItem = document.createElement("li");
        eventItem.textContent = event.name;
        eventItem.classList.add("event-item");

        // Create the delete button
        const deleteEventButton = document.createElement("button");
        deleteEventButton.type = "button";
        deleteEventButton.textContent = "X";
        deleteEventButton.classList.add("delete-button");

        // Append the event item and delete button to the container
        eventContainerItem.appendChild(eventItem);
        eventContainerItem.appendChild(deleteEventButton);

        // Append the container to the row
        row.appendChild(eventContainerItem);

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
            yesDeleteButton.addEventListener("click", function() {
                events.splice(index, 1);
                renderEvents();
            });
            // Create and handle the "no" button
            const noDeleteButton = document.createElement("button");
            noDeleteButton.type = "button";
            noDeleteButton.textContent = "No";
            noDeleteButton.addEventListener("click", function() {
                row.removeChild(eventDeleteWarning);
                row.removeChild(yesDeleteButton);
                row.removeChild(noDeleteButton);
            });
            // append the warning and the yes/no buttons
            row.appendChild(eventDeleteWarning);
            row.appendChild(yesDeleteButton);
            row.appendChild(noDeleteButton);
        });

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
});



