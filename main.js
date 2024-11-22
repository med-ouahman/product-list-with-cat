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

const productGrid = document.querySelector(".product-grid");
const incremetProductCount = document.querySelector(".increment-product-count");
const decrementProductCount = document.querySelector(".decrement-product-count");
const cartProducts = document.querySelector(".cart-products");
const itemsCountContainer = document.querySelector("#item-count");
let itemsInCartCount = 0;
getProductData();
const addToCartBtns = document.querySelectorAll(".add-to-cart");
const updateProductCount = document.querySelectorAll(".update-product-count");
addToCartBtns.forEach(btn => {
btn.addEventListener("click", () => {
	for (const product of data) {
			if (product.name.includes(btn.id))
			{
					product.count++;
					addProductToCart(product);
					toggleProductState(product, btn);
			}
	}
});
});

function addProductToCart(product) {
if (product.inCart)
	return ;
const productContent = `
<div class="in-cart-product">
	<div class="product-details">
	<h3>${product.title}</h3>
			<div class="price-details">
				<span class="items">${product.count}</span>
				<span class="single-price faded">@$${product.price.toFixed(2)}</span>
				<span class="total-price bold">${getTotalPrice(product.price, product.count)}</span>
			</div>
			</div>
		<button class="remove-item btn"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#808080" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></button>
	</div>
</div>
`;
product.inCart = true;
itemsInCartCount++;
itemsCountContainer.innerHTML = itemsInCartCount;
cartProducts.innerHTML += productContent;
}

function getTotalPrice(price, count) {
return (price * count).toFixed(2);
}

function getProductData() {
	for (let i = 0; i < data.length; i++) {
		productGrid.innerHTML += `
		<div class="product">
			<div class="add-to-cart-container">
				<button class="add-to-cart" id=${data[i].name.split(' ')[0]}>
					<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>
					Add to Cart
				</button>
				<div class="update-product-count none" data-id="${data[i].name}">
					<button class="decrement-product-count" onclick="decrementCount(${data[i]})">
						<svg  class="svg" xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path d="M0 .375h10v1.25H0V.375Z"/></svg>
					</button>
					<p class="product-count">1</p>
					<button class="incremet-product-count" onclick="incrementCount(${data[i]})">
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
			if (up.getAttribute("data-id").includes(btn.id))
			{
					btn.classList.toggle("none");
					up.classList.toggle("none");
			}
		});
}

function incrementCount(product) {
	product.count++;
}

function decrementCount(product) {
	product.count--;
}

