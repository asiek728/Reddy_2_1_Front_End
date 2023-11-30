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

function openNewsForm() {
    document.getElementById("newUpdatePopup").style.display = "block";
}

function closeNewsForm() {
    document.getElementById("newUpdatePopup").style.display = "none";
}

function openEditNewsForm() {
    document.getElementById("editNewsPopup").style.display = "block";
}

function closeEditNewsForm() {
    document.getElementById("editNewsPopup").style.display = "none";
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

document.getElementById("newUpdatePopup").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: form.get("newsTitle"),
            date: form.get("newsDate"),
            image_source: form.get("image"),
            content: form.get("newsContent")
        })
    }

    const result = await fetch("http://localhost:3000/posts", options);

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
    email.textContent = "Email: " + data["email"];

    const volunteering = document.createElement("p");
    volunteering.textContent = "User volunteers in:";

    const tasks = document.createElement("div");
    tasks.id = data["id"]+"userTasksDiv"

    loadUserServices(data["id"]);

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
    user.appendChild(volunteering)
    user.appendChild(tasks)
    user.appendChild(removeBtn)
    return user
}

function createUserTasksElement(data) {
    const task = document.createElement("div");
    task.className = "taskDiv";
    const name = document.createElement("p");
    name.textContent = "Task: " + data["task_name"];
    task.appendChild(name)
    return task
}

async function loadUserServices(userID) {
    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }

    const response = await fetch(`http://localhost:3000/users_tasks/${userID}`, options);

    if (response.status == 200) {
        const tasks = await response.json();
        const container = document.getElementById(userID+"userTasksDiv");

        tasks.forEach(p => {
            const elem = createUserTasksElement(p);
            container.appendChild(elem);
        })
    } 
}

async function loadUsers() {
    closeTasks();
    closeNews();
    closeUsers();

    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    const response = await fetch("http://localhost:3000/users", options);

    if (response.status == 200) {
        const users = await response.json();
        const container = document.getElementById("users");

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
    closeTasks();
    closeNews();
    closeUsers();

    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    const response = await fetch("http://localhost:3000/tasks", options);

    if (response.status == 200) {
        const tasks = await response.json();
        const container = document.getElementById("tasks");

        tasks.forEach(p => {
            const elem = createTasksElement(p);
            container.appendChild(elem);
        })
    } else {
        window.location.assign("./index.html");
    }
}

function createNewsElement(data) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "newsDiv"

    const cardBody = document.createElement("div");
    cardBody.className = "card-body"

    const cardHeader = document.createElement("h4");
    cardHeader.className = "card-header"
    cardHeader.textContent = data["title"]

    cardBody.appendChild(cardHeader)

    const removeBtn = document.createElement("button")
    removeBtn.className = "removeBtn";
    removeBtn.textContent = "remove update"

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
                `http://localhost:3000/posts/${data['id']}`,
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
    editBtn.textContent = "edit update"

    editBtn.addEventListener('click', async () => {
        openEditNewsForm();
        const acceptBtn = document.getElementById("acceptNews");

        acceptBtn.addEventListener('click', async () => {
            const editNewsTitle = document.getElementById("editNewsTitle");
            const editImage = document.getElementById("editImage");
            const editNewsContent = document.getElementById("editNewsContent");
            const editNewsDate = document.getElementById("editNewsDate");

            const options = {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: editNewsTitle.value,
                    date: editNewsDate.value,
                    image_source: editImage.value,
                    content: editNewsContent.value
                })
            }

            const response = await fetch(
                `http://localhost:3000/posts/${data['id']}`,
                options
            );
        })
    });


    cardDiv.appendChild(cardBody);
    cardDiv.appendChild(editBtn);
    cardDiv.appendChild(removeBtn);

    return cardDiv
}

async function loadNews() {
    closeTasks();
    closeNews();
    closeUsers();
    
    const response = await fetch("http://localhost:3000/posts");

    if (response.status == 200) {
        const news = await response.json();
        const newsDiv = document.getElementById('news')

        news.forEach(p => {
            console.log(p)
            const elem = createNewsElement(p);
            newsDiv.appendChild(elem);
        })
    }
}

function closeTasks() {
    document.querySelectorAll(".taskDiv").forEach(el => el.remove());
}

function closeUsers() {
    document.querySelectorAll(".userDiv").forEach(el => el.remove());
}

function closeNews() {
    document.querySelectorAll(".newsDiv").forEach(el => el.remove());
}

if (localStorage.getItem("isAdmin") != "true") {
    window.location.href = "500.html";
}

const usersBtn = document.getElementById("usersBtn");
const tasksBtn = document.getElementById("tasksBtn");
const newsBtn = document.getElementById("newsBtn");


usersBtn.addEventListener('click', loadUsers)
tasksBtn.addEventListener('click', loadTasks)
newsBtn.addEventListener('click', loadNews)


function loginSignVisable(){
    const token=localStorage.getItem("token")
    if (token) {
        const link4 = document.getElementById("link4");
        const link5 = document.getElementById("link5");
        link4.style.display = 'none';
        link5.style.display = 'none';

    }
    else {
        const btn = document.getElementById("log-out");
        btn.style.display = 'none';
    }
}
loginSignVisable()
