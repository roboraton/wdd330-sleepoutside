import { renderListWithTemplate, qs } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a
    >
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  sortProducts(sortBy) {
    if (sortBy === "name") {
      this.list.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
    } else if (sortBy === "price") {
      this.list.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
    this.renderList(this.list);
  }

  async init() {
    this.list = await this.dataSource.getData(this.category);
    this.renderList(this.list);

    // Add sorting select element
    const sortSelect = document.createElement("select");
    sortSelect.innerHTML = `
      <option value="name">Name</option>
      <option value="price">Price</option>
    `;
    this.listElement.before(sortSelect);

    // Attach event listener
    sortSelect.addEventListener("change", (event) => {
      const sortBy = event.target.value;
      this.sortProducts(sortBy);
    });
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}