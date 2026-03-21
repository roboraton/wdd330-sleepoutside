import{l as d,g as o,s as m}from"./utils-BeIUunIX.js";d();function s(){const t=o("so-cart"),a=document.querySelector(".product-list"),r=document.querySelector(".cart-footer"),n=document.querySelector(".cart-total");if(t&&t.length>0){const l=t.map((e,c)=>u(e,c));a.innerHTML=l.join("");const i=t.reduce((e,c)=>e+c.FinalPrice,0);n.innerHTML=`Total: $${i.toFixed(2)}`,r.classList.remove("hide")}else a.innerHTML="<li>Your cart is empty.</li>",r.classList.add("hide")}function u(t,a){return`<li class="cart-card divider">
    <span class="cart-card__remove" data-id="${a}">X</span>
    <a href="#" class="cart-card__image">
      <img
        src="${t.Image}"
        alt="${t.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${t.Name}</h2>
    </a>
    <p class="cart-card__color">${t.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${t.FinalPrice}</p>
  </li>`}function p(t){const a=o("so-cart")||[];a.splice(t,1),m("so-cart",a),s()}document.querySelector(".product-list").addEventListener("click",t=>{t.target.classList.contains("cart-card__remove")&&p(t.target.dataset.id)});s();
