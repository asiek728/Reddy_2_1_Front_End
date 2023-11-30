function createNewsElement(data) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card"

    const cardImage = document.createElement("img");
    cardImage.className = "card-img-top"
    cardImage.src = data["image_source"]

    const cardBody = document.createElement("div");
    cardBody.className = "card-body"

    const cardDate = document.createElement("p");
    const dates = data["date"];
    const originalDates = new Date(dates);
    const formattedDate = `${originalDates.getDate().toString().padStart(2, '0')}-${(originalDates.getMonth() + 1).toString().padStart(2, '0')}-${originalDates.getFullYear()}`;
    cardDate.className = "card-date"
    cardDate.textContent = formattedDate

    const cardHeader = document.createElement("h4");
    cardHeader.className = "card-header"
    cardHeader.textContent = data["title"]

    const cardText = document.createElement("p");
    cardText.className = "card-text"
    cardText.textContent = data["content"]

    cardBody.appendChild(cardDate)
    cardBody.appendChild(cardHeader)
    cardBody.appendChild(cardText)

    cardDiv.appendChild(cardImage);
    cardDiv.appendChild(cardBody);

    return cardDiv
}


async function loadNews() {
    const response = await fetch("http://localhost:3000/posts");

    if (response.status == 200) {
        const news = await response.json();
        const newsDiv = document.getElementById('card-group')

        news.forEach(p => {
            console.log(p)
            const elem = createNewsElement(p);
            newsDiv.appendChild(elem);
        })
    }
}

loadNews();


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
