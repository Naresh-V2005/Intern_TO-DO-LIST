let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = 'all';

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'completed') return task.completed;
    if (currentFilter === 'pending') return !task.completed;
    return true;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <input type="checkbox" onchange="toggleComplete(${index})" ${task.completed ? "checked" : ""}>
      <div class="task-info">
        <span>${task.text}</span>
        <div class="timestamp">${task.timestamp}</div>
      </div>
      <div class="actions">
        <button onclick="editTask(${index})">✏</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function addTask(text) {
  const timestamp = new Date().toLocaleString();
  tasks.push({ text, completed: false, timestamp });
  saveTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
  }
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    saveTasks();
  }
}

function filterTasks(type) {
  currentFilter = type;
  renderTasks();
}

document.getElementById("task-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (text !== "") {
    addTask(text);
    input.value = "";
  }
});

renderTasks();