let items = null

async function getData(){
    return await axios.get("https://tulpar-kz-default-rtdb.europe-west1.firebasedatabase.app/items.json")
        .then(function(response){
            items = response.data
            showData(items.filter(item => item.saved))
        })
}

getData()

function showData(data){
    const parent = document.querySelector('.saved-container')

    data.forEach(item => {
        parent.innerHTML += `
            <div class="box" id="item-${item.id}">
                <div class="icons ${item.saved ? 'active' : ''}">
                    <a onclick="unLike(${item.id})" class="fas fa-heart"></a>
                </div>
                <img src="${item.imgPath}" alt="">
                <h3>${item.name}</h3>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <div class="color">
                    <span> color : </span>
                    <input type="color" value="black">
                </div>
                <div class="price">${item.price1}</div>
                <a onclick="addToCart(${item.id})" class="btn">Tapsyrys beru</a>
            </div>
        `
    })

    noItem()

}

function noItem(){
    if(!document.querySelector('.product .box'))
        document.getElementById('no-item').style.display = "flex"
}

async function unLike(id){
    await axios.put(`https://tulpar-kz-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json`,{
            ...items[id],
            saved: false
        }
    ).then(function(){
        document.querySelector(`#item-${id}`).remove()
        noItem()
        showAlert('Товар успешно убран из закладки!')
    })
    
}

async function addToCart(id){
    await axios.put(`https://tulpar-kz-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json`,{
            ...items[id],
            inCart: true
        }
    ).then(function(){
        showAlert('Товар успешно добавлен в корзину!')
    })
}

function showAlert(text){
    const alert = document.querySelector('.my-alert')
    document.querySelector('.my-alert div').innerHTML = text
    alert.classList.add('active');
    setTimeout(function(){
        alert.classList.remove('active')
    }, 2000)
}

