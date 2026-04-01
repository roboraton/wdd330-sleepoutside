import { getLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};
  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id || item.id,
    price: item.FinalPrice || item.price,
    name: item.Name || item.name,
    quantity: 1,
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
    this.calculateItemSummary();
    this.calculateOrderTotal();
  }

  calculateItemSummary() {
    const summaryElement = document.querySelector(`${this.outputSelector} #itemTotal`);
    const amounts = this.list.map((item) => item.FinalPrice || item.price);
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
    if (summaryElement) {
      summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }
  }

  calculateOrderTotal() {
    if (this.list.length > 0) {
      // Basic shipping: $10 for the first item + $2 for each additional item
      this.shipping = 10 + (this.list.length - 1) * 2;
      this.tax = (this.itemTotal * 0.06).toFixed(2);
    } else {
      this.shipping = 0;
      this.tax = 0;
    }

    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

    if (shipping) shipping.innerText = `$${this.shipping.toFixed(2)}`;
    if (tax) tax.innerText = `$${this.tax}`;
    if (orderTotal) orderTotal.innerText = `$${this.orderTotal}`;
  }

  async checkout(form) {
    const json = formDataToJSON(form);
    
    // Add required order metadata
    json.orderDate = new Date().toISOString();
    json.orderTotal = String(this.orderTotal); 
    json.tax = String(this.tax);
    json.shipping = String(this.shipping);
    json.items = packageItems(this.list);

    try {
      const res = await services.checkout(json);
      console.log("Server Success:", res);
      
      // Clear cart and redirect on success
      localStorage.removeItem(this.key);
      location.assign("./success.html"); 
    } catch (err) {
      // Clear any existing alerts
      const existingAlert = document.querySelector(".alert");
      if (existingAlert) existingAlert.remove();

      // Handle server validation errors
      const errorData = await err.message; 
      
      if (typeof errorData === 'object' && errorData !== null) {
        for (const key in errorData) {
          alertMessage(errorData[key]);
        }
      } else {
        alertMessage(errorData || "An unknown error occurred.");
      }
      
      console.error("Server Error:", err);
    }
  }
}