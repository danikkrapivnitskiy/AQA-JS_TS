import { DataTable, Then, When, After } from "@wdio/cucumber-framework";
import { ProductsApiClient } from "../../api/clients/products.client.js";
import signInApiService from "../../../src/services/signIn/signIn.service.js";
import { generateNewProduct } from "../../data/products/generateProduct.js";
import { ProductsListService } from "../services/products/products.service.js";
import { EditProductService } from "../services/products/editProduct.service.js";
import { IProduct } from "../../data/types/product.types.js";
import { STATUS_CODES } from "../../data/types/api.types.js";
import { Products } from "../../config/environment.js";

const productApi = new ProductsApiClient();
const productsListUIService = new ProductsListService();
const editProductUIService = new EditProductService();

When(/^I create product via API$/, async function () {
  const token = await signInApiService.signInAsAdminApi();
  const productData = generateNewProduct();
  const productResponse = await productApi.create(productData, token);
  expect(productResponse.status).toBe(STATUS_CODES.CREATED);
  // this["product"] = productResponse.body.Product;
  Products.add(productResponse.body.Product);
});

Then(/^I delete product via API$/, async function () {
  // const product = this["product"];
  const product = Products.get();
  const token = (await browser.getCookies("Authorization"))[0]?.value;
  const response = await productApi.delete(product._id, `Bearer ${token}`);
  expect(response.status).toBe(STATUS_CODES.DELETED);
});

When(/^I open Edit Product page on "Products List" page$/, async function () {
  // const createdProduct = this["product"];
  const createdProduct = Products.get();
  await productsListUIService.openEditProductPage(createdProduct.name);
});

When(/^I fill product inputs on "Edit Product" page with following values:$/, async function (table: DataTable) {
  //rowHash - обьект
  // const userData = table.rowsHash();
  // console.log(userData);
  //hashes - массив объектов, где первая строка - ключи, и каждая следующая - значения конечного объекта
  // const userData = table.hashes();
  // console.log(userData);
  //rows - массив, состоящий из массивов, где каждый массив - значения из одной строки. Первая строка игнорируется
  // const userData = table.rows();
  // console.log(userData);
  //raw - как rows, но не игнорирует первую строку
  // const userData = table.raw();
  // console.log(userData);
  // const newProductData = generateNewProduct();
  // await editProductUIService.update(newProductData);

  const userData = table.rowsHash();
  await editProductUIService.update(userData as Partial<IProduct>);

  Products.update({
    _id: Products.get()._id,
    ...userData,
    ...(userData.price && { price: +userData.price }),
    ...(userData.amount !== undefined && { amount: +userData.amount }),
  });
});

Then(/^I should see updated Product in table on "Products List" page$/, async function () {
  // const product = this["product"];
  const product = Products.get();
  await productsListUIService.checkProductInTable(product);
});

After(async function () {
  const products = Products.getAll();
  if (products.length) {
    const token = (await browser.getCookies("Authorization"))[0]?.value;
    for (const product of products) {
      const response = await productApi.delete(product._id, `Bearer ${token}`);
      expect(response.status).toBe(STATUS_CODES.DELETED);
    }
  }
});
