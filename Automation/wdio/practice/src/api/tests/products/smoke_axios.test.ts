import axios from 'axios';
import { generateNewProduct } from '../../../data/products/generateProduct.js';
import _ from 'lodash';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../../config/environment.js';
import { IProductResponse } from '../../../data/types/product.types.js';
import { ILoginResponse } from '../../../data/types/user.types.js';
import { AxiosApiClient } from '../../../utils/apiClients/axios.js';
import { apiConfig } from '../../../config/apiConfig.js';
import { ProductsApiClient } from '../../clients/products.client.js';
import { validateResponse, validateSchema } from '../../../utils/validation/response.js';
import { createdProductSchema } from '../../../data/schema/product.schema.js';
import { STATUS_CODES } from '../../../data/types/api.types.js';

describe('[API] [Products] Smoke', () => {
  const apiClient = new AxiosApiClient();
  const productsApi = new ProductsApiClient();
  let token = '';
  let createdProduct: IProductResponse;
  beforeEach(async () => {
    const credentials = {
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD
    };
    const response = await apiClient.send<ILoginResponse>({
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.Login,
      data: credentials,
      method: 'post'
    });
    expect(response.status).toBe(STATUS_CODES.OK);
    token = 'Bearer ' + response.body.token;
  });

  afterEach(async () => {
    if (createdProduct) {
      const id = createdProduct.Product._id;
      const url = apiConfig.baseUrl + apiConfig.endpoints.Products + `${id}/`;
      console.log(url);
      const response = await axios.delete(url, {
        headers: {
          Authorization: token
        }
      });
      expect(response.status).toEqual(STATUS_CODES.DELETED);
    }
  });

  it.skip('Should create product with valid data', async () => {
    const productData = generateNewProduct();
    const response = await axios.post(apiConfig.baseUrl + apiConfig.endpoints.Products, productData, {
      headers: {
        Authorization: token
      }
    });

    if (response.status !== STATUS_CODES.CREATED) throw new Error('Failed to create product');
    createdProduct = response.data;
    console.log(createdProduct);
  });

  it('should create product', async () => {
    const productData = generateNewProduct();
    const response = await productsApi.create(productData, token);
    createdProduct = response.body;
    console.log(createdProduct);
    validateResponse(response, STATUS_CODES.CREATED, true, null);
    validateSchema(response, createdProductSchema);
  });
});
