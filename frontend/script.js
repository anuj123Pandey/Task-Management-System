
const input = document.getElementById("box");
const btn = document.getElementById("btn");
const cancelEditBtn = document.getElementById("cancelEdit");
const clearBtn = document.getElementById("clearBtn");
const result = document.getElementById("tasklist");
const searchBox = document.getElementById("searchBox");
const taskCount = document.getElementById("taskCount");

let tasks = [];
let editingTask = null;

try {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    tasks = Array.isArray(storedTasks) ? storedTasks : [];
} catch (error) {
    tasks = [];
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskCount() {
    const total = tasks.length;
    taskCount.textContent = total === 1 ? "1 task" : `${total} tasks`;
}

function updateButtonState() {
    if (editingTask) {
        btn.textContent = "Save Changes";
        cancelEditBtn.classList.add("visible");
    } else {
        btn.textContent = "Add Task";
        cancelEditBtn.classList.remove("visible");
    }
}

function clearEditingState() {
    editingTask = null;
    input.value = "";
    updateButtonState();
}

function showTask(taskData) {
    const list = document.createElement("li");
    list.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = taskData.completed;

    checkbox.addEventListener("change", function () {
        taskData.completed = checkbox.checked;
        list.classList.toggle("completed", checkbox.checked);
        saveTasks();
        renderTasks(searchBox.value);
    });

    const taskText = document.createElement("span");
    taskText.textContent = taskData.text;
    taskText.classList.add("task-text");

    const edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.classList.add("action-btn", "edt-btn");

    edit.addEventListener("click", function () {
        editingTask = taskData;
        input.value = taskData.text;
        input.focus();
        updateButtonState();
    });

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.classList.add("action-btn", "del-btn");

    del.addEventListener("click", function () {
        if (editingTask === taskData) {
            clearEditingState();
        }

        tasks = tasks.filter(function (item) {
            return item !== taskData;
        });

        saveTasks();
        renderTasks(searchBox.value);
    });

    list.classList.toggle("completed", taskData.completed);
    list.appendChild(checkbox);
    list.appendChild(taskText);
    list.appendChild(edit);
    list.appendChild(del);

    result.appendChild(list);
}

function renderTasks(searchText = "") {
    result.innerHTML = "";

    const normalizedSearch = searchText.toLowerCase().trim();
    const filteredTasks = tasks.filter(function (taskData) {
        return taskData.text.toLowerCase().includes(normalizedSearch);
    });

    if (filteredTasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.classList.add("empty-state");
        emptyMessage.textContent = normalizedSearch
            ? "No tasks match your search."
            : "No tasks yet. Add one above!";
        result.appendChild(emptyMessage);
        updateTaskCount();
        return;
    }

    filteredTasks.forEach(function (taskData) {
        showTask(taskData);
    });

    updateTaskCount();
}

function submitTask() {
    const task = input.value.trim();

    if (task === "") {
        alert("Please enter your task!");
        return;
    }

    if (editingTask === null) {
        tasks.push({
            text: task,
            completed: false
        });
    } else {
        editingTask.text = task;
        editingTask = null;
    }

    saveTasks();
    renderTasks(searchBox.value);
    input.value = "";
    updateButtonState();
    input.focus();
}

searchBox.addEventListener("input", function () {
    renderTasks(searchBox.value);
});

btn.addEventListener("click", submitTask);

cancelEditBtn.addEventListener("click", function () {
    clearEditingState();
    input.focus();
});

clearBtn.addEventListener("click", function () {
    tasks = [];
    editingTask = null;
    saveTasks();
    renderTasks(searchBox.value);
    input.value = "";
    updateButtonState();
});

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        submitTask();
    }
});

updateButtonState();
renderTasks();










