
/***GENERAL/MODAL VARIABLES*********************************************************/

const h1 = document.querySelector('#h1text');
console.log(h1);

const addUserButton = document.querySelector('#add-user');
console.log(addUserButton);

const addUserForm = document.querySelector('#add-user-form');
console.log(addUserForm);

const submitUserButton = document.querySelector('#submit-user');
console.log(submitUserButton);

const closeButton = document.querySelector('#form-close');
console.log(closeButton);

const submitNameButton = document.querySelector('#submit-name');

const usernameContainer = document.querySelector('input #username');

const listofUsers = document.querySelector("#list-of-users");

/***MODAL FUNCTION*********************************************************/

h1.classList.add("active");

addUserButton.classList.add("active");

//event where once the button is clicked, a modal form pops up
function openUserForm () {
    addUserButton.onclick = function () {
        addUserForm.classList.remove('hidden');
        addUserForm.classList.add('show-user-form');
    }
}; 

openUserForm();

function closeUserForm () {
    closeButton.onclick = function () {
        addUserForm.classList.remove('show-user-form');
        addUserForm.classList.add('hidden');
    }
};

closeUserForm();

/***AUTO ID VARIABLES*********************************************************/
let members = [
  {name: "Natalie", memberID: 1111},
  {name: "Molly", memberID: 2222},
  {name: "Val", memberID: 3333},
  {name: "Carina", memberID: 4444},
];

const profilePic = document.querySelector('#profile-picture');
const username = document.querySelector('#username');
const usernameInput = username.value;

const templateusersList = document.getElementById('users-list');

/***AUTO ID FUNCTION*********************************************************/



//when button is clicked this adds a user to the list
submitNameButton.addEventListener('click', () => {
  const inputValue = username.value;
  const usernameId = "id" + Math.random().toString(16).slice(2);
  members.push({name:inputValue, memberID: usernameId});
  templateusersList.insertAdjacentHTML('beforeend', `<li>${inputValue}</li> <p class = "hidden">${usernameId}</p>
   <button type="delete" class="delete-user">X</button>`);
  console.log(members);
  // Need to clear the field after submit is clicked
  
  inputValue.value = "";

   const deleteUserButton = document.querySelector(".delete-user");
   deleteUserButton.addEventListener('click', () => {
     //templateusersList.innerHTML = "";
     deleteUserButton.classList.add('hidden');

    
   deleteUserButton.classList.add("active");

    })
   
   
});

/******ADD USERS TO LIST******************************************************/
function renderUsers () {
  //keeps list from repeating
  templateusersList.innerHTML = "";
  members.forEach((member, index) => {
    const memberItem = document.createElement("li");
    memberItem.textContent = member.name;
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "X";

    templateusersList.appendChild(memberItem);
    templateusersList.appendChild(deleteButton);
  });

}

renderUsers();
/************************************************************/

//variables

//console.log(usernameInput);

// Add Username
//let users = [
//  { name: "Bob", userlistID: 1234, expense: 100 },
 // { name: "Jake", userlistID: 1235, expense: 200 },
//  { name: "Sally", userlistID: 12534, expense: 300 },
//];

//ul


  // Loop through the users and create a list
  //inputValue.forEach((user) => {
  //  const userId = document.createElement("li");
  //  userItem.textContent = user.name;
  //  const deleteUserButton = document.createElement("button");


//var id = "id" + Math.random().toString(16).slice(2)
    
//console.log(id)

//const for add user button
//const addUserButton = document.querySelector('#add-user');
//const for container of users that appear

/*
const userContainer = document.getElementById("user-container");

let userGroup = []; / array for pushing users/

// display users array
function renderUsers() {
  userContainer.innerHTML = "";

  // loop through the users and create a list
  const userRow = document.getElementById("users-list");
  userRow.innerHTML = "";

  // Loop through the users and create a list
  users.forEach((user, index) => {
    const userItem = document.createElement("li");
    userItem.textContent = user.name;
    const deleteUserButton = document.createElement("button");
    deleteUserButton.type = "button";
    deleteUserButton.textContent = "X";

    // event listener for when a user is clicked should render modify page
    const userMods = document.getElementById("user-modifications");
  
    userItem.addEventListener("click", () => {
      console.log(`${user.name} clicked`);
      userMods.innerHTML = "";
      const userHeader = document.createElement("h2");
      userHeader.textContent = `${user.name}`;
      userMods.appendChild(userHeader);
    });

    // event listener to delete the event from the main page
    deleteUserButton.addEventListener("click", () => {
      const userDeleteWarning = document.createElement("p");
      userDeleteWarning.textContent = `Are you sure you want to delete the ${user.name} user?`;
      userDeleteWarning.classList.add("warning-text");
    
    // Create a "yes" button
      const yesDeleteUserButton = document.createElement("button");
      yesDeleteUserButton.type = "button";
      yesDeleteUserButton.textContent = "Yes";

      // handle the delete action on the "yes" click
      yesDeleteUserButton.addEventListener("click", function () {
        users.splice(index, 1);
        renderUsers();
      
      });

      // Create and handle the "no" button
      const noDeleteUserButton = document.createElement("button");
      noDeleteUserButton.type = "button";
      noDeleteUserButton.textContent = "No";
      noDeleteUserButton.addEventListener("click", function () {
        userRow.removeChild(userDeleteWarning);
        userRow.removeChild(yesDeleteUserButton);
        userRow.removeChild(noDeleteUserButton);
      });

      // append the warning and the yes/no buttons
      userRow.appendChild(userDeleteWarning);
      userRow.appendChild(yesDeleteUserButton);
      userRow.appendChild(noDeleteUserButton);
    });
    // append the event list and the delete buttons
    userRow.appendChild(userItem);
    userRow.appendChild(deleteUserButton);
  });
}

// Render the events table on refresh
renderUsers();

// Click the add button to add a user
submitUserButton.addEventListener("click", () => {
  console.log("clicked");

/*********************************************************************/
//trial code for submit button

//button
//const submitUserButton1 = document.getElementById('submit-user');

//input
//const username = document.getElementById('username');



//TO DO: add delete buttons for users, add an alert message for deleting, clean up modal buttons and styling, auto generated id

//})

/********************************************************************* *

  // Create a new input element
  const userInputBox = document.createElement("input");
  userInputBox.type = "text";
  userInputBox.placeholder = "Enter user name";
  const userInputButton = document.createElement("button");
  userInputButton.type = "button";
  userInputButton.textContent = "Add";

  userInputButton.addEventListener("click", () => {
    const userName = userInputBox.value;
    let userValue = parseFloat(
      document.getElementById("user-input").value
    ); /* user input /
    if (userName) {
      const newUser = { name: userName, userlistID: Date.now(), expense: value };
      userGroup.push(newUser); /* for expense div /
      users.push(newUser); // Add user to the array
      console.log("User add:", newUser.name);
      console.log("User ID:", newUser.userlistID);
      userInputBox.value = "";
      renderUsers();
      userDiv(); /* expense function /
    }
  });
  // Append the input box to the container
  userContainer.appendChild(userInputBox);
  userContainer.appendChild(userInputButton);
});

/**************************************************

// User display functions
let userDisplay = [];
function userDiv() {
  userGroup.forEach((item, index) => {
    //may want to take out item.expense in span
    display = `
    <div class="user-container">
        <h3>User: ${item.name}</h3>
        <span> $${item.expense}</span>
        <button onclick=(${deleteUserBtn()}) id="delete-user-btn">Delete</button>
        <button id="edit-user-btn" >Edit</button>
        <p>${index}</p>
    </div>
    `;
  });

  document.getElementById("user-result").innerHTML += display;

  function deleteUserBtn() {
    console.log("hi");
  }
}



**********************/














// Add Event /*******USER CODE***************************************** */
/*
let events = [
  { name: "Movie", eventID: 1234, expense: 100 },
  { name: "Dinner Party", eventID: 1235, expense: 200 },
  { name: "Ski Tip", eventID: 12534, expense: 300 },
];
const addUserButton = document.querySelector('#add-user');
const eventContainer = document.getElementById("eventContainer");

let group = []; / array for push expense group  /

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
    ); / expense input /
    if (eventName) {
      const newEvent = { name: eventName, eventID: Date.now(), expense: value };
      group.push(newEvent); / for expense div /
      events.push(newEvent); // Add event to the array
      console.log("Event add:", newEvent.name);
      console.log("Event ID:", newEvent.eventID);
      eventInputBox.value = "";
      renderEvents();
      expenseDiv(); / expense function /
    }
  });
  // Append the input box to the container
  eventContainer.appendChild(eventInputBox);
  eventContainer.appendChild(eventInputButton);
});


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
}  */

/**************************************************/




//maybe the .value stuff will work now that its not refreshing
//once we figure that stuff out, we can make a function to putt he key value pairs into a string


//thatll have the profile picture, first name, autogenerated id***
//itll have a submit button (through a click event- this adds the variable to the list as an item)
//when submitted, an alert pops up saying "${name} was added to the group"
//have the info arranged in a way where the picture is on top and the name is on bottom

/*
    </script> */