function createUsersElement(data) {
    const user = document.createElement("div");
    user.className = "userDiv";

    const userID = document.createElement("p");
    userID.textContent = "ID: " + data["id"];

    const username = document.createElement("p");
    username.textContent = "Username: " + data["username"];

    const email = document.createElement("p");
    // email.textContent = "Email: " + data["email"];
    email.textContent = "Email: ";

    const tasks = document.createElement("p");
    // tasks.textContent = "tasks: " + data["tasks"];
    tasks.textContent = "tasks: ";

    user.appendChild(tasks)
    user.appendChild(email)
    user.appendChild(userID)
    user.appendChild(username)
    return user
}

async function loadUsers() {
    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    const response = await fetch("http://localhost:3000/users", options);

    if (response.status == 200) {
        const users = await response.json();
        const container = document.getElementById("users");

        const closeBtn = document.createElement("button");
        closeBtn.textContent = "close";
        closeBtn.className = "userDiv"
        closeBtn.addEventListener('click', closeUsers)
        container.appendChild(closeBtn);

        users.forEach(p => {
            const elem = createUsersElement(p);
            container.appendChild(elem);
        })
    } else {
        window.location.assign("./index.html");
    }
}

function createTasksElement(data) {
    const task = document.createElement("div");
    task.className = "taskDiv";

    const taskID = document.createElement("p");
    taskID.textContent = "ID: " + data["id"];

    const name = document.createElement("p");
    name.textContent = "Task name: " + data["task_name"];

    const status = document.createElement("p");
    status.textContent = "Status: " + data["status"];

    const noNeeded = document.createElement("p");
    noNeeded.textContent = "Number of volunteers needed: " + data["num_volunteers_needed"];

    const startDate = document.createElement("p");
    startDate.textContent = "Start Date: " + data["start_date"];

    task.appendChild(taskID)
    task.appendChild(name)
    task.appendChild(status)
    task.appendChild(noNeeded)
    task.appendChild(startDate)
    return task
}

async function loadTasks() {
    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    const response = await fetch("http://localhost:3000/tasks", options);

    if (response.status == 200) {
        const tasks = await response.json();
        const container = document.getElementById("tasks");

        const closeBtn = document.createElement("button");
        closeBtn.textContent = "close";
        closeBtn.className = "taskDiv"
        closeBtn.addEventListener('click', closeTasks)
        container.appendChild(closeBtn);

        tasks.forEach(p => {
            const elem = createTasksElement(p);
            container.appendChild(elem);
        })
    } else {
        window.location.assign("./index.html");
    }
}

function closeTasks() {
    document.querySelectorAll(".taskDiv").forEach(el => el.remove());
}

function closeUsers() {
    document.querySelectorAll(".userDiv").forEach(el => el.remove());
}

const usersBtn = document.getElementById("usersBtn");
const tasksBtn = document.getElementById("tasksBtn");

usersBtn.addEventListener('click', loadUsers)
tasksBtn.addEventListener('click', loadTasks)
