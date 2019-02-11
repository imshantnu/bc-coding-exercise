import { Subject } from "rxjs";
import ProductListingService from "../category/ProductListingService";

class CartService extends Subject {
  constructor() {
    super();

    this.promise = null; // the promise of singleton which should be returned
  }

  init() {
    // if we dont have an existing promise; create a new promise to fetch list
    if (!this.promise) {
      this.promise = this.getCartItems();
    }

    return this.promise;
  }

  emit() {
    localStorage.setItem("cartObject", JSON.stringify(this.cart));
    this.next(this.cart);
  }

  async getCartItems() {
    this.cart = (await JSON.parse(localStorage.getItem("cartObject"))) || {
      total: 0,
      items: {}
    };

    this.next(this.cart);
  }

  async add(id, quantity) {
    if (!this.cart.items[id]) {
      this.cart.items[id] = { id: id, quantity: 0 };
    }
    this.update(id, quantity, true).then(() => this.emit());
  }

  async remove(id) {
    this.update(id, this.cart.items[id].quantity, false).then(() => {
      delete this.cart.items[id];
      this.emit();
    });
  }

  async updateQuantity(id, quantity) {
    const diff = quantity - this.cart.items[id].quantity;
    this.cart.total += diff;
    this.cart.items[id].quantity = quantity;
    this.emit();
  }

  async update(id, quantity, add) {
    if (add) {
      this.cart.items[id].quantity += quantity;
      this.cart.total += quantity;
    } else {
      this.cart.items[id].quantity -= quantity;
      this.cart.total -= quantity;
    }
  }

  computeTotal() {
    let total = 0;
    for (const key of Object.keys(this.cart.items)) {
      const product = ProductListingService.getProduct(key);
      total += product.price * this.cart.items[key].quantity;
    }
    return total;
  }
}

const singleton = new CartService();
export default singleton;
