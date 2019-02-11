import CartService from "../cart/CartService";

class ProductListingService {
  init() {
    // if we dont have an existing promise; create a new promise to fetch list
    if (!this.promise) {
      this.promise = this.getList();
    }

    return this.promise;
  }
  async getList() {
    // use fetch to get the list of items
    const response = await fetch("/products.json");

    this.handleResponse(response);
  }

  async handleResponse(response) {
    // need to make sure we return promise
    let data;
    try {
      data = await response.json(); // do not resolve until response is received
      if (data.error) {
        throw data.error;
      }
    } catch (error) {
      throw error || "An unknown error has occurred";
    }

    // mock json does not have id; use index as ID
    this.products = data.map((product, i) => Object.assign(product, { id: i }));
  }

  async addToCart(i, quantity) {
    await CartService.add(i, parseInt(quantity, 0));
  }

  getProduct(id) {
    return this.products[id];
  }
}
const singleton = new ProductListingService();
export default singleton;
