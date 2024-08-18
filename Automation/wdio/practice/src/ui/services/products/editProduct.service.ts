import { generateNewProduct } from "../../../data/products/generateProduct.js";
import { IProduct } from "../../../data/types/product.types.js";
import { EditProductPage } from "../../pages/products/editProduct.page.js";
import { ProductsPage } from "../../pages/products/products.page.js";

export class EditProductService {
  constructor(private productsPage = new ProductsPage(), private editProductPage = new EditProductPage()) {}

  async fillProductInputs(product: Partial<IProduct>) {
    await this.editProductPage.fillInputs(product);
  }

  async save() {
    await this.editProductPage.clickOnSaveButton();
  }

  async update(product?: Partial<IProduct>) {
    await this.fillProductInputs(product ?? generateNewProduct());
    await this.save();
    await this.editProductPage.waitForSpinnerToHide();
    await this.productsPage.waitForOpened();
  }
}
