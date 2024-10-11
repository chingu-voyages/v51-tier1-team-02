
/***GENERAL/MODAL VARIABLES*********************************************************/

const h1 = document.querySelector('#h1text');

const addUserButton = document.querySelector('#add-user');

const addUserForm = document.querySelector('#add-user-form');

const submitUserButton = document.querySelector('#submit-user');

const closeButton = document.querySelector('#form-close');

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
        //updates the dropdown with new users added
        if(selectedEvent === null) {
          renderUsers();
        } else {
          console.log("need to update dropdown list on events.js");
        }
    }
};

closeUserForm();

/***AUTO ID VARIABLES*********************************************************/

import { members } from "./arrays.js";

const profilePic = document.querySelector('#profile-picture');
const username = document.querySelector('#username');
const usernameInput = username.value; //grabs the text input

export const templateusersList = document.getElementById("users-list");

/***AUTO ID FUNCTION*********************************************************/

//when button is clicked this adds a user to the list
submitNameButton.addEventListener('click', () => {
  const inputValue = username.value;
  const usernameId = "id" + Math.random().toString(16).slice(2);
  const newMember = {name: inputValue, memberID: usernameId};

  members.push(newMember);
  console.log(members);
  if(selectedEvent === null) {
    console.log(selectedEvent);
    renderUsers();
  } else {
    console.log("members array updated");
  }
  username.value = "";
});

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
  bodyMenu.classList.toggle('hidden-menu-body');

});
};

/*****EXIT HAMBURGER MENU***********************************/

const burgerLinks = document.querySelectorAll('.burger-link');
const burgerLink = document.querySelector('.burger-link');
const hiddenMenu = document.getElementById('hidden-menu');
const offScreenMenu = document.querySelector('.off-screen-menu');
const burgerBar = document.querySelector('.burger-bar');
const bodyMenu = document.querySelector('.main-page');

console.log(hiddenMenu);

//loop through menu buttons to make hidden menu disappear and allow scroll
burgerLinks.forEach(function(burgerLink) {
  burgerLink.addEventListener('click', function() {
  burgerBar.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
  bodyMenu.classList.remove('hidden-menu-body');
});

});



 