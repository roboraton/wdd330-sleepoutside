import { loadHeaderFooter } from "../js/utils.mjs";
import CheckoutProcess from "../js/CheckoutProcess.mjs";

loadHeaderFooter();

// Initialize Checkout logic
const myCheckout = new CheckoutProcess("so-cart", "#checkout-summary");
myCheckout.init();

document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrderTotal.bind(myCheckout));

// Listener for the form submission
document.querySelector("#checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const myForm = e.target;
  const chkStatus = myForm.checkValidity();
  
  if (chkStatus) {
    myCheckout.checkout(myForm);
  } else {
    // Show native browser validation messages
    myForm.reportValidity();
  }
});