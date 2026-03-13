import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    productList.innerHTML = htmlItems.join("");
  } else {
    productList.innerHTML = "<li>Your cart is empty.</li>";
  }
}

function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
    <span class="cart-card__remove" data-id="${index}">X</span>
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;

  return newItem;
}

function removeFromCart(itemIndex) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.splice(itemIndex, 1);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-card__remove")) {
    removeFromCart(e.target.dataset.id);
  }
});

renderCartContents();
