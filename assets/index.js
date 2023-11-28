console.log('hello');

const is_ad=localStorage.getItem("isAdmin")

console.log(is_ad)

function changeHref() {
    
    const link = document.getElementById('link6');
    if (is_ad==true) {
        

    
    link.href = "./admin.html";  
    console.log("It s admin")
    }
    else {
        link.href = './profile.html';
    }
}
changeHref()

