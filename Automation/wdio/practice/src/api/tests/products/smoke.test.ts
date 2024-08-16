import _ from 'lodash';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../../config/environment.js';
import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { IProduct } from '../../../data/types/product.types.js';

describe('[API] [Products] Smoke', () => {
  const baseUrl = 'https://aqa-course-project.app/';
  const endpoints = {
    login: '/api/login/',
    product: '/api/products/'
  };

  let token = '';
  let createdProduct: {
    Product: IProduct & { _id: string; createdOn: string };
    IsSuccess: boolean;
    ErrorMessage: string | null;
  };

  beforeEach(async () => {
    const credentials = {
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD
    };
    const response = await fetch(baseUrl + endpoints.login, {
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    });
    expect(response.status).toBe(200);
    token = 'Bearer ' + (await response.json()).token;
  });

  afterEach(async () => {
    if (createdProduct) {
      const id = createdProduct.Product._id;
      const response = await fetch(baseUrl + endpoints.product + id + '/', {
        method: 'delete',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        }
      });
      expect(response.status).toBe(204);
    }
  });

  it('Should create product', async () => {
    const productData = generateNewProduct();
    const response = await fetch(baseUrl + endpoints.product, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(productData)
    });
    expect(response.status).toBe(201);
    createdProduct = await response.json();
    console.log(createdProduct);

    const actualProduct = _.omit(createdProduct.Product, ['_id', 'createdOn']);
    expect(createdProduct.ErrorMessage).toBe(null);
    expect(createdProduct.IsSuccess).toBe(true);
    expect(actualProduct).toMatchObject({ ...productData });
    //check created product object !
    //check IsSuccess === true !
    //check ErrorMessage === null !
    //check JSON schema
  });
});
