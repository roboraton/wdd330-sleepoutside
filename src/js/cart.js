import { getLocalStorage, setLocalStorage, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];
  const productList = document.querySelector('.product-list');
  const cartFooter = document.querySelector('.cart-footer');

  if (cartItems.length > 0) {
    const htmlItems = cartItems.map((item, index) =>
      cartItemTemplate(item, index),
    );
    productList.innerHTML = htmlItems.join('');
    
    cartFooter.classList.remove('hide');
    calculateCartTotal(cartItems);
  } else {
    productList.innerHTML = '<li>Your cart is empty.</li>';
    cartFooter.classList.add('hide');
  }
}

function calculateCartTotal(items) {
  const total = items.reduce((sum, item) => sum + item.FinalPrice, 0);
  document.querySelector('#cart-total-value').innerText = total.toFixed(2);
}

function cartItemTemplate(item, index) {
  return `<li class="cart-card divider">
    <span class="cart-card__remove" data-id="${index}">X</span>
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

function removeFromCart(itemIndex) {
  const cartItems = getLocalStorage('so-cart') || [];
  cartItems.splice(itemIndex, 1);
  setLocalStorage('so-cart', cartItems);
  renderCartContents();
}

document.querySelector('.product-list').addEventListener('click', (e) => {
  if (e.target.classList.contains('cart-card__remove')) {
    removeFromCart(parseInt(e.target.dataset.id));
  }
});

renderCartContents();