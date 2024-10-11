
/***GENERAL/MODAL VARIABLES*********************************************************/

const h1 = document.querySelector('#h1text');
// console.log(h1);

const addUserButton = document.querySelector('#add-user');
// console.log(addUserButton);

const addUserForm = document.querySelector('#add-user-form');
// console.log(addUserForm);

const submitUserButton = document.querySelector('#submit-user');
// console.log(submitUserButton);

const closeButton = document.querySelector('#form-close');
// console.log(closeButton);

const submitNameButton = document.querySelector('#submit-name');

const usernameContainer = document.querySelector('input #username');

export const listofUsers = document.querySelector("#list-of-users");

/***MODAL FUNCTION*********************************************************/
import { selectedEvent, getSelectedEvent } from "./events.js";

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
// *************NATALIE ADDED THIS ****************
        if(selectedEvent === null) {
          renderUsers();
        } else {
          console.log("need to update dropdown list on events.js");
        }
    }
};

closeUserForm();

/***AUTO ID VARIABLES*********************************************************/
// let members = [
//   {name: "John", memberID: 1111},
//   {name: "Jane", memberID: 2222},
//   {name: "Joe", memberID: 3333},
//   {name: "Cole", memberID: 4444},
// ];

import { members } from "./arrays.js";

const profilePic = document.querySelector('#profile-picture');
const username = document.querySelector('#username');
const usernameInput = username.value;

export const templateusersList = document.getElementById("users-list");

/***AUTO ID FUNCTION*********************************************************/

//when button is clicked this adds a user to the list
submitNameButton.addEventListener('click', () => {
  const inputValue = username.value;
  const usernameId = "id" + Math.random().toString(16).slice(2);

  const newMember = {name: inputValue, memberID: usernameId};

  members.push(newMember);
  console.log(members);
  // *************NATALIE ADDED THIS ****************
  if(selectedEvent === null) {
    console.log(selectedEvent);
    renderUsers();
  } else {
    console.log("members array updated");
  }

  username.value = "";
});

/** TRIAL CODE FOR ID FUNCTION
 *submitNameButton.addEventListener('click', () => {
  //const inputValue = username.value;
  const required = function(e) { 
    const inputValue = username.value;
      if(inputValue === "") {
        e.preventDefault();
        alert("Enter in a name.");
        //go here
      } else {
        username.value
      }
    }
  }
  
**/


/******ADD USERS TO LIST******************************************************/
export function renderUsers () {
  //keeps list from repeating
  templateusersList.innerHTML = "";
  members.forEach((member, index) => {

    const memberImg = document.createElement("img");
    memberImg.classList.add("profile-style");
    memberImg.src = "assets/img/anon.png";
    memberImg.alt = "profile";


    const memberItem = document.createElement("li");
    memberItem.textContent = member.name;
    

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-users-button");
    deleteButton.textContent = "X";
    
    templateusersList.appendChild(memberImg);
    templateusersList.appendChild(memberItem);
    templateusersList.appendChild(deleteButton);

/*
//TRIAL CODE
    const memberDiv = document.querySelector('.memberDiv');
    memberDiv.appendChild(memberImg);

    //change this
    const nameimgDiv = document.querySelector('.nameimgDiv');
    nameimgDiv.appendChild(memberItem);
    nameimgDiv.appendChild(deleteButton);

//TRIAL CODE ENDS HERE
*/

    deleteButton.addEventListener('click', () => {
      members.splice(index, 1);
      renderUsers();
    });

  });

}

renderUsers();

/**********Hamburger Menu**********/



const mediaQuery = window.matchMedia('(max-width: 768px)');

if (mediaQuery.matches) {

const burgerBar = document.querySelector('.burger-bar');

const offScreenMenu = document.querySelector('.off-screen-menu');
const bodyMenu = document.querySelector('.main-page');

burgerBar.addEventListener('click', () => {
  burgerBar.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
  /*bodyMenu.classList.toggle('hidden-menu-body');*/
  bodyMenu.classList.add('hidden-menu-body');
})

  // Code to execute if the media query matches (viewport width is 768px or greater)
  console.log('Media query matches!');
} else {
  // Code to execute if the media query does not match
  console.log('Media query does not match.');
}

/*****EXIT HAMBURGER MENU***********************************/

const burgerLinks = document.querySelectorAll('.burger-link');
const burgerLink = document.querySelector('.burger-link');
const hiddenMenu = document.getElementById('hidden-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const burgerBar = document.querySelector('.burger-bar');
const bodyMenu = document.querySelector('.main-page');


console.log(hiddenMenu);

burgerLinks.forEach(function(burgerLink) {
  burgerLink.addEventListener('click', function() {
  burgerBar.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
  bodyMenu.classList.remove('hidden-menu-body');

  console.log(':))))');
});
});

/*burgerLink.addEventListener('click', () => {

  console.log('burger is working!');

});*/

/*
const breakdownButton = document.querySelectorAll('.breakdown');
breakdownButton.forEach(function(btn) {
  btn.addEventListener('click', function() {
    console.log();
  });
});



*/

