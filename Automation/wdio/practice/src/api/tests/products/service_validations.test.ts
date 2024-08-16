import _ from 'lodash';
import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { STATUS_CODES } from '../../../data/types/api.types.js';
import { ProductsApiClient } from '../../clients/products.client.js';

import { IProductResponse } from '../../../data/types/product.types.js';
import { validateResponse, validateSchema } from '../../../utils/validation/response.js';
import { createdProductSchema } from '../../../data/schema/product.schema.js';

import signInService from '../../../services/signIn/signIn.service.js';

describe('[API] [Products] Validations', () => {
  const productClient = new ProductsApiClient();
  let createdProduct: IProductResponse | null;
  beforeEach(async () => {
    await signInService.signInAsAdminApi();
  });

  afterEach(async () => {
    if (createdProduct) {
      await productClient.delete(createdProduct.Product._id, signInService.getToken());
      createdProduct = null;
    }
  });

  it('Should create product valid data', async () => {
    const body = generateNewProduct();
    const response = await productClient.create(body, signInService.getToken());
    const responseBody = response.body;
    createdProduct = responseBody;
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    validateSchema(response, createdProductSchema);
    expect(body).toMatchObject({ ..._.omit(createdProduct.Product, ['_id', 'createdOn']) });
  });
});
