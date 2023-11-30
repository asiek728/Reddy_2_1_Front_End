
document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();
    
    if (response.status == 200) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("isAdmin", data.isAdmin)
        localStorage.setItem("userID", data.user_id)
        window.location.assign("index.html")
        // const wrongUser = document.querySelector('#username')
        // const wrongPassword = document.querySelector('#password')
        // console.log(wrongPassword)
        // console.log(wrongUser)
    } else {
        document.getElementById("username").value = ""
        document.getElementById("password").value = ""
        alert(data.error);
    }
})


function changeHref(link_id) {
    const is_ad=localStorage.getItem("isAdmin")
    const link = document.getElementById(link_id);
    if (is_ad === "true") {
    link.href = "./admin.html";  
    }
    else if(is_ad === "false") {
        link.href = './profile.html';
    }
    else {
        link.style.display = 'none';
    }
}
changeHref("link_prof_login_page") 
