import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Fetch product data from the API
    this.product = await this.dataSource.findProductById(this.productId);
    
    // Render the product details on the page
    this.renderProductDetails();

    // Add event listener to the "Add to Cart" button
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    let cartItems = getLocalStorage('so-cart');
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
    cartItems.push(this.product);
    setLocalStorage('so-cart', cartItems);
    alert("Product added to cart!");
  }

  renderProductDetails() {
    // Calculate the discount percentage
    // Formula: ((Original - Sale) / Original) * 100
    const originalPrice = this.product.SuggestedRetailPrice;
    const salePrice = this.product.ListPrice;
    const discountPercent = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

    // Conditional rendering: show the badge only if there is a discount
    const discountBadge = discountPercent > 0 
      ? `<span class="discount-badge">Save ${discountPercent}%</span>` 
      : "";

    // Update the DOM with the product information
    document.querySelector('.product-detail').innerHTML = `
        <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img 
          class="divider" 
          src="${this.product.Images.PrimaryLarge}" 
          alt="${this.product.Name}" 
        />
        <p class="product-card__price">
          <span class="original-price">$${originalPrice.toFixed(2)}</span> 
          <span class="sale-price">$${salePrice.toFixed(2)}</span>
          ${discountBadge}
        </p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">
          ${this.product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>`;
        
    // Update the browser tab title
    document.title = `Sleep Outside | ${this.product.Name}`;
  }
}