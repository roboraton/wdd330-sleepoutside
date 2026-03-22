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
    this.originalList = [];
  }

  sortProducts(sortBy) {
    if (sortBy === "") {
      // Reset to original order from API
      this.renderList(this.originalList);
    } else if (sortBy === "name") {
      const sortedList = [...this.originalList].sort((a, b) =>
        a.NameWithoutBrand.localeCompare(b.NameWithoutBrand)
      );
      this.renderList(sortedList);
    } else if (sortBy === "price") {
      const sortedList = [...this.originalList].sort((a, b) =>
        a.FinalPrice - b.FinalPrice
      );
      this.renderList(sortedList);
    }
  }

  async init() {
    this.originalList = await this.dataSource.getData(this.category);
    this.renderList(this.originalList);

    // Set up sorting event listener
    const sortSelect = qs("#product-sort");
    if (sortSelect) {
      sortSelect.addEventListener("change", (event) => {
        const sortBy = event.target.value;
        this.sortProducts(sortBy);
      });
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}
