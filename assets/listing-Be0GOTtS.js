import{r as c,l as i,a as o}from"./utils-BeIUunIX.js";import{P as n}from"./ProductData-B1aYoRqE.js";function l(t){return`<li class="product-card">
    <a href="../product_pages/index.html?product=${t.Id}">
      <img
        src="${t.Images.PrimaryMedium}"
        alt="Image of ${t.Name}"
      />
      <h3 class="card__brand">${t.Brand.Name}</h3>
      <h2 class="card__name">${t.NameWithoutBrand}</h2>
      <p class="product-card__price">$${t.FinalPrice}</p></a
    >
  </li>`}class d{constructor(e,r,s){this.category=e,this.dataSource=r,this.listElement=s}async init(){const e=await this.dataSource.getData(this.category);this.renderList(e)}renderList(e){c(l,this.listElement,e,"afterbegin",!0)}}i();const a=o("category"),m=new n,u=document.querySelector(".product-list"),h=new d(a,m,u);h.init();const p=document.querySelector(".products h2");p.innerHTML+=`: ${a.charAt(0).toUpperCase()+a.slice(1)}`;
