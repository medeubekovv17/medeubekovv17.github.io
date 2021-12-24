
async function getData(){
    return await axios.get("https://tulpar-kz-default-rtdb.europe-west1.firebasedatabase.app/items.json")
        .then(function(response){
            showData(response.data)
        })
}

getData()

let items = null

function showData(data){
    items = data

    //car
    const carItems = data.filter(item => item.category === "car")
    const carParent = document.getElementById('car-items')

    carItems.forEach(item => {
        carParent.innerHTML += `
            <div class="box" id="item-${item.id}">
                <span class="discount badge bg-warning ">${item.discount}</span>
                <div class="icons ${item.saved ? 'active' : ''}">
                    <a onclick="like(${item.id})" class="fas fa-heart"></a>
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
                <div class="price">${item.price1} <span>${item.price2}</span></div>
                <a onclick="addToCart(${item.id})" class="btn">Tapsyrys beru</a>
            </div>
        `
    })

    //moto
    const motoItems = data.filter(item => item.category === "moto")
    const motoParent = document.getElementById('moto-items')

    motoItems.forEach(item => {
        motoParent.innerHTML += `
            <div class="box" id="item-${item.id}">
                <span class="discount badge bg-warning ">${item.discount}</span>
                <div class="icons ${item.saved ? 'active' : ''}">
                    <a onclick="like(${item.id})" class="fas fa-heart"></a>
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
                <div class="price">${item.price1} <span>${item.price2}</span></div>
                <a onclick="addToCart(${item.id})" class="btn">Tapsyrys beru</a>
            </div>
        `
    })

    //boat
    const boatItems = data.filter(item => item.category === "boat")
    const boatParent = document.getElementById('boat-items')

    boatItems.forEach(item => {
        boatParent.innerHTML += `
            <div class="box" id="item-${item.id}">
                <span class="discount badge bg-warning ">${item.discount}</span>
                <div class="icons ${item.saved ? 'active' : ''}">
                    <a onclick="like(${item.id})" class="fas fa-heart"></a>
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
                <div class="price">${item.price1} <span>${item.price2}</span></div>
                <a onclick="addToCart(${item.id})" class="btn">Tapsyrys beru</a>
            </div>
        `
    })

}

async function like(id){
    await axios.put(`https://tulpar-kz-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json`,{
            ...items[id],
            saved: !items[id].saved
        }
    ).then(function(){
        items[id].saved = !items[id].saved
        const tag = document.querySelector(`#item-${id} .icons`)
        tag.classList.toggle('active')
        if(items[id].saved)
            showAlert('Товар успешно добавлен в закладки!')
        else
            showAlert('Товар успешно убран из закладки!')
    })
    
}

async function addToCart(id){
    if(items[id].inCart)
        return
    
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

