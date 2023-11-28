console.log('hello');





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
changeHref('link6')

module.exports = changeHref;

