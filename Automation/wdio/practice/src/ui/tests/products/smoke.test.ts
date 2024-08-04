import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { HomeService } from '../../services/home.service.js';
import { AddProductService } from '../../services/products/addNewProduct.service.js';
import { ProductsListService } from '../../services/products/products.service.js';
import { SignInService } from '../../services/signIn.service.js';
import allure from '@wdio/allure-reporter';

describe('[UI] [Products] Smoke', () => {
  allure.addFeature('Products Creation Feature');
  allure.addSuite('[Products] Smoke');
  const signInService = new SignInService();
  const homeService = new HomeService();
  const addProductService = new AddProductService();
  const productsService = new ProductsListService();

  beforeEach(async () => {
    await signInService.openSalesPortal();
    await signInService.loginAsAdmin();
    await homeService.openProductsPage();
  });

  afterEach(async () => {
    await signInService.signOut();
  });

  it('Should create valid product', async () => {
    allure.addStory('Users creates product with valid data via ui');
    allure.addSeverity('blocker');
    await productsService.openAddNewProductPage();
    const product = generateNewProduct();
    await addProductService.create(product);
    await productsService.checkProductInTable(product);
  });
});
