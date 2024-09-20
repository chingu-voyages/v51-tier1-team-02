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