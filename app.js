// Get all our UI Elements
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearbtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

// Load Event Listeners
loadEvenListeners();

// Add Task
function loadEvenListeners() {
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearbtn.addEventListener("click", clearTasks);
  filter.addEventListener("keyup", filterTasks);
  document.addEventListener("DOMContentLoaded", getTasks());
}

function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    // Create li tag
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    // Create a tag
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";

    // Insert I (icon) to
    link.innerHTML = "<i class= 'fa fa-remove'></i>";

    li.appendChild(link);
    taskList.appendChild(li);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Please enter a task");
  } else {
    // Create li tag
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(taskInput.value));

    // Create a tag
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";

    // Insert I (icon) to
    link.innerHTML = "<i class= 'fa fa-remove'></i>";

    li.appendChild(link);
    taskList.appendChild(li);

    storeLocal(taskInput.value);

    taskInput.value = "";
  }

  e.preventDefault();
}

function storeLocal(task) {
  let tasks;

  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    e.target.parentElement.parentElement.remove();
    removeFromLS(e.target.parentElement.parentElement);
  }
}

function removeFromLS(taskItem) {
  let tasks;

  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}

function clearTasks(e) {
  taskList.innerHTML = "";

  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  const lis = document.querySelectorAll(".collection-item");

  lis.forEach(function (li) {
    const item = li.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) > -1) {
      li.style.display = "block";
    } else {
      li.style.display = "none";
    }
  });
}
