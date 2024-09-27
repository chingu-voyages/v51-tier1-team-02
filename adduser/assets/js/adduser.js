
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
  console.log(members);
  renderUsers();

  username.value = "";
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

    deleteButton.addEventListener('click', () => {
      console.log("click");
      members.splice(index, 1);
      renderUsers();
    });
  });

}

renderUsers();




