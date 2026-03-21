import{g as c,s as a,a as d}from"./utils-BeIUunIX.js";import{P as e}from"./ProductData-B1aYoRqE.js";import"./main-BygsRRS7.js";class s{constructor(t,r){this.productId=t,this.product={},this.dataSource=r}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addProductToCart.bind(this))}addProductToCart(){let t=c("so-cart");Array.isArray(t)||(t=[]),t.push(this.product),a("so-cart",t);const r=document.querySelector(".cart-count");r?r.textContent=t.length:console.warn("Cart count element not found"),updateCartCount()}renderProductDetails(){document.querySelector(".product-detail").innerHTML=`
        <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img class="divider" src="${this.product.Images.PrimaryLarge}" alt="${this.product.Name}" />
        <p class="product-card__price">$${this.product.FinalPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>`,document.title=`Sleep Outside | ${this.product.Name}`}}const i=d("product"),u=new e,n=new s(i,u);n.init();function p(){const t=(JSON.parse(localStorage.getItem("so-cart"))||[]).length,r=document.querySelector(".cart-count");r&&(r.textContent=t)}p();
