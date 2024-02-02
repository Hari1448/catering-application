// menu button click
let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
};
// menu end here

// search button click
let searchIcon = document.querySelector('#search-icon');
let searchForm = document.querySelector('#search-form');
let searchClose = document.querySelector('#close');

searchIcon.onclick = () => {
    searchForm.classList.toggle('active');
}

searchClose.onclick = () => {
        searchForm.classList.remove('active');
    }
    // search ends here

// Copyright year
document.getElementById("year").innerHTML = new Date().getFullYear();
// copyright year end here


// 

let section = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header .navbar a');

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    section.forEach(sec => {

        let top = window.screenY;
        let height = sec.offsetHeight;
        let offset = sec.offsetTop - 150;
        let id = sec.getAttribute('id');

        if (scrollY > offset && scrollY <= offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header .navbar a[href*=' + id + ']').classList.add('active');
            });
        }

    });
};


// loader part

function loader() {
    let loader = document.querySelector('.loader-container');
    loader.classList.add('fade-out');
}

function fadeOut() {
    setInterval(loader, 3000);
}

window.onload = fadeOut;



//  Initialize Swiper 

document.addEventListener('DOMContentLoaded', function() {

    let swiper = new Swiper(".home-slider", {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 7500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        loop: true,
    });

    swiper = new Swiper(".review-slider", {
        spaceBetween: 20,
        centeredSlides: true,
        autoplay: {
            delay: 7500,
            disableOnInteraction: false,
        },
        loop: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            640: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });
});

// for the cart display

let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
}

// close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
}

// cart working js
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

// cart count on the icon when item is added
// Get the cart icon and count elements
const cartCount = document.getElementById('cart-count');

// Initialize the cart count
let itemCount = 0; // Initialize the cart count

// ... existing code ...

// Example: Set initial count
itemCount = 0;

// Example: Call updateCartCount to update the cart count display
updateCartCount(itemCount);

// making function
function ready() {
    // remover items form the cart
    let removeCartButton = document.getElementsByClassName('cart-remove');
    console.log(removeCartButton);

    for (let i = 0; i < removeCartButton.length; i++) {
        let button = removeCartButton[i];
        button.addEventListener('click', removeCartItem)
    }

    // quantity changes
    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // add to cart
    let addCart = document.getElementsByClassName('add-cart');
    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

    // buy button work
    buyBtn = document.getElementsByClassName('btn-buy')[0];
    buyBtn.addEventListener('click', buyButtonClicked);
}

//buy button
function buyButtonClicked() {
    alert('Your order has been placed');
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
        if (itemCount > 0) {
            itemCount--;
            updateCartCount(itemCount);
        }
    }
    updateTotal();

}



// remover items form the cart
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    if (itemCount > 0) {
        itemCount--;
        updateCartCount(itemCount);
    }
    updateTotal();
}

// quantity changes 
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}
//add to cart
function addCartClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

// add product to cart
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsName = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemsName.length; i++) {
        if (cartItemsName[i].innerText == title) {
            alert('You have already added this cart item');
            return;
        }
    }

    let cartBoxContent = `
<img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title"> ${title} </div>
        <div class="cart-price"> ${price} </div>
        <input type="number" value="1" class="cart-quantity">
    </div>
<i class="fa-solid fa-trash-can cart-remove"></i>
`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

    itemCount++;
    updateCartCount(itemCount);
}

function updateCartCount(count) {
    itemCount = count;
    cartCount.textContent = itemCount;
    cartCount.style.display = itemCount > 0 ? 'block' : 'none';
}

// update total
function updateTotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    // if price contains some cents value
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = "$" + total;



}