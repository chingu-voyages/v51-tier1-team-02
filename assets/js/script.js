// Feel free to erase all this code --Reinaldo--
const button = document.getElementById("button")
const awesome = document.getElementById("awesome")

button.addEventListener("click", () => {
    awesome.textContent = "Awesome!!!"
    button.classList.add("visability")
    setInterval(() => 
         {
        awesome.textContent = ""    
        button.classList.remove("visability")
    }, 4000);
    
})

// Add Event
let events = [
    {
        name: "Movie",
        eventID: 1234
    },
    {
        name: "Outback Steakhouse",
        eventID: 1235
    },
    {
        name: "Ski Tip",
        eventID: 12534
    },
];
const addEvent = document.getElementById("addEvent");
const eventContainer = document.getElementById("eventContainer");

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
        }
    })
    

    // Append the input box to the container
    eventContainer.appendChild(eventInputBox);
    eventContainer.appendChild(eventInputButton);
});