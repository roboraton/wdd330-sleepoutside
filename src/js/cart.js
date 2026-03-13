import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");
  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productList.innerHTML = htmlItems.join("");
  } else {
    productList.innerHTML = "<li>Your cart is empty.</li>";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <span class="cart-card__remove" data-id="${item.Id}">X</span>
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

function removeFromCart(productId) {
  const cartItems = getLocalStorage("so-cart") || [];
  const updatedCart = cartItems.filter((item) => item.Id !== productId);
  setLocalStorage("so-cart", updatedCart);
  renderCartContents();
}

document.querySelector(".product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-card__remove")) {
    removeFromCart(e.target.dataset.id);
  }
});

renderCartContents();
