import type { IProductFromResponse } from "../../data/types/product.types";

export class ProductStorage {
  private static instance: ProductStorage;
  private products: IProductFromResponse[] = [];

  constructor() {
    if (ProductStorage.instance) {
      return ProductStorage.instance;
    }
    ProductStorage.instance = this;
  }

  add(product: IProductFromResponse): void {
    // const productIndex = this.findProductById(product._id);
    // if (productIndex !== -1) {
    //   this.update(product, productIndex);
    // } else {
    this.products.push(product);
    // }
  }

  update(product: Pick<IProductFromResponse, "_id"> & Partial<IProductFromResponse>) {
    const index = this.findProductById(product._id);
    this.products[index] = { ...this.products[index], ...product };
  }

  getAll() {
    return this.products;
  }

  get(_id?: string) {
    if (!this.products.length) throw new Error("No stored products");
    if (!_id) return this.products[this.products.length - 1];
    const index = this.findProductById(_id);
    if (!index) throw new Error("No such product");
    return this.products[index];
  }

  remove(_id: string) {
    const index = this.findProductById(_id);
    this.products.splice(index, 1);
  }

  private findProductById(_id: string) {
    return this.products.findIndex((p) => p._id === _id);
  }
}
