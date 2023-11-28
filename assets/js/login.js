
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
    } else {
        alert(data.error);
    }
})


function changeHref(link_id) {
    const is_ad=localStorage.getItem("isAdmin")

   
   
    
    const link = document.getElementById(link_id);

    console.log("link.href 13 " + link.href)
    console.log("isAdmin line 8 " + is_ad)
    if (is_ad === "true") {
        console.log("isAdmin line 14 " + link.href)

    
    link.href = "./admin.html";  
    console.log("It s admin")
    }
    else if(is_ad === "false") {
        console.log("isAdmin line 23 " + is_ad)
        console.log("link.href 23" + link.href)
        link.href = './profile.html';

    }
    else {
        link.style.display = 'none';
    }
}

changeHref("link_prof_login_page") 
