import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { HomeService } from '../../services/home.service.js';
import { ActionsProductService } from '../../services/products/actionsProduct.service.js';
import { AddProductService } from '../../services/products/addNewProduct.service.js';
import { ProductsListService } from '../../services/products/products.service.js';
import { SignInService } from '../../services/signIn.service.js';
import allure from '@wdio/allure-reporter';

const testDataInvalid = [    
  { name: 'a'.repeat(2)},
  { name: 'a'.repeat(41)},   
  
];

const testDataValid = [    
  { name: 'a'.repeat(3)},
  { name: 'a'.repeat(40)},    
];

describe('[UI] [Products] Smoke', () => {
  allure.addFeature('Products Creation Feature');
  allure.addSuite('[Products] Smoke');
  let product = generateNewProduct();
  const signInService = new SignInService();
  const homeService = new HomeService();
  const addProductService = new AddProductService();
  const productsService = new ProductsListService();
  const actionsProductService = new ActionsProductService()

  beforeEach(async () => {
    await signInService.openSalesPortal();
    await signInService.loginAsAdmin();
    await homeService.openProductsPage();
  });

  afterEach(async () => {
    await browser.refresh()
    await homeService.openProductsPage();
    await actionsProductService.removeProduct(product)
    await signInService.signOut();
  });

  it('Should create valid product', async () => {
    allure.addStory('Users creates product with valid data via ui');
    allure.addSeverity('blocker');
    await productsService.openAddNewProductPage();
    await addProductService.create(product);
    await productsService.checkProductInTable(product);
    await actionsProductService.verifyProductDetails(product)
  });

  testDataValid.forEach(({name}) => {
    it('Positive validation creation product', async () => {
      allure.addStory('Users creates product with valid data via ui');
      allure.addSeverity('major');
      await productsService.openAddNewProductPage();
      product = generateNewProduct({name});
      await addProductService.create(product);
    })
  })

  testDataInvalid.forEach(({name}) => {
    it.only('Negative validation creation product', async () => {
      allure.addStory('Users creates product with invalid data via ui');
      allure.addSeverity('major');
      await productsService.openAddNewProductPage();
      product = generateNewProduct({name});
      await addProductService.fillProductInputs(product);
      await addProductService.verifyMessageDataInvalid();
    })
  })

});
