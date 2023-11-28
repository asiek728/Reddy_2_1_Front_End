console.log('hello');





function changeHref(link_id) {
    const is_ad=localStorage.getItem("isAdmin")

   
   
    
    const link = document.getElementById(link_id);

    console.log("link.href 13 " + link.href)
    console.log("isAdmin line 8 " + is_ad)
    if (is_ad === "true" ) {
        console.log("isAdmin line 14 " + link.href)

    
    link.href = "./admin.html";  
    console.log("It s admin")
    }
    else if(is_ad === "false" ) {
        console.log("isAdmin line 23 " + is_ad)
        console.log("link.href 23" + link.href)
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







