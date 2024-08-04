import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { IProduct } from '../../../data/types/product.types.js';
import { logStep } from '../../../utils/report/decorator.js';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page.js';
import { ProductsPage } from '../../pages/products/products.page.js';

export class AddProductService {
  constructor(
    private productsPage = new ProductsPage(),
    private addNewProductPage = new AddNewProductPage()
  ) {}

  @logStep('Fill product inputs')
  async fillProductInputs(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputs(product);
  }

  @logStep('Save new product')
  async save() {
    await this.addNewProductPage.clickOnSaveButton();
  }

  @logStep('Create product')
  async create(product?: IProduct) {
    await this.fillProductInputs(product ?? generateNewProduct());
    await this.save();
    await this.addNewProductPage.waitForSpinnerToHide();
    await this.productsPage.waitForOpened();
  }
}
