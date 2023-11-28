function openForm() {
    document.getElementById("newTaskPopup").style.display = "block";
}

function closeForm() {
    document.getElementById("newTaskPopup").style.display = "none";
}

function openEditForm() {
    document.getElementById("editTaskPopup").style.display = "block";
}

function closeEditForm() {
    document.getElementById("editTaskPopup").style.display = "none";
}

document.getElementById("newTaskPopup").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task_name: form.get("taskName"),
            status: form.get("status"),
            num_volunteers_needed: form.get("volunteersNum"),
            start_date: form.get("startDate")
        })
    }

    const result = await fetch("http://localhost:3000/tasks", options);

    if (result.status == 201) {
        window.location.reload();
    }
})

function createUsersElement(data) {
    const user = document.createElement("div");
    user.className = "userDiv change";

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

    const removeBtn = document.createElement("button")
    removeBtn.className = "removeBtn";
    removeBtn.textContent = "remove"

    removeBtn.addEventListener('click', async () => {
        const options = {
            headers: {
                Authorization: localStorage.getItem('token')
            },
            method: 'DELETE'
        };
        const userResponse = window.confirm("Are you sure that you want to delete this entry?");
        if (userResponse) {
            const response = await fetch(
                `http://localhost:3000/users/${data['id']}`,
                options
            );

            if (response.status === 204) {
                window.location.reload();
            } else {
                const respData = await response.json();
                alert(respData.error);
            }
        }
    });

    user.appendChild(userID)
    user.appendChild(username)
    user.appendChild(email)
    user.appendChild(tasks)
    user.appendChild(removeBtn)
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
    task.className = "taskDiv change";

    const taskID = document.createElement("p");
    taskID.textContent = "ID: " + data["id"];

    const name = document.createElement("p");
    name.textContent = "Task name: " + data["task_name"];

    const status = document.createElement("p");
    status.textContent = "Status: " + data["status"];

    const noNeeded = document.createElement("p");
    noNeeded.textContent = "Number of volunteers needed: " + data["num_volunteers_needed"];

    const startDate = document.createElement("p");
    const dates = data["start_date"];
    const originalDates = new Date(dates);
    const formattedDate = `${originalDates.getDate().toString().padStart(2, '0')}-${(originalDates.getMonth() + 1).toString().padStart(2, '0')}-${originalDates.getFullYear()}`;
    startDate.textContent = "Start Date: " + formattedDate;

    const removeBtn = document.createElement("button")
    removeBtn.className = "removeBtn";
    removeBtn.textContent = "remove task"

    removeBtn.addEventListener('click', async () => {
        const options = {
            headers: {
                Authorization: localStorage.getItem('token')
            },
            method: 'DELETE'
        };
        const userResponse = window.confirm("Are you sure that you want to delete this entry?");
        if (userResponse) {
            const response = await fetch(
                `http://localhost:3000/tasks/${data['id']}`,
                options
            );

            if (response.status === 204) {
                window.location.reload();
            } else {
                const respData = await response.json();
                alert(respData.error);
            }
        }
    });

    const editBtn = document.createElement("button")
    editBtn.className = "removeBtn";
    editBtn.textContent = "edit task"

    editBtn.addEventListener('click', async () => {
        openEditForm();
        const acceptBtn = document.getElementById("accept");

        acceptBtn.addEventListener('click', async () => {
            const editTaskName = document.getElementById("editTaskName");
            const editStatus = document.getElementById("editStatus");
            const editVolunteersNum = document.getElementById("editVolunteersNum");
            const editStartDate = document.getElementById("editStartDate");

            const options = {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    task_name: editTaskName.value,
                    status: editStatus.value,
                    num_volunteers_needed: editVolunteersNum.value,
                    start_date: editStartDate.value
                })
            }

            const response = await fetch(
                `http://localhost:3000/tasks/${data['id']}`,
                options
            );
        })
    });

    task.appendChild(taskID)
    task.appendChild(name)
    task.appendChild(status)
    task.appendChild(noNeeded)
    task.appendChild(startDate)
    task.appendChild(removeBtn)
    task.appendChild(editBtn)

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
