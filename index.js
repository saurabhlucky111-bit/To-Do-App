let input = document.querySelector("input");
let btn = document.querySelector("button");
let container = document.querySelector("#container");
let totalTask = document.querySelector("#total-task");
let compTask = document.querySelector("#comp-task");
let pendTask = document.querySelector("#rem-task");
let searchInput = document.querySelector("#search");
let allBtn = document.querySelector("#all-btn");
let completedBtn = document.querySelector("#completed-btn");
let pendingBtn = document.querySelector("#pending-btn");

let currentFilter = "all";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateUI() {
  let totalCount = tasks.length;
  let compCount = tasks.filter((task) => task.completed).length;
  let remCount = totalCount - compCount;

  totalTask.textContent = `Total-task:${totalCount}`;
  compTask.textContent = `Completed : ${compCount}`;
  pendTask.textContent = `Pending : ${remCount}`;
}

function renderTasks() {
  container.innerHTML = "";
  tasks.forEach((task, index) => {
    let taskDiv = document.createElement("div");
    let para = document.createElement("p");
    let deleteButton = document.createElement("button");
    let editButton = document.createElement("button");
    let searchText = searchInput.value;

    taskDiv.classList.add("task");
    deleteButton.classList.add("delete-btn");

    para.textContent = task.text;

    if (task.completed) {
      taskDiv.classList.add("completed");
      deleteButton.style.backgroundColor = "blue";
      para.style.color = "brown";
    }

    if (
      searchText &&
      !task.text.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return;
    }

    if (currentFilter === "completed" && !task.completed) {
      return;
    }

    if (currentFilter === "pending" && task.completed) {
      return;
    }

    para.addEventListener("click", function () {
      task.completed = !task.completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));

      renderTasks();
      updateUI();
    });

    editButton.textContent = "✏️";

    editButton.addEventListener("click", function () {
      let newText = prompt("Enter new task");

      if (!newText || !newText.trim()) return;

      task.text = newText;
      console.log(tasks);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
      updateUI();
    });

    deleteButton.textContent = "❌";

    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);

      localStorage.setItem("tasks", JSON.stringify(tasks));

      renderTasks();

      updateUI();
    });

    taskDiv.appendChild(para);
    taskDiv.appendChild(editButton);
    taskDiv.appendChild(deleteButton);
    container.appendChild(taskDiv);
  });
}

btn.addEventListener("click", function () {
  let newTask = input.value.trim();

  if (!newTask) return;

  tasks.push({
    text: newTask,
    completed: false,
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  console.log(tasks);

  updateUI();

  input.value = "";

  renderTasks();
});
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    btn.click();
  }
});

searchInput.addEventListener("input", function () {
  renderTasks();
});

allBtn.addEventListener("click", function () {
  currentFilter = "all";

  allBtn.classList.remove("active");
  completedBtn.classList.remove("active");
  pendingBtn.classList.remove("active");
  allBtn.classList.add("active");

  renderTasks();
});

completedBtn.addEventListener("click", function () {
  currentFilter = "completed";

  allBtn.classList.remove("active");
  completedBtn.classList.remove("active");
  pendingBtn.classList.remove("active");
  completedBtn.classList.add("active");

  renderTasks();
});

pendingBtn.addEventListener("click", function () {
  currentFilter = "pending";

  allBtn.classList.remove("active");
  completedBtn.classList.remove("active");
  pendingBtn.classList.remove("active");
  pendingBtn.classList.add("active");

  renderTasks();
});

updateUI();
renderTasks();
