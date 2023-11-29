
function openForm() {
    document.getElementById("edit-form").style.display = "block";
}
async function loadUserData() {
    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }

    const userID = localStorage.getItem("userID");
    const response = await fetch(`http://localhost:3000/users/${userID}`, options);

    if (response.status == 200) {
        const user = await response.json();
        const username = document.getElementById("usernameLabel")
        const email = document.getElementById("emailLabel")

        username.textContent = "Username: " + user.username;
        email.textContent = "Email address: " + user.email;
    } else {
        window.location.assign("./index.html");
    }
}

function createTasksElement(data) {
    const task = document.createElement("div");
    task.className = "taskDiv";

    const name = document.createElement("p");
    name.textContent = "Task name: " + data["task_name"];

    const status = document.createElement("p");
    status.textContent = "Task status: " + data["status"];

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
                `http://localhost:3000/users_tasks/${data['id']}`,
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

    task.appendChild(name)
    task.appendChild(status)
    task.appendChild(startDate)
    task.appendChild(removeBtn)

    return task

}

async function loadUserServices() {
    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }

    const userID = localStorage.getItem("userID");
    const response = await fetch(`http://localhost:3000/users_tasks/${userID}`, options);

    if (response.status == 200) {
        const tasks = await response.json();
        const container = document.getElementById("servicesDiv");
        tasks.forEach(p => {
            const elem = createTasksElement(p);
            container.appendChild(elem);
        })
    } 
}

function loginSignVisable(){
    const token=localStorage.getItem("token")
    if (token) {
        // const link4 = document.getElementById("link4");
        const link5 = document.getElementById("link5");
        // link4.style.display = 'none';
        link5.style.display = 'none';

    }
    else {
        const btn = document.getElementById("log-out");
        btn.style.display = 'none';
    }
}

function openEditForm() {
    document.getElementById("edit-form").style.display = "block";
}
function closeEditForm() {
    document.getElementById("edit-form").style.display = "none";
}

function openEditFormEmail() {
    document.getElementById("edit-form_email").style.display = "block";
}
function closeEditFormEmail() {
    document.getElementById("edit-form_email").style.display = "none";
}

function editUsername() {
const editBtn = document.getElementById("editUsername");
    // editBtn.className = "removeBtn";
    // editBtn.textContent = "edit"
    console.log("line 82")
    editBtn.addEventListener('click', async () => {
        console.log("line 84")
        openEditForm();

        const acceptBtn = document.getElementById("accept");

        acceptBtn.addEventListener('click', async () => {
            const editUsername = document.getElementById("editStatus");

            const options = {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    
                },
                body: JSON.stringify({
                    username: editUsername.value
                })
            }
            const userID = parseInt(localStorage.getItem("userID"));
            
           
            const response = await fetch(
                `http://localhost:3000/users/username-${userID}`,
                options
            );

            
            console.log("Status 200 "+response.status)
           

        })

    });

}


function editEmail() {
    const editBtn = document.getElementById("editEmail");

        editBtn.addEventListener('click', async () => {
  
            openEditFormEmail();
    
            const acceptBtn = document.getElementById("acceptEmail");
    
            acceptBtn.addEventListener('click', async () => {
                const editEmail = document.getElementById("editEmail_value");
    
                const options = {
                    method: "PATCH",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        
                    },
                    body: JSON.stringify({
                        email: editEmail.value
                    })
                }
                const userID = parseInt(localStorage.getItem("userID"));
                
               
                const response = await fetch(
                    `http://localhost:3000/users/email-${userID}`,
                    options
                );
    
                
                console.log("Status 200 "+response.status)
               
    
            })
    
        });
    
    }


editUsername()
editEmail()
 

loginSignVisable()
loadUserData();
loadUserServices();


