
// =====================================
// 1. GET TOKEN AND USER FROM LOCALSTORAGE
// =====================================

const token = localStorage.getItem("token");

const user = JSON.parse(
    localStorage.getItem("user") || "null"
);

const API_URL = "http://localhost:3000/api/tasks";


// =====================================
// 2. CHECK AUTHENTICATION
// =====================================

if (!token || !user) {

    window.location.href = "index.html";

} else {

    document.getElementById("welcome").innerText =
        "Welcome, " + user.name + "!";

    // Show user's first letter in profile avatar
    const avatar = document.querySelector(".profile-avatar");

    if (avatar) {
        avatar.textContent = user.name.charAt(0).toUpperCase();
    }

}


// =====================================
// 3. LOGOUT FUNCTIONALITY
// =====================================

document.getElementById("logoutBtn").addEventListener("click", function() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "index.html";

});


// =====================================
// 4. COMMON API REQUEST FUNCTION
// =====================================

async function apiRequest(url, options = {}) {

    const response = await fetch(API_URL + url, {

        ...options,

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            ...options.headers
        }

    });

    const data = await response.json();

    if (response.status === 401 || response.status === 403) {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "index.html";

        throw new Error("Session expired. Please login again.");

    }

    if (!response.ok) {

        throw new Error(data.message || "Something went wrong");

    }

    return data;

}


// =====================================
// 5. UPDATE DASHBOARD STATISTICS
// =====================================

function updateStats(tasks) {

    // Total number of tasks
    const total = tasks.length;

    // Count completed tasks
    const completed = tasks.filter(function(task) {

        return task.completed === true;

    }).length;

    // Count pending tasks
    const pending = total - completed;


    // Display values on dashboard

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent = pending;

}


// =====================================
// 6. ADD NEW TASK
// =====================================

const taskForm = document.getElementById("taskForm");

taskForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const title = document.getElementById("title").value.trim();

    const description = document.getElementById("description").value.trim();

    if (!title) {
        alert("Please enter task title");
        return;
    }

    try {

        const data = await apiRequest("", {

            method: "POST",

            body: JSON.stringify({
                title,
                description
            })

        });

        alert(data.message);

        taskForm.reset();

        // Refresh tasks and statistics
        loadTasks();

    } catch (error) {

        alert(error.message);

    }

});


// =====================================
// 7. FETCH ALL TASKS
// =====================================

async function loadTasks() {

    const container = document.getElementById("tasksContainer");

    try {

        const data = await apiRequest("", {
            method: "GET"
        });

        container.innerHTML = "";

        const tasks = data.tasks || [];

        // IMPORTANT: Update statistics
        updateStats(tasks);


        if (tasks.length === 0) {

            container.textContent =
                "No tasks available. Add your first task!";

            return;

        }


        // Display all tasks

        tasks.forEach(function(task) {

            displayTask(task);

        });

    } catch (error) {

        container.textContent = error.message;

        console.log(error);

    }

}


// =====================================
// 8. DISPLAY INDIVIDUAL TASK
// =====================================

function displayTask(task) {

    const container = document.getElementById("tasksContainer");

    const card = document.createElement("div");

    card.className = "task-card";

    if (task.completed) {

        card.classList.add("completed-task");

    }


    const heading = document.createElement("h3");

    heading.textContent = task.title;


    const description = document.createElement("p");

    description.textContent =
        task.description || "No description";


    const actions = document.createElement("div");

    actions.className = "task-actions";


    // Completion checkbox

    const label = document.createElement("label");

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function() {

        updateTask(task._id, {

            title: task.title,

            description: task.description,

            completed: checkbox.checked

        });

    });


    label.appendChild(checkbox);

    label.appendChild(
        document.createTextNode("Completed")
    );


    // Edit button

    const editBtn = document.createElement("button");

    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", function() {

        editTask(task);

    });


    // Delete button

    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";

    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", function() {

        deleteTask(task._id);

    });


    actions.append(label, editBtn, deleteBtn);

    card.append(heading, description, actions);

    container.appendChild(card);

}


// =====================================
// 9. UPDATE TASK
// =====================================

async function updateTask(id, updatedData) {

    try {

        const data = await apiRequest("/" + id, {

            method: "PUT",

            body: JSON.stringify(updatedData)

        });

        alert(data.message);

        // Refresh tasks and statistics
        loadTasks();

    } catch (error) {

        alert(error.message);

        loadTasks();

    }

}


// =====================================
// 10. EDIT TASK
// =====================================

function editTask(task) {

    const newTitle = prompt(
        "Enter new task title:",
        task.title
    );

    if (newTitle === null) return;

    if (!newTitle.trim()) {

        alert("Title cannot be empty");

        return;

    }


    const newDescription = prompt(
        "Enter new description:",
        task.description || ""
    );

    if (newDescription === null) return;


    updateTask(task._id, {

        title: newTitle.trim(),

        description: newDescription.trim(),

        completed: task.completed

    });

}


// =====================================
// 11. DELETE TASK
// =====================================

async function deleteTask(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;


    try {

        const data = await apiRequest("/" + id, {

            method: "DELETE"

        });

        alert(data.message);

        // Refresh tasks and statistics
        loadTasks();

    } catch (error) {

        alert(error.message);

    }

}


// =====================================
// 12. LOAD TASKS WHEN DASHBOARD OPENS
// =====================================

if (token && user) {

    loadTasks();

}
