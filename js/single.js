const id = window.location.href.substring(window.location.href.length - 1)

async function getData(){
    return await axios.get(`https://tulpar-kz-default-rtdb.europe-west1.firebasedatabase.app/news/${id}.json`)
        .then(function(response){
            showData(response.data)
        })
}

getData()

function showData(data){
    document.querySelector('.single-photo').innerHTML = `<img src="${data.imgPath}" alt="img">`;
    document.querySelector('.single-title').innerHTML = data.title;
    document.querySelector('.single-date').innerHTML = data.date;
    document.querySelector('.single-views').innerHTML = data.views;

    const parent = document.querySelector('.single-content')

    data.content.forEach(item => {
        parent.innerHTML += `<p>${item.text}</p>`;
        if(item.imgPath)
            parent.innerHTML += `<img src="${item.imgPath}" alt="img" />`
    });
}