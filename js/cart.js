let items = null
let total = 0;

async function getData(){
    return await axios.get("https://tulpar-kz-default-rtdb.europe-west1.firebasedatabase.app/items.json")
        .then(function(response){
            items = response.data
            showData(items.filter(item => item.inCart))
        })
}

getData()


function showData(data){
    const parent = document.querySelector('.cart-container')

    data.forEach(item => {
        parent.innerHTML += `
            <div class="cart-item row mb-4" id="item-${item.id}">
                <div class="col-3">
                    <div class="cart-item-img">
                        <img src="${item.imgPath}">
                    </div>
                </div>
                <div class="col-3">
                    <h3 class="cart-item-name text-center">
                        ${item.name}
                    </h3>
                </div>
                <div class="col-3">
                    <h4 class="cart-item-description">
                        ${item.description}
                    </h4>
                </div>
                <div class="col-2">
                    <h3>
                        <span class="badge bg-info">${item.price1}</span>
                    </h3>
                </div>
                <div class="col-1">
                    <div class="cart-item-delete" onclick="removeFromCart(${item.id})">
                        <img src="images/remove.png">
                    </div>
                </div>
            </div>
        `
    })

    data.forEach(item => {
        total += parseInt(item.price1.substring(0, item.price1.length - 1).split(' ').join(''))
    })
    document.getElementById('total-price').innerHTML = total + ' ₸'
    noItem()
}

function noItem(){
    if(!document.querySelector('.cart-container .cart-item')){
        document.getElementById('no-item').style.display = "flex"
        document.querySelector('.cart-footer').style.display = "none"
    }
    else
        document.querySelector('.cart-footer').style.display = "block"
}

async function removeFromCart(id){
    await axios.put(`https://tulpar-kz-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json`,{
            ...items[id],
            inCart: false
        }
    ).then(function(){
        document.getElementById(`item-${id}`).remove()
        showAlert('Товар успешно убран из корзины!')
        noItem()
        total -= parseInt(items[id].price1.substring(0, items[id].price1.length - 1).split(' ').join(''))
        document.getElementById('total-price').innerHTML = total + ' ₸'
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

document.getElementById('btn-order').addEventListener('click', function(){
    items.forEach(item => {
        if(item.inCart)
            clearCart(item.id) 
    })
    document.querySelector('.modal').classList.add('active');
    setTimeout(function(){
       document.querySelector('.modal').classList.remove('active'); 
    }, 2000)
    document.getElementById('no-item').style.display = "flex"
    document.querySelector('.cart-footer').style.display = "none"
})


async function clearCart(id){
    await axios.put(`https://tulpar-kz-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json`,{
            ...items[id],
            inCart: false
        }).then(function(){
            document.getElementById(`item-${id}`).remove()
        })
}