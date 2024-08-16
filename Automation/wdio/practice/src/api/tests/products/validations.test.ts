import _ from 'lodash';
import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { STATUS_CODES } from '../../../data/types/api.types.js';
import { ProductsApiClient } from '../../clients/products.client.js';
import { SignInApiClient } from '../../clients/signIn.client.js';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../../config/environment.js';
import { faker } from '@faker-js/faker';
import { IProductResponse } from '../../../data/types/product.types.js';
import { validateResponse, validateSchema } from '../../../utils/validation/response.js';
import { createdProductSchema } from '../../../data/schema/product.schema.js';
import { PRODUCT_MESSAGES } from '../../../data/products/messages.js';

describe('[API] [Products] Validations', () => {
  const productClient = new ProductsApiClient();
  const signInClient = new SignInApiClient();
  let createdProduct: IProductResponse | null;
  let token = '';
  beforeEach(async () => {
    token = (await signInClient.login({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD })).body.token;
    token = `Bearer ${token}`;
  });

  afterEach(async () => {
    if (createdProduct) {
      await productClient.delete(createdProduct.Product._id, token);
      createdProduct = null;
    }
  });

  it('Should create product valid data', async () => {
    const body = generateNewProduct();
    const response = await productClient.create(body, token);
    const status = response.status;
    const responseBody = response.body;
    createdProduct = responseBody;
    expect(status).toEqual(STATUS_CODES.CREATED);
    expect(responseBody.ErrorMessage).toBe(null);
    expect(responseBody.IsSuccess).toBe(true);
    expect(body).toMatchObject({ ..._.omit(responseBody.Product, ['_id', 'createdOn']) });
  });

  it('Should create product max valid data', async () => {
    const maxName = faker.string.alphanumeric(40);
    const body = generateNewProduct({
      name: maxName,
      price: 99999,
      amount: 999,
      notes: faker.string.alphanumeric(238) + '!@#$%^&*()_+'
    });
    const response = await productClient.create(body, token);
    const status = response.status;
    const createdProductBody = response.body;
    createdProduct = createdProductBody;

    expect(status).toEqual(STATUS_CODES.CREATED);
    expect(createdProductBody.ErrorMessage).toBe(null);
    expect(createdProductBody.IsSuccess).toBe(true);
    expect(body).toMatchObject({ ..._.omit(createdProductBody.Product, ['_id', 'createdOn']) });

    const product = await productClient.getById(createdProductBody.Product._id, token);
    expect(product.body.ErrorMessage).toBe(null);
    expect(product.body.IsSuccess).toBe(true);
    expect(product.status).toEqual(STATUS_CODES.OK);
    expect(body).toMatchObject({ ..._.omit(product.body.Product, ['_id', 'createdOn']) });
  });

  it('Should create product min valid data', async () => {
    const body = generateNewProduct({
      name: faker.string.alphanumeric(3),
      price: 1,
      amount: 0,
      notes: faker.string.alphanumeric(1)
    });
    const response = await productClient.create(body, token);
    const createdProductBody = response.body;
    createdProduct = createdProductBody;

    validateResponse(response, STATUS_CODES.CREATED, true, null);
    validateSchema(response, createdProductSchema);
    expect(body).toMatchObject({ ..._.omit(createdProductBody.Product, ['_id', 'createdOn']) });

    const product = await productClient.getById(createdProductBody.Product._id, token);
    validateResponse(product, STATUS_CODES.OK, true, null);
    expect(body).toMatchObject({ ..._.omit(product.body.Product, ['_id', 'createdOn']) });
  });

  it('Should not create a product with 2 characters in name', async () => {
    const body = generateNewProduct({
      name: faker.string.alphanumeric(2)
    });
    const response = await productClient.create(body, token);

    validateResponse(response, STATUS_CODES.INVALID_REQUEST, false, PRODUCT_MESSAGES.INCORRECT_REQUEST_BODY);
  });

  it('Should not create a product with 100000 digits in price', async () => {
    const body = generateNewProduct({
      price: 100000
    });
    const response = await productClient.create(body, token);

    validateResponse(response, STATUS_CODES.INVALID_REQUEST, false, PRODUCT_MESSAGES.INCORRECT_REQUEST_BODY);
  });
});
