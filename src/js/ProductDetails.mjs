import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  /**
   * Initialize the product details page by fetching data and rendering
   */
  async init() {
    // Fetch product data using the data source
    this.product = await this.dataSource.findProductById(this.productId);

    // Render the HTML structure
    this.renderProductDetails();

    // Add event listener for "Add to Cart" button
    const addButton = document.getElementById("addToCart");
    if (addButton) {
      addButton.addEventListener("click", this.addProductToCart.bind(this));
    }

    // Add event listener for "Add to Wishlist" button
    const wishButton = document.getElementById("addToWishlist");
    if (wishButton) {
      wishButton.addEventListener("click", this.addToWishlist.bind(this));
    }
  }

  /**
   * Adds the current product to the cart in localStorage
   */
  addProductToCart() {
    let cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);

    // Update the backpack icon notification count
    updateCartCount();
    alert("Product added to cart!");
  }

  /**
   * Adds the current product to the wishlist in localStorage
   */
  addToWishlist() {
    let wishlist = getLocalStorage("so-wishlist") || [];

    // Check if the item is already in the wishlist to prevent duplicates
    const exists = wishlist.find((item) => item.Id === this.product.Id);

    if (!exists) {
      wishlist.push(this.product);
      setLocalStorage("so-wishlist", wishlist);
      alert("Product added to your Wishlist! ❤");
    } else {
      alert("This item is already in your Wishlist.");
    }
  }

  /**
   * Generates and inserts the HTML for the product details section
   */
  renderProductDetails() {
    // Calculate the discount percentage for the badge
    const originalPrice = this.product.SuggestedRetailPrice;
    const salePrice = this.product.ListPrice;
    const discountPercent = Math.round(
      ((originalPrice - salePrice) / originalPrice) * 100,
    );

    // Only show the badge if there is a real discount
    const discountBadge =
      discountPercent > 0
        ? `<span class="discount-badge">Save ${discountPercent}%</span>`
        : "";

    document.querySelector(".product-detail").innerHTML = `
        <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img class="divider" src="${this.product.Images.PrimaryLarge}" alt="${this.product.Name}" />
        <p class="product-card__price">
          <span class="original-price">$${originalPrice.toFixed(2)}</span> 
          <span class="sale-price">$${salePrice.toFixed(2)}</span>
          ${discountBadge}
        </p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
          <button id="addToWishlist" class="button-secondary" data-id="${this.product.Id}">❤ Wishlist</button>
        </div>`;

    // Update the browser tab title with the product name
    document.title = `Sleep Outside | ${this.product.Name}`;
  }
}
