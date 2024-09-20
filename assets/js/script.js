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
    
});


//This will be a button to add a member to the member list
const addUser = document.querySelector("#add-user");



//This will be a button to remove someone from the member list


/* This will be a counter for the number of people added to the list.
it will be passed to the people doing the expense calculations */