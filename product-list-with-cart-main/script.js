let normal = [];
let clicked = [];
let counters = [];
let cart_amount = 0;

let hiddens = document.getElementById("hidden");
let cart_counter = document.getElementById("cart_amount");
let order_confirm = document.getElementById("order-wrapper");
let cart_stuff = [];
let cart_container = document.getElementById("cart_buy");

const itemPrices = {
    1: 6.5,  
    2: 7, 
    3: 8, 
    4: 5.5, 
    5: 4, 
    6: 5, 
    7: 4.5, 
    8: 4.5,
    9: 6.5 
};

const itemNames = {
    1: "waffle with Barry's",  
    2: "Vanilla Bean Crème Brûlée", 
    3: "Macaron Mix of Five", 
    4: "Classic Tiramisu", 
    5: "Pistachio Baklava", 
    6: "Lemon Meringue Pie", 
    7: "Red Velvet Cake", 
    8: "Salted Caramel Brownie",
    9: "Vanilla Panna Cotta"
};
function refreshtotalcost() {
    let totalCost = 0;
    
    cart_stuff.forEach(itemId => {
        totalCost += itemPrices[itemId];
    });

    document.getElementById("kosztotal").innerText = `$${totalCost.toFixed(2)}`;
}
function confirmorder() {
    if (cart_amount > 0) {
        order_confirm.style.display = "flex";

        let orderCart = document.querySelector("#buying_screen .cart_buy");
        orderCart.innerHTML = cart_container.innerHTML;

        document.querySelector("#buying_screen #kosztotal").innerText = document.querySelector("#kosztotal").innerText;
    } else {
        order_confirm.style.display = "none";
    }
}
function cartbackground() {
    if (cart_amount > 0) {
        hiddens.style.display = "none";
    } else {
        hiddens.style.display = "flex";
    }
}
function updateBuyingScreenCart() {
    let orderCart = document.querySelector("#buying_screen .cart_buy");
    orderCart.innerHTML = cart_container.innerHTML;  

    document.querySelector("#buying_screen #kosztotal").innerText = document.querySelector("#kosztotal").innerText;
}
for (let i = 1; i <= 9; i++) {
    normal[i] = document.getElementById(`normal${i}`);
    clicked[i] = document.getElementById(`clicked${i}`);
    counters[i] = document.getElementById(`count${i}`);
}

function button_click(button_pressed) {
    for (let i = 1; i <= 9; i++) {
        normal[i].style.display = "flex";
        clicked[i].style.display = "none";
    }

    normal[button_pressed].style.display = "none";
    clicked[button_pressed].style.display = "flex";
    cartbackground();
    confirmorder();
    updateBuyingScreenCart();
}

function plus(button_pressed) {
    let foodCount = parseInt(counters[button_pressed].innerHTML) || 0;
    foodCount += 1;
    counters[button_pressed].innerHTML = foodCount;

    cart_stuff.push(button_pressed);
    cart_amount++;

    cart_counter.innerHTML = cart_amount;
    cartbackground();

    refreshforcart(button_pressed);
    refreshtotalcost();
    confirmorder() ;
    updateBuyingScreenCart();
}

function minus(button_pressed) {
    let foodCount = parseInt(counters[button_pressed].innerHTML) || 0;
    if (foodCount > 0) {
        foodCount -= 1;
        counters[button_pressed].innerHTML = foodCount;

        const index = cart_stuff.indexOf(button_pressed);
        if (index !== -1) {
            cart_stuff.splice(index, 1);
        }

        cart_amount--;
        cart_counter.innerHTML = cart_amount;
        cartbackground();

        refreshforcart(button_pressed);
        confirmorder()
        updateBuyingScreenCart();
    }
    refreshtotalcost();
}

function refreshforcart(itemId) {
    const itemCount = cart_stuff.filter(item => item === itemId).length;
    const itemPrice = itemPrices[itemId];
    const itemName = itemNames[itemId];;
    let itemDiv = document.getElementById(`cart-item-${itemId}`);

    if (itemDiv) {
        itemDiv.querySelector(".quantity").innerText = `${itemCount}x`;
        itemDiv.querySelector(".price").innerText = ` @${itemPrice} $${(itemPrice * itemCount)}`;
    } else {
        itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.id = `cart-item-${itemId}`;
        itemDiv.innerHTML = `<section class="wrapper">
        <section class="left">
            <h4 class="foods">${itemName}</h4> 
            <section class="quantity">1 x</section> 
            <section class="price"> @${itemPrice} $${itemPrice}</section>
        </section>
        <section class="right">
            <button class="button" onclick="removeItem(${itemId})">x</button>
        </section>
        </section>
        <hr>
        `;
        
        cart_container.appendChild(itemDiv);
    }
}

function removeItem(itemId) {
    const index = cart_stuff.indexOf(itemId);
    if (index !== -1) {
        cart_stuff.splice(index, 1);
    }

    cart_amount--;
    cart_counter.innerHTML = cart_amount;
    
    

    let foodCount = parseInt(counters[itemId].innerHTML) || 0;
    if (foodCount > 0) {
        foodCount = 0;
        counters[itemId].innerHTML = foodCount;
    }

    let itemDiv = document.getElementById(`cart-item-${itemId}`);
    if (itemDiv) {
        const itemCount = cart_stuff.filter(item => item === itemId).length;
        if (itemCount === 0) {
            cart_container.removeChild(itemDiv);
        } else {
            itemDiv.querySelector(".quantity").innerText = `${itemCount}x`;
            itemDiv.querySelector(".price").innerText = `$${(itemPrices[itemId] * itemCount).toFixed(2)}`;
        }
    }
    cartbackground();
    confirmorder();
    updateBuyingScreenCart();
}
function reload(){
    window.location.reload()
}

function buying(){
    document.getElementById("buying_screen").style.display = "block";
}