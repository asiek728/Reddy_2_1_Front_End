function openForm() {
    document.getElementById("post-form").style.display = "block";
}

function closeForm() {
    document.getElementById("post-form").style.display = "none";
}

function openEditForm() {
    document.getElementById("edit-form").style.display = "block";
}

function closeEditForm() {
    document.getElementById("edit-form").style.display = "none";
}

function configureInterface() {
    document.getElementById("addNewTaskButton").style.display = localStorage.getItem("isAdmin") === "true" ? "block" : "none"
}

function createPostElement(data) {
    const task = document.createElement("div");
    task.className = "task";

    const dateElement = document.createElement("p");
    const dates = data["start_date"]; 
    const currentDate = new Date(dates);
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    dateElement.textContent = "Start date: "+ formattedDate;
    task.appendChild(dateElement);

    const endDateElement = document.createElement("p");
    endDateElement.textContent = "End date: "+ formattedDate;
    task.appendChild(endDateElement);

    const header = document.createElement("h1");
    header.textContent = data["task_name"];
    task.appendChild(header);

    const volNum = document.createElement("h3");
    volNum.textContent = "Number of volunteers needed: "+data["num_volunteers_needed"];
    task.appendChild(volNum);

    const status = document.createElement("p");
    status.textContent = "task's status "+ data["status"];
    task.appendChild(status);


    if (localStorage.getItem("isAdmin") === "true") {
        const removeBtn = document.createElement("button")
        removeBtn.className = "removeBtn";
        removeBtn.textContent = "remove"

        console.log("line 49")
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

        console.log("line 75")

        task.appendChild(removeBtn)
    }

    const editBtn = document.createElement("button")
    editBtn.className = "removeBtn";
    editBtn.textContent = "edit"
    console.log("line 82")
    editBtn.addEventListener('click', async () => {
        console.log("line 84")
        openEditForm();

        const acceptBtn = document.getElementById("accept");

        acceptBtn.addEventListener('click', async () => {
            const editStatus = document.getElementById("editStatus");

            const options = {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    status: editStatus.value
                })
            }

            const response = await fetch(
                `http://localhost:3000/tasks/${data['id']}`,
                options
            );

        })

    });

    task.appendChild(editBtn)

    ///Enrol button
    const enrollBtn = document.createElement("button")
    enrollBtn.className = "enrollBtn";
    enrollBtn.textContent = "Enroll";

    enrollBtn.addEventListener('click', async () => {
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: localStorage.getItem("userID"),
                task_id: data["id"],
                start_date: formattedDate,
                end_date: formattedDate
            })
        }

        const result = await fetch("http://localhost:3000/users_tasks", options);

        if (result.status == 400) {
            alert("You already enrolled in this task!");
        }

        if (result.status == 201) {
            alert("Enrolled!");
            window.location.reload();
        }
        
    })




    task.appendChild(enrollBtn)


    return task;
    
}
document.getElementById("post-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;


    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task_name: form.get("title"),
            num_volunteers_needed: form.get("volNum"),
            start_date:formattedDate
            
            
            
        })
    }

    const result = await fetch("http://localhost:3000/tasks", options);

    if (result.status == 201) {
        window.location.reload();
    }
})

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

        tasks.forEach(p => {
            const elem = createPostElement(p);
            container.appendChild(elem);
        })
    } else {
        window.location.assign("./index.html");
    }

}

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

loadTasks();
configureInterface();
