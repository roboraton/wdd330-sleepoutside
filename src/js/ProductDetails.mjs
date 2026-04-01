import { getLocalStorage, setLocalStorage, updateCartCount } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  // ProductDetails.mjs - Revised init and addProductToCart
async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    // IMPORTANT: Select the button ONLY AFTER it has been rendered in the innerHTML
    const addButton = document.getElementById('addToCart');
    if (addButton) {
        addButton.addEventListener('click', this.addProductToCart.bind(this));
    }
}

addProductToCart() {
  let cartItems = getLocalStorage('so-cart') || [];
  cartItems.push(this.product);
  setLocalStorage('so-cart', cartItems);
  
  // Call this to update the UI without refreshing the page
  updateCartCount();
  
  alert("Product added to cart!");
}
  renderProductDetails() {
    // Calculate the discount percentage
    const originalPrice = this.product.SuggestedRetailPrice;
    const salePrice = this.product.ListPrice;
    const discountPercent = Math.round(((originalPrice - salePrice) / originalPrice) * 100);

    // Render the discount badge only if a discount exists
    const discountBadge = discountPercent > 0 
      ? `<span class="discount-badge">Save ${discountPercent}%</span>` 
      : "";

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