let items = null

async function getData(){
    return await axios.get("https://tulpar-kz-default-rtdb.europe-west1.firebasedatabase.app/news.json")
        .then(function(response){
            showData(response.data)
        })
}

getData()

function showData(data){
    const parent = document.querySelector('#news .row')

    data.forEach(item => {
        parent.innerHTML += `
            <div class="col-md-4 col-sm-6 col-12 mb-4">
                <a class="news-item" href="single.html?${item.id}">
                    <div class="news-item-img mb-3">
                        <img src="${item.imgPath}">
                    </div>
                    <div class="news-item-content">
                        <h2>${item.title}</h2>
                        <p>${item.description}</p>
                        <div class="news-item-bottom">
                            <p>${item.date}</p>
                            <p class="ms-3"> <i class="fas fa-eye"></i> ${item.views}</p>
                        </div>
                    </div>
                </a>
            </div>
        `
    })
}