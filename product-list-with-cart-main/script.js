let normal = [];
let clicked = [];
let counters = [];
let cart_amount = 0;
let hiddens = document.getElementById("hidden")
function cartbackground(){
    if (cart_amount > 0){
        hiddens.style.display = "none"
    }
    else{
        hiddens.style.display = "flex"
    }
}


for (let i = 1; i <= 9; i++) {
    normal[i] = document.getElementById(`normal${i}`);
    clicked[i] = document.getElementById(`clicked${i}`);
    counters[i] = document.getElementById(`count${i}`);
}
let cart_counter = document.getElementById("cart_amount");
function button_click(button_pressed) {
    for (let i = 1; i <= 9; i++) {
        normal[i].style.display = "flex";
        clicked[i].style.display = "none";
    }

    normal[button_pressed].style.display = "none";
    clicked[button_pressed].style.display = "flex";
    cartbackground();
}

function plus(button_pressed) {
    let foodCount = parseInt(counters[button_pressed].innerHTML) || 0;
    foodCount += 1;
    counters[button_pressed].innerHTML = foodCount;
    cart_amount++
    cart_counter.innerHTML = cart_amount;
    cartbackground();
}

function minus(button_pressed) {
    let foodCount = parseInt(counters[button_pressed].innerHTML) || 0;
    if (foodCount > 0) {
        foodCount -= 1;
        counters[button_pressed].innerHTML = foodCount;
        cart_amount--
        cart_counter.innerHTML = cart_amount;
        cartbackground();
    }
}
