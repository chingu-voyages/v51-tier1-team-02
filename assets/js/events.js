// Add Event
// let events = [
//     {name: "Movie", eventID: 111},
//     {name: "Dinner Party",eventID: 222},
//     {name: "Ski Trip",eventID: 333},
//     {name: "Pool Party",eventID: 444},
//     {name: "Disney",eventID: 555},
//     {name: "Bowling",eventID: 666},
//     {name: "Football Game",eventID: 777},
// ];

import { events, members } from "./arrays.js";
import { listofUsers, templateusersList } from "./adduser.js";


let selectedEvent = null;

export function getSelectedEvent() {
    return selectedEvent;
}

document.addEventListener("DOMContentLoaded", function() {
    const addEvent = document.getElementById("addEvent");
    const eventContainer = document.getElementById("eventContainer");
    const row = document.getElementById("events-list");
    const eventModificationContainer = document.getElementById("event-modifications-header");

    let eventHeader;

    // function will display array of events
    function renderEvents() {
        row.innerHTML = "";
        events.forEach((event, index) => {
            const eventItem = createEventItem(event, index);
            row.appendChild(eventItem);
        });
    }
// ***********************NEW****************************
    // To combine users with events
    function createUsersEventArray() {
        console.log(events);
        console.log(members);
        const selectedEvent = getSelectedEvent();
    
        if (selectedEvent) {
            addMembersToEvent();
            
    
            console.log(`${selectedEvent.name} was selected`);
            
          } else {
            console.log("No event selected.");
          }

    }

    function addMembersToEvent() {
       

        const existingDropdown = listofUsers.querySelector("select");
        if (existingDropdown) {
            console.log("dropdown already exists");
            return;
        }

         // updates the list of users in events
         templateusersList.innerHTML = "";

        const selectMemberAddButton = document.createElement("button")
        selectMemberAddButton.type = "button";
        selectMemberAddButton.textContent = "+";
    
        const selectMembers = document.createElement("select");
    
        // Create a placeholder option
        const placeholderOption = document.createElement("option");
        placeholderOption.value = ""; 
        placeholderOption.textContent = "Select a member"; 
        placeholderOption.selected = true; 
        selectMembers.appendChild(placeholderOption);
         
        
        members.forEach((member, index) => {
            const option = document.createElement("option");
            console.log(`current members: ${member.name}`);
            option.value = member.memberID;
            option.textContent = member.name;
            selectMembers.appendChild(option);
            
        });

        selectMemberAddButton.addEventListener("click", () => {
            const selectedID = selectMembers.value;
            //  member ID
            console.log(`selected ID: ${selectedID}`);
            // user name and member ID
            const selectedMember = members.find(member => member.memberID === parseInt(selectedID));
            
    
            if(selectedID && selectedEvent && !selectedEvent.members.some(eventMember => eventMember.memberID === selectedID)) {
                selectedEvent.members.push({name: selectedMember.name, memberID: selectedID, members:[]});
                console.log(`member added: ${selectedMember.name}`);
                
                
                selectMembers.value = "";
                displayMembersInGroup();
            } else {
                const warning = document.createElement("p");
                warning.textContent = "Member already exists in the event";
                templateusersList.appendChild(warning);
            }
            console.log(events);
            console.log(selectedEvent.members);
            selectMembers.appendChild(placeholderOption);
            
        });
        listofUsers.appendChild(selectMembers);
        listofUsers.appendChild(selectMemberAddButton);
        
    }

    function displayMembersInGroup () {

        templateusersList.innerHTML = "";
        if(selectedEvent) {
            selectedEvent.members.forEach((member, index) => {
            const memberList = document.createElement("li");
            memberList.textContent = member.name;
            templateusersList.appendChild(memberList);

            }); 
        }
        
    }
    
    


// *********************^^^^^^^^^^^^NEW^^^^^^^^^^^^^^****************

  

    
    // The event details will render here.  Currently there is just an H2 with the event name
    function renderEventDetails(eventName, index) {
        selectedEvent = events[index];

        createUsersEventArray();
        console.log(selectedEvent.name);
        eventModificationContainer.innerHTML = "";
        displayMembersInGroup();


        // Create a container to hold the event name and edit button
        const eventNameContainer = document.createElement("div");
        eventNameContainer.classList.add("event-name-container");

        // Create an H2 for the event name
        eventHeader = document.createElement("h2");
        eventHeader.textContent = `${eventName}`;
        
        // Create the 'Edit Event Name' button
        const editEventNameButton = document.createElement("button");
        editEventNameButton.textContent = "Edit Event Name";
        editEventNameButton.classList.add("edit-event-name-button");

        // When clicking the 'Edit' button, switch the event name to a text box using a function
        editEventNameButton.addEventListener("click", () => startEditingEventName(eventName, index));

        // Append the event name and edit button to the container
        eventNameContainer.appendChild(eventHeader);
        eventNameContainer.appendChild(editEventNameButton);

        
        // Append everything to the main modification container
        eventModificationContainer.appendChild(eventNameContainer);
    }
    
    // a function to switch the event name to editing mode
    function startEditingEventName(eventName, index) {
        eventModificationContainer.innerHTML = ""; // Clear existing content

        // Create an input text box with the current event name
        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = eventName;
        editInput.classList.add("edit-event-name-input");

        // Create a 'Done Editing' button
        const doneButton = document.createElement("button");
        doneButton.textContent = "Done editing";
        doneButton.classList.add("done-button");

        // Save the edited name when 'Done editing' is clicked
        doneButton.addEventListener("click", () => {
            const editedEventName = editInput.value.trim();

            if (editedEventName) {
                events[index].name = editedEventName; // Update the event name in the array
                renderEvents(); // Re-render the events list
                renderEventDetails(editedEventName, index); // SHow the updated event details
            }
        console.log(events);
        });

        eventModificationContainer.appendChild(editInput);
        eventModificationContainer.append(doneButton);

    }

    // Creates an individual event list item and a delete buttton
    function createEventItem(event,index) {
        const eventItem = document.createElement("li");
        eventItem.textContent = event.name;
        eventItem.classList.add("event-item");
        eventItem.classList.add("event-button");
    
        // Create a container for each event and its delete button
        const eventContainerItem = document.createElement("div");
        eventContainerItem.classList.add("event-container"); 
    
        const deleteEventButton = createDeleteButton(event, index);
        eventItem.addEventListener("click", () => renderEventDetails(event.name, index));
    
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
    
    // This function adds an "Add" button. 
    // When the "Add" button is clicked, the input value is added to 
    // a new object "newEvent" which is pushed to the "events" array.
    // Finally the field is cleared.
    function createAddButton(input) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Add";
        button.addEventListener("click", () => {
            const eventName = input.value.trim();
            if(eventName) {
                const newEvent = {
                    name: eventName, 
                    eventItem: Date.now(),
                    members:[]
                };
                events.push(newEvent);
                renderEvents();
                // The new event will automatically render so you can add all member and expense information
                const newIndex = events.length -1;
                renderEventDetails(newEvent.name, newIndex);
                eventContainer.innerHTML = "";
            }
            console.log(events);
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
    
            // Deletes the innerHTML if the selected event is also deleted
            if(eventHeader.textContent === event.name){
                eventModificationContainer.innerHTML = "";
            }
            
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
});
