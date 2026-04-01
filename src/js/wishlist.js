import { loadHeaderFooter, getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

// Initialize dynamic header and footer
loadHeaderFooter();

/**
 * Retrieves wishlist items from localStorage and renders them to the DOM
 */
function renderWishlist() {
    const wishlist = getLocalStorage("so-wishlist") || [];
    const htmlItems = wishlist.map((item) => wishlistTemplate(item));
    document.querySelector("#wishlist-list").innerHTML = htmlItems.join("");
    
    // Attach event listeners to all "Move to Cart" buttons
    document.querySelectorAll(".move-to-cart").forEach(btn => {
        btn.addEventListener("click", (e) => {
            moveToCart(e.target.dataset.id);
        });
    });
}

/**
 * HTML Template for a single wishlist item
 */
function wishlistTemplate(item) {
    return `<li class="cart-card divider">
        <a href="../product_pages/index.html?product=${item.Id}" class="cart-card__image">
            <img src="${item.Images.PrimaryMedium}" alt="${item.Name}" />
        </a>
        <h2 class="card__name">${item.Name}</h2>
        <p class="cart-card__price">$${item.ListPrice}</p>
        <button class="move-to-cart" data-id="${item.Id}">Move to Cart 🛒</button>
    </li>`;
}

/**
 * Transfers an item from the wishlist to the shopping cart
 * @param {string} id - The unique ID of the product to move
 */
function moveToCart(id) {
    let wishlist = getLocalStorage("so-wishlist") || [];
    let cart = getLocalStorage("so-cart") || [];
    
    // Find the product index in the wishlist
    const productIndex = wishlist.findIndex(item => item.Id === id);
    const product = wishlist[productIndex];

    if (product) {
        // 1. Add product to the cart array
        cart.push(product);
        setLocalStorage("so-cart", cart);
        
        // 2. Remove product from the wishlist array
        wishlist.splice(productIndex, 1);
        setLocalStorage("so-wishlist", wishlist);
        
        // 3. Refresh the UI components
        renderWishlist();
        updateCartCount();
        alert("Successfully moved to your cart!");
    }
}

// Initial render call
renderWishlist();