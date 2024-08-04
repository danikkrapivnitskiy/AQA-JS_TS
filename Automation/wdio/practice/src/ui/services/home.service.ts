import { logStep } from '../../utils/report/decorator.js';
import { HomePage } from '../pages/home.page.js';
import { ProductsPage } from '../pages/products/products.page.js';

export class HomeService {
  constructor(
    private homePage = new HomePage(),
    private productsPage = new ProductsPage()
  ) {}

  @logStep('Open products page')
  async openProductsPage() {
    await this.homePage.clickOnViewDetailsButton('Products');
    await this.homePage.waitForSpinnerToHide();
    await this.productsPage.waitForOpened();
  }
}
