// *******************************IMPORTS*****************************************
import { events, members } from "./arrays.js";
import { listofUsers, templateusersList, renderUsers } from "./adduser.js";

// *******************************EXPORTS*****************************************
export let selectedEvent = null;
export function getSelectedEvent() {
    return selectedEvent;
}
export function addMembersToEventRefresh(){
    return selectMembers;
}

// *******************************DOM CONTENT*****************************************
document.addEventListener("DOMContentLoaded", function() {
// *******************************EVENTS*****************************************
    const addEvent = document.getElementById("addEvent");
    const eventContainer = document.getElementById("eventContainer");
    const row = document.getElementById("events-list");
    const eventModificationContainer = document.getElementById("event-modifications-header");
    const expenseWarningContainer = document.getElementById("expense-warning-container");
    const userContainer = document.getElementById("user-container");
    const memberWarning = document.getElementById("user-event-warning-message");
    const selectMemberDropdown = document.getElementById("select-member-dropdown");
// *******************************HEADER*****************************************   
    let eventHeader;
    eventHeader = document.createElement("h2");
    eventHeader.textContent = `Select an Event`;
    eventHeader.id = "select-event-header";
    eventModificationContainer.appendChild(eventHeader);

// *******************************RENDER EVENTS***************************************** 
    function renderEvents() {
        row.innerHTML = "";

        events.forEach((event, index) => {
            const eventItem = createEventItem(event, index);
            row.appendChild(eventItem);
        });
    }
// *******************************COMBINE USERS WITH EVENTS***************************************** 
    function createUsersEventArray() {
        console.log(events);
        console.log(members);
        const selectedEvent = getSelectedEvent();

        if (selectedEvent) {
            addMembersToEvent();
            populatePayerDropdown();

            console.log(`${selectedEvent.name} was selected`);
          } else {
            console.log("No event selected.");
          }
    }

    function addMembersToEvent() {
        // Only 1 dropdown is created at a time
        const existingDropdown = listofUsers.querySelector("select");
        if (existingDropdown) {
            console.log("dropdown already exists");
            return;
        }
         // updates the list of users in events - No duplicates!
         templateusersList.innerHTML = "";

        // Creates a + (add) button and a select field to add users to events
         const selectMemberAddButton = document.createElement("button")
        selectMemberAddButton.type = "button";
        selectMemberAddButton.classList.add("select-member-add-button");
        selectMemberAddButton.textContent = "+";

        const selectMembers = document.createElement("select");
        selectMembers.classList.add("select-members-dropdown");

        // Populates the select field with a placeholder ("select a member") and list of members from the members array
        const placeholderOption = document.createElement("option");
        placeholderOption.value = ""; 
        placeholderOption.textContent = "Select a member"; 
        placeholderOption.selected = true; 
        selectMembers.appendChild(placeholderOption);

        /*members.forEach((member) => {
            const option = document.createElement("option");
            option.value = member.memberID;
            option.textContent = member.name;
            selectMembers.appendChild(option);   
        }); */

    
        // On Click of the select dropdown, the select fields are populated with a placeholder and a current list of members, even NEWLY added members
        selectMembers.addEventListener("focus", () => {
            const selectedID = selectMembers.value;
            console.log('click');
            selectMembers.innerHTML = "";
             // Create a placeholder option
            const placeholderOption = document.createElement("option");
            placeholderOption.value = ""; 
            placeholderOption.textContent = "Select a member"; 
            placeholderOption.selected = true; 
            selectMembers.appendChild(placeholderOption);

            members.forEach((member) => {
                const option = document.createElement("option");
                option.value = member.memberID;
                option.textContent = member.name;
                selectMembers.appendChild(option);   
            }); 
        });

        // On click (+) the user is added to the events array
        selectMemberAddButton.addEventListener("click", () => {
            console.log('wow');
            const selectedID = selectMembers.value;
            console.log(selectedID);
            // user name and member ID
            const selectedMember = members.find(member => member.memberID === (selectedID));

            // if users is not already in the event, they arre added to the events array list of users is displayed
            if(selectedID && selectedEvent && !selectedEvent.members.some(eventMember => eventMember.memberID === selectedID)) {
                selectedEvent.members.push({name: selectedMember.name, memberID: selectedID});
                console.log(`member added: ${selectedMember.name}`);
                selectMembers.value = "";
                displayMembersInGroup();
                populatePayerDropdown();
            } else {
            // else a warning is shown
                memberWarning.textContent = "Member already exists in the event";
                userContainer.appendChild(memberWarning);
                setTimeout(() => {
                    memberWarning.remove();
                  }, 1500);
                selectMembers.value = "";
            }
            console.log(events);
            selectMembers.appendChild(placeholderOption);

            expenseRender();
        });

        // If the dropdown is changed, the warning will go away
        selectMemberDropdown.appendChild(selectMembers);
        selectMemberDropdown.appendChild(selectMemberAddButton);  
    }
    // This function will display all members in the event with an option to remove the member
    function displayMembersInGroup () {
        templateusersList.innerHTML = "";
        if(selectedEvent) {
            selectedEvent.members.forEach((member, index) => {
            const memberInGroupList = document.createElement("div");
            memberInGroupList.id = "users-list";
            memberInGroupList.classList.add("allow-scroll", "no-scroll");

            const memberImg = document.createElement("img");
            memberImg.classList.add("profile-style");
            memberImg.src = "assets/img/anon.png";
            memberImg.alt = "profile";

            const memberList = document.createElement("li");
            memberList.textContent = member.name;

            const memberListDeleteButton = document.createElement("button");
            memberListDeleteButton.type = "button";
            memberListDeleteButton.classList.add("delete-users-button");
            memberListDeleteButton.textContent = "X";

            templateusersList.appendChild(memberInGroupList);

            memberInGroupList.appendChild(memberImg);
            memberInGroupList.appendChild(memberList);
            memberInGroupList.appendChild(memberListDeleteButton);

            memberListDeleteButton.addEventListener("click", () => {

                // if a member has purchased something they can not be deleted
                const isMemberInExpense = selectedEvent.expenses.some(expense => expense.owner === member.name);
                if(isMemberInExpense){
                    memberWarning.textContent = "Member can not be deleted";
                    userContainer.appendChild(memberWarning);
                    setTimeout(() => {
                        memberWarning.remove();
                      }, 1500);
                    return;
                } else {
                    selectedEvent.members.splice(index, 1);
                    displayMembersInGroup();
                }

                expenseRender();
            });

            }); 
        }   
    }

    // The event details will render here.  Currently there is just an H2 with the event name
    function renderEventDetails(eventName, index) {
        expenseWarningContainer.innerHTML = "";

        selectedEvent = events[index];
        createUsersEventArray();
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
        editEventNameButton.textContent = "Edit";
        editEventNameButton.classList.add("edit-event-name-button");

        // When clicking the 'Edit' button, switch the event name to a text box using a function
        editEventNameButton.addEventListener("click", () => startEditingEventName(eventName, index));

        // Append the event name and edit button to the container
        eventNameContainer.appendChild(eventHeader);
        eventNameContainer.appendChild(editEventNameButton);

        // Append everything to the main modification container
        eventModificationContainer.appendChild(eventNameContainer);

        expenseRender();
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

            setTimeout(() => {
                eventInputBox.remove();
                eventInputButton.remove();
              }, 10000);   
        }
    }

    // This function creates the input field and returns the input to be used in the event array
    // the input value is used in the createAddButton function
    function createInputElement() {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add("event-name");
        input.placeholder = "Enter event name";
        return input;
    }

    function createAddButton(input) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Add";
        button.classList.add("button");
        button.addEventListener("click", () => {
            const eventName = input.value.trim();

            if(eventName) {
                const newEvent = {
                    name: eventName, 
                    eventItem: Date.now(),
                    members:[{name: "Cole", memberID: "id4444"}],
                    expenses:[]
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
        // if there is an existing warning with buttons, run these if statements
        const existingwarning = row.querySelector(".warning-text");
        const existingYesButton = row.querySelector(".confirm-yes");
        const existingNoButton = row.querySelector(".confirm-no");

        if (existingwarning) {
            existingwarning.remove();
        }
        if (existingYesButton) {
            existingYesButton.remove();
        }
        if (existingNoButton) {
            existingNoButton.remove();
        }

        const warning = document.createElement("p");
        warning.classList.add("warning-text");
        warning.textContent = `Are you sure you want to delete ${event.name}?`;

        // When clicking the yes button, the event will be removed from the events array
        const yesButton = document.createElement("button");
        yesButton.textContent = "Yes";
        yesButton.classList.add("button");
        yesButton.classList.add("confirm-yes");
        yesButton.addEventListener("click", () => {
            events.splice(index, 1);
            renderEvents();

            // Deletes the innerHTML if the selected event is also deleted
            if(selectedEvent){
                if(eventHeader.textContent === event.name){
                    eventModificationContainer.innerHTML = "";
                }
                // Renders the original user list
                renderUsers();
            }    
        });

        // When clicking the no button, the event will not be removed and the warning and 
        // yes/no buttons will go away
        const noButton = document.createElement("button");
        noButton.textContent = "No";
        noButton.classList.add("confirm-no");
        noButton.classList.add("button");
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

// *******************EXPENSES ****************
const totalAmount = document.getElementById("totalAmount");
const totalIndividualAmount = document.getElementById("total-individual-amount");

const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");
const addButton = document.getElementById("addExpenseButton");
const payer = document.getElementById("payer");

function populatePayerDropdown() {
    if(!selectedEvent) {
        console.log("No event selected");
        return;
    }
    payer.innerHTML = "";

    const placeholderOption = document.createElement("option");
    placeholderOption.value = ""; 
    placeholderOption.textContent = "Select a member"; 
    placeholderOption.selected = true; 
    payer.appendChild(placeholderOption);

    selectedEvent.members.forEach((member, index) => {
        const option = document.createElement("option");
        option.textContent = member.name;
        option.value = member.name;
        payer.appendChild(option);    
    });
}

populatePayerDropdown();

function addExpense() {
    const name = expenseNameInput.value; 
    const amount = parseFloat(expenseAmountInput.value);
    const selectedPayer = payer.value;
    const expenseWarning = document.createElement("div");
    const expenseWarningContainer = document.getElementById("expense-warning-container");

    expenseWarningContainer.innerHTML = "";

    if (name === "" || isNaN(amount) || selectedPayer === "") {
        expenseWarning.id = "user-event-warning-message";
        expenseWarning.textContent = "Please enter a valid expense name, amount, and payer.";
        expenseWarningContainer.appendChild(expenseWarning);
        setTimeout(() => {
            expenseWarning.remove();
          }, 1500);
        return; // Stop the function if inputs are not valid
    }

    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dDate = `${month}/${day}`;

    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        owner: selectedPayer,
        date: dDate,
    };

    selectedEvent.expenses.push(expense);

    console.log(selectedEvent.expenses);
    console.log(events);
    console.log(`There are ${selectedEvent.members.length} members in this event`);

    expenseRender();
}

addButton.addEventListener("click", () => {
    addExpense();
    populatePayerDropdown();

    expenseNameInput.value = "";
    expenseAmountInput.value = "";
});

// Need to move this to the BALANCE section
function expenseRender() {
    const expenseList = document.getElementById("expense-table");

    const rows = expenseList.querySelectorAll("tr:not(:first-child)");
    rows.forEach(row => row.remove());

    let total = 0;
    let totalIndividual = 0;

    // Create a table for the expenses to live
    selectedEvent.expenses.forEach((expense, index) => {
        const tr = document.createElement("tr");

        const expenseEdit = document.createElement("td");
        const expenseDate = document.createElement("td");
        const expenseExpense = document.createElement("td");
        const expenseOwner = document.createElement("td");
        const expenseTotal = document.createElement("td");
        const expenseOwe = document.createElement("td");

        tr.classList.add("expense-lines");
        expenseEdit.classList.add("expense-lines");
        expenseDate.classList.add("expense-lines");
        expenseExpense.classList.add("expense-lines");
        expenseOwner.classList.add("expense-lines");
        expenseTotal.classList.add("expense-lines");
        expenseOwe.classList.add("expense-lines");

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.classList.add("button");
        editButton.textContent = "Edit";
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("button");
        deleteButton.textContent = "X";
        expenseEdit.appendChild(editButton);
        expenseEdit.appendChild(deleteButton);
        expenseEdit.classList.add("expense-edit");
        tr.appendChild(expenseEdit);

        editButton.addEventListener("click", () =>{
            console.log("edit button clicked");
            // Create input fields for editing the expense name, amount, and payer
            const editExpenseName = document.createElement("input");
            editExpenseName.type = "text";
            editExpenseName.value = expense.name;
            editExpenseName.classList.add("edit-expense-name");

            const editExpenseAmount = document.createElement("input");
            editExpenseAmount.type = "number";
            editExpenseAmount.value = expense.amount;
            editExpenseAmount.classList.add("edit-expense-amount");

            const editPayerSelect = document.createElement("select");
            editPayerSelect.classList.add("edit-payer-select");
            selectedEvent.members.forEach(member => {
                expenseEdit.innerHTML = "";
                expenseEdit.appendChild(deleteButton);

                const option = document.createElement("option");
                option.value = member.name;
                option.textContent = member.name;
                if (member.name === expense.owner) {
                    option.selected = true;
                }
                editPayerSelect.appendChild(option);
            });
            editPayerSelect.classList.add("edit-expense-payer");

            // Replace the current table data with input fields for editing
            expenseExpense.innerHTML = ""; 
            expenseExpense.appendChild(editExpenseName);

            expenseTotal.innerHTML = ""; 
            expenseTotal.appendChild(editExpenseAmount);

            expenseOwner.innerHTML = "";
            expenseOwner.appendChild(editPayerSelect);

            // Add a "Save" button to confirm the changes
            const saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            saveButton.classList.add("button");
            expenseEdit.appendChild(saveButton);

            // Handle saving the edited values
            saveButton.addEventListener("click", () => {
                const newExpenseName = editExpenseName.value;
                const newExpenseAmount = parseFloat(editExpenseAmount.value);
                const newPayer = editPayerSelect.value;

                if (newExpenseName === "" || isNaN(newExpenseAmount) || newPayer === "") {
                    alert("Please fill out all fields");
                    return;
                }

                // Update the expense object with new values
                expense.name = newExpenseName;
                expense.amount = newExpenseAmount;
                expense.owner = newPayer;

                // Re-render the expense table to show the updated data
                expenseRender();
            });
        });

        deleteButton.addEventListener("click", () =>{
            selectedEvent.expenses.splice(index, 1);
            expenseRender();
        });

        expenseDate.textContent = expense.date;
        expenseDate.classList.add("expense-date");
        tr.appendChild(expenseDate);

        expenseExpense.textContent = expense.name;
        expenseExpense.classList.add("expense-expense");
        tr.appendChild(expenseExpense);

        expenseOwner.textContent = expense.owner;
        expenseOwner.classList.add("expense-owner");
        tr.appendChild(expenseOwner);

        const totalFormattedAmount = expense.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        expenseTotal.textContent = totalFormattedAmount;
        expenseTotal.classList.add("expense-total");
        tr.appendChild(expenseTotal);

        total = total + expense.amount;

        let individualFormattedAmount = null;
        if(expense.owner === "Cole"){
            individualFormattedAmount = ((0)/selectedEvent.members.length).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });
            totalIndividual = totalIndividual + 0;
        } else {
            individualFormattedAmount = ((expense.amount)/selectedEvent.members.length).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });
            totalIndividual = totalIndividual + ((expense.amount)/selectedEvent.members.length);
        }

        console.log(totalIndividual);

        expenseOwe.textContent = individualFormattedAmount;
        expenseOwe.classList.add("expense-owe");
        tr.appendChild(expenseOwe);

        expenseList.appendChild(tr);

    });
    const formattedAmount = total.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    const formattedIndividualAmount = totalIndividual.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    totalAmount.textContent = formattedAmount;
    totalIndividualAmount.textContent = formattedIndividualAmount;

// ****************************EXPORT TO EXCEL**********************************
    const exportToExcel = document.getElementById("export-to-excel");
    exportToExcel.addEventListener("click", () => {
        const expenseList = document.getElementById("expense-table");
        const rows = expenseList.querySelectorAll("tr");
        let data = [];
        let totalAmount = 0;
        let totalOwed = 0;

        rows.forEach((row, rowIndex) => {
            const rowData = [];
            row.querySelectorAll("td:not(:first-child), th:not(:first-child)").forEach((cell, cellIndex) => {
                rowData.push(cell.innerText);
                if (rowIndex > 0 && cellIndex === 3) { 
                    totalAmount += parseFloat(cell.innerText.replace(/[$,]/g, "")); 
                }
                if (rowIndex > 0 && cellIndex === 4) { 
                    totalOwed += parseFloat(cell.innerText.replace(/[$,]/g, "")); 
                }
            });
            data.push(rowData);
        });

        // Convert data to PDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Add a title to the PDF
        doc.text(`${selectedEvent.name} Expense Report for Cole`, 14, 10);

        doc.autoTable({
            head: [data[0]], 
            body: data.slice(1), 
            startY: 20, 
        });
        doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 10);
        doc.text(`Total Amount Owed: $${totalOwed.toFixed(2)}`, 14, doc.autoTable.previous.finalY + 16);

        doc.save("expenses.pdf");
});


}
