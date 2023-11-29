function changeHref(link_id) {
    const is_ad=localStorage.getItem("isAdmin")
    const link = document.getElementById(link_id);

    if (is_ad === "true" ) {
    link.href = "./admin.html";  
    }
    else if(is_ad === "false" ) {
        link.href = './profile.html';
    }
    else {
        link.style.display = 'none';
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
changeHref('link6')







