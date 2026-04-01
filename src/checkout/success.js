import { loadHeaderFooter } from "../js/utils.mjs";

// Load the standard header and footer
loadHeaderFooter();

// Display a random order number to make it feel real
const orderId = Math.floor(Math.random() * 1000000);
const orderElement = document.querySelector(".order-number");

if (orderElement) {
    orderElement.innerText = `Order ID: #SO-${orderId}`;
}