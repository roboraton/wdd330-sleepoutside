import { getLocalStorage, setLocalStorage, formDataToJSON, alertMessage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

const services = new ExternalServices();

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    price: item.FinalPrice,
    name: item.Name,
    quantity: item.quantity || 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubtotal();
  }

  calculateItemSubtotal() {
    const subtotalElement = document.querySelector(`${this.outputSelector} #subtotal`);
    const countElement = document.querySelector(`${this.outputSelector} #num-items`);
    
    const total = this.list.reduce((sum, item) => sum + (item.FinalPrice * (item.quantity || 1)), 0);
    this.itemTotal = total;
    
    subtotalElement.innerText = `$${total.toFixed(2)}`;
    countElement.innerText = this.list.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }

  calculateOrderTotal() {
    const totalItems = this.list.reduce((sum, item) => sum + (item.quantity || 1), 0);
    
    this.shipping = 10 + (totalItems - 1) * 2;
    this.tax = (this.itemTotal * 0.06);
    this.orderTotal = (parseFloat(this.itemTotal) + parseFloat(this.shipping) + parseFloat(this.tax)).toFixed(2);
    
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    tax.innerText = `$${this.tax.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal}`;
  }

  async checkout() {
    const formElement = document.forms['checkout'];
    const json = formDataToJSON(formElement);
    
    // Add extra fields
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax.toFixed(2);
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    
    try {
      const res = await services.checkout(json);
      console.log(res);

      setLocalStorage("so-cart", []);
      window.location.href = "/checkout/success.html";

    } catch (err) {
      console.error(err);

      alertMessage(
        err?.message?.message || "An error occurred during checkout. Please try again."
      );
    }
  }
}