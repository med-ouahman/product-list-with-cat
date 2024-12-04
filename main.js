const data = [
{
	img: "assets/images/image-waffle-desktop.jpg",
	name: "Waffle",
	title: "Waffle With Berries",
	price: 6.50,
	count: 0,
	inCart: false
},
{
	img: "assets/images/image-baklava-desktop.jpg",
	name: "Baklave",
	title: "Pistachio Bakvala",
	price: 4.0,
	count: 0,
	inCart: false
},
{
	img: "assets/images/image-creme-brulee-desktop.jpg",
	name: "Creme Brulee",
	title: "Vanilla Bean Creme Brulee",
	price: 7.0,
	count: 0,
	inCart: false
},
{
	img: "assets/images/image-macaron-desktop.jpg",
	name: "Macaron",
	title: "Macaron Mix Of Five",
	price: 8.0,
	count: 0,
	inCart: false
},
{
	img: "assets/images/image-tiramisu-desktop.jpg",
	name: "Tiramisu",
	title: "Classic Tiramisu",
	price: 5.5,
	count: 0,
	inCart: false
},
{
	img: "assets/images/image-meringue-desktop.jpg",
	name: "Pie",
	title: "Lemon Meringue Pie",
	price: 5.0,
	count: 0,
	inCart: false
},
{
	img: "assets/images/image-cake-desktop.jpg",
	name: "Cake",
	title: "Red Velvet Cake",
	price: 4.5,
	count: 0,
	inCart: false
},
{
	img: "assets/images/image-brownie-desktop.jpg",
	name: "Brownoe",
	title: "Salted Caramel Brownie",
	price: 5.5,
	count: 0,
	inCart: false
},
{
	img: "assets/images/image-panna-cotta-desktop.jpg",
	name: "Panna Cotta",
	title: "Vanilla Panna Cotta",
	price: 4.5,
	count: 0,
	inCart: false
},
];
data.sort(() => Math.random() - 0.5);
const productGrid = document.querySelector(".product-grid");
const incremetProductCount = document.querySelector(".increment-product-count");
const decrementProductCount = document.querySelector(".decrement-product-count");
const cartProducts = document.querySelector(".cart-products");
const totalPriceContainer = document.querySelector(".total");
const itemsCountContainer = document.querySelector("#item-count");
const confirmBtn = document.querySelector("#confirm-order");
const confirmModal = document.querySelector(".confirm-modal");
const orderTotal = document.getElementById("order-total-price");
const emptyCart = document.querySelector(".empty-cart");
const startNewOrderBtn = document.getElementById("start-new-order");
const fullCart = document.querySelector(".full-cart");

let itemsInCartCount = 0;
let total = 0;
getProductData();

const addToCartBtns = document.querySelectorAll(".add-to-cart");
const updateProductCount = document.querySelectorAll(".update-product-count");
confirmBtn.addEventListener("click", confirmOrder);
startNewOrderBtn.addEventListener("click", startNewOrder);

function addProductToCart(product, btn) {
	if (product.inCart)
		return ;
	product.count++;
	const productContent = `
    	<div class="in-cart-product" data-id=${product.name.split(' ')[0]}>
        	<div class="product-details">
          		<h3>${product.title}</h3>
          		<div class="price-details">
            		<span class="items">${product.count}x</span>
            		<span class="single-price faded">@$${product.price.toFixed(2)}</span>
            		<span class="total-price bold">$${getTotalPrice(product.price, product.count).toFixed(2)}</span>
          		</div>
						</div>
						<div>		
            		<button class="remove-item btn" onclick="remove('${product.name}')"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 	10"><path fill="#808080" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.	625l1 1L6 5l3.375 3.375-1 1Z"/></svg></button>
          	</div> 
    	</div>
	`;
	total = getTotal(data);
	totalPriceContainer.innerHTML = `<h2>Your total is $<span id="total-price">${total.toFixed(2)}</span></h2>`;
	document.querySelectorAll(".update-product-count")
	.forEach(upProd => {
		if (product.name.includes(upProd.getAttribute("data-id")))
				upProd.querySelector(".product-count").textContent = product.count;
	});
	cartProducts.innerHTML += productContent;
	product.inCart = true;
	itemsInCartCount++;
	itemsCountContainer.innerHTML = itemsInCartCount;
	toggleProductState(product, btn);
	toggleCartState("show");
}

function getProductData() {
	for (let i = 0; i < data.length; i++) {
		productGrid.innerHTML += `
		<div class="product">
			<div class="add-to-cart-container">
				<button class="add-to-cart" id=${data[i].name.split(' ')[0]} onclick="addProductToCart(data[${i}], this)">
					<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
					Add to Cart
				</button>
				<div class="update-product-count none" data-id="${data[i].name}">
					<button class="decrement-product-count" onclick="decrementCount(data[${i}])">
						<svg  class="svg" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path d="M0 .375h10v1.25H0V.375Z"/></svg>
					</button>
					<p class="product-count">1</p>
					<button class="incremet-product-count" onclick="incrementCount(data[${i}])">
						<svg class="svg" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
					</button>
				</div>
			</div>
		<div class="product-img">
			<img src="${data[i].img}" alt="${data[i].name}">
		</div>
		<div class="product-info">
			<p class="name faded">${data[i].name}</p>
			<h3 class="title bold">${data[i].title}</h3>
			<p class="price-container">$<span class="price">${data[i].price.toFixed(2)}</span>
			</p>
		</div>
	</div>
	`;
	}
}

function toggleProductState(product, btn) {
	if (!product.inCart)
		return ;
	updateProductCount.forEach(up => {
		if (up.getAttribute("data-id").includes(btn.id)) {
				btn.classList.toggle("none");
				up.classList.toggle("none");
		}
	});
}

function incrementCount(product) {
	product.count++;
	itemsCountContainer.textContent = ++itemsInCartCount;
	document.querySelectorAll(".in-cart-product")
	.forEach(upProd => {
		if (product.name.includes(upProd.getAttribute("data-id")))
			upProd.innerHTML = `
        	<div class="product-details">
          		<h3>${product.title}</h3>
          		<div class="price-details">
            		<span class="items">${product.count}x</span>
            		<span class="single-price faded">@$${product.price.toFixed(2)}</span>
            		<span class="total-price bold">$${getTotalPrice(product.price, product.count).toFixed(2)}</span>
          		</div>
						</div>
						<div>		
            		<button class="remove-item btn" onclick="remove('${product.name}')"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 	10"><path fill="#808080" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.	625l1 1L6 5l3.375 3.375-1 1Z"/></svg></button>
          	</div> 
	`;
	});
	total = getTotal(data);
	totalPriceContainer.innerHTML = `<h2>Your total is $<span id="total-price">${total.toFixed(2)}</span></h2>`;
	document.querySelectorAll(".update-product-count")
	.forEach(upProd => {
		if (product.name.includes(upProd.getAttribute("data-id")))
				upProd.querySelector(".product-count").textContent = product.count;
	});
}

function decrementCount(product) {
	product.count--;
	itemsCountContainer.textContent = --itemsInCartCount;
	document.querySelectorAll(".in-cart-product")
	.forEach(upProd => {
		if (product.name.includes(upProd.getAttribute("data-id")))
			upProd.innerHTML = `
        	<div class="product-details">
          		<h3>${product.title}</h3>
          		<div class="price-details">
            		<span class="items">${product.count}x</span>
            		<span class="single-price faded">@$${product.price.toFixed(2)}</span>
            		<span class="total-price bold">$${getTotalPrice(product.price, product.count).toFixed(2)}</span>
          		</div>
						</div>
						<div>		
            		<button class="remove-item btn" onclick="remove('${product.name}')"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 	10"><path fill="#808080" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.	625l1 1L6 5l3.375 3.375-1 1Z"/></svg></button>
          	</div> 
		`;
	});
	total = getTotal(data);
	totalPriceContainer.innerHTML = `<h2>Your total is $<span id="total-price">${total.toFixed(2)}</span></h2>`;
	
	if (product.count == 0) {
		removeProductFromCart(product);
	}

	document.querySelectorAll(".update-product-count")
	.forEach(upProd => {
		if (product.name.includes(upProd.getAttribute("data-id")))
				upProd.querySelector(".product-count").textContent = product.count;
	});
}

function removeProductFromCart(product) {
	itemsInCartCount -= product.count;
	itemsCountContainer.textContent = itemsInCartCount;
	product.count = 0;
	product.inCart = false;
	document.querySelectorAll(".in-cart-product")
	.forEach(prod => {
		if (product.name.includes(prod.getAttribute("data-id")))
			prod.classList.add("none");
	});

	document.querySelectorAll(".add-to-cart")
	.forEach(btn => {
		if (product.name.includes(btn.id))
			btn.classList.remove("none");
	});

	document.querySelectorAll(".update-product-count")
	.forEach(upProd => {
		if (upProd.getAttribute("data-id") === product.name)
			upProd.classList.add("none");
	});
	if (itemsInCartCount === 0)
		toggleCartState("hide");
}

function getTotalPrice(price, count) {
	return (price * count);
}

function remove(productName) {
	data.forEach(prodcut => {
		if (productName === prodcut.name)
			removeProductFromCart(prodcut);
	});
}


function getTotal(data) {

	let total = 0;
	for (let i = 0; i < data.length; i++) {
		total += getTotalPrice(data[i].price, data[i].count);
	}
	return total;
}

function confirmOrder() {

	const ordered = data.filter(prodcut => prodcut.count > 0 && !prodcut.confirmed);
	if (ordered.length === 0)
		return alert("You Don't have any items in your cart");
	confirmModal.classList.remove("none");
	const prodcutsToConfirm = confirmModal.querySelector(".products-to-confirm");
	console.log(ordered);
	for (const prodcut of ordered) {
		prodcutsToConfirm.innerHTML += getProductContent(prodcut);
		prodcut.confirmed = true;
	}
	orderTotal.innerHTML = total.toFixed(2);
}

function getProductContent(prodcut) {
	const content =
	`
      <div class="product-confirmed">
        <div class="product-content">
          <img src="${prodcut.img}" alt="${prodcut.name}">
          <div class="product-details">
            <p class="name">${prodcut.name}</p>
            <div class="price-details">
              <div class="product-price-count">
                <span class="product-count">
                  ${prodcut.count}x
                </span>
                <span class="product-price-single">
                  $${prodcut.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="total-price">$
          <span class="product-total-price">
            ${getTotalPrice(prodcut.price, prodcut.count).toFixed(2)}
          </span>
        </div>
      </div>
	`;
	return content;
}

function startNewOrder() {
	confirmModal.classList.add("none");
	confirmModal.querySelector(".products-to-confirm").innerHTML = null;
	cartProducts.innerHTML = null;
	itemsCountContainer.innerHTML = 0;
	data.forEach(product => {
		removeProductFromCart(product);
		product.confirmed = false;
	});
	total = getTotal(data);
	totalPriceContainer.innerHTML = `<h2>Your total is $<span id="total-price">${total}</span></h2>`;
}

function toggleCartState(state) {
	if (state === "show") {
		emptyCart.classList.add("none");
		fullCart.classList.remove("none");
		console.log(fullCart)
	}
	else {
		emptyCart.classList.remove("none");
		fullCart.classList.add("none");
	}
}
