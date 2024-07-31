
let input = document.querySelector("#task-input");
let btn = document.querySelector("#btn");
let tasks = document.querySelector("#tasks");
let searchInput = document.querySelector("#search-input");

let allTasks;
// Check Local Storage Is Empty Or Not
if (window.localStorage.getItem("taskInLocal")) {
    allTasks = JSON.parse(window.localStorage.getItem("taskInLocal"));
} else {
    allTasks = [];
}

// Function to create and display task
function createTaskElement(taskObj) {
    // Create Elements 
    let parent = document.createElement("div");
    let btns = document.createElement("div");
    let para = document.createElement("p");
    let deleteBtn = document.createElement("button");
    let editBtn = document.createElement("button");

    // Add Text To Elements Created
    let deleteBtnText = document.createTextNode("Delete");
    let editBtnText = document.createTextNode("Edit");

    // Add Attributes To Elements Created
    parent.className = "div-task";
    deleteBtn.id = "delete";
    editBtn.id = "edit";
    parent.style.marginBottom = "20px";

    // Append Task Content To Paragraph
    para.innerHTML = taskObj.task;
    deleteBtn.appendChild(deleteBtnText);
    editBtn.appendChild(editBtnText);

    // Append Created Element To Body
    parent.appendChild(para);
    parent.appendChild(btns);
    btns.appendChild(editBtn);
    btns.appendChild(deleteBtn);
    tasks.appendChild(parent);

    // Add delete functionality
    deleteBtn.addEventListener("click", function () {
        parent.remove();
        allTasks = allTasks.filter(t => t.task !== taskObj.task);
        window.localStorage.setItem("taskInLocal", JSON.stringify(allTasks));
    });

    // Add edit functionality
    editBtn.addEventListener("click", function () {
        let newTask = prompt("Edit your task:", taskObj.task);
        if (newTask && newTask.trim() !== "") {
            taskObj.task = newTask.trim();
            para.innerHTML = newTask.trim();
            window.localStorage.setItem("taskInLocal", JSON.stringify(allTasks));
        }
    });
}

// Load existing tasks
allTasks.forEach(ele => {
    createTaskElement(ele);
});

btn.addEventListener("click", function () {
    // Check if input value length is greater than zero
    if (input.value.length > 0) {
        // Save Input Value In Object
        let newObj = {
            task: input.value,
        }
        // Push Object In Array
        allTasks.push(newObj);
        console.log(allTasks);
        // Add Array To Local Storage As A String
        window.localStorage.setItem("taskInLocal", JSON.stringify(allTasks));
        // Create and Display Task Element
        createTaskElement(newObj);
        // Empty The Input After Add && Focus It
        input.value = "";
        input.focus();
    }
});

// Function to search tasks
function searchTasks(query) {
    // Clear current displayed tasks
    tasks.innerHTML = "";
    // Filter tasks based on query and display them
    allTasks
        .filter(ele => ele.task.toLowerCase().includes(query.toLowerCase()))
        .forEach(ele => createTaskElement(ele));
}

// Add event listener for search input
searchInput.addEventListener("input", function () {
    searchTasks(searchInput.value);
});
