import _ from "lodash";
import { generateNewProduct } from "../../../data/products/generateProduct.js";
import { createdProductSchema, allProductsSchemas } from "../../../data/schema/product.schema.js";
import { STATUS_CODES } from "../../../data/types/api.types.js";
import { IProductResponse, MANUFACTURERS } from "../../../data/types/product.types.js";
import signInService from "../../../services/signIn/signIn.service.js";
import { validateResponse, validateSchema } from "../../../utils/validation/response.js";
import { ProductsApiClient } from "../../clients/products.client.js";

describe('[API] [Products] CRUD Suite', () => {
    const productClient = new ProductsApiClient();
    let createdProduct: IProductResponse | null;
    let token = '';
    beforeEach(async () => {
      await signInService.signInAsAdminApi();
      token = signInService.getToken();
    });
  
    afterEach(async () => {
      if (createdProduct) {
        await productClient.delete(createdProduct.Product._id, token);
        createdProduct = null;
      }
    });
  
    it('Create product', async () => {
      const body = generateNewProduct();
      const response = await productClient.create(body, token);
      const responseBody = response.body;
      createdProduct = responseBody;
      validateResponse(response, STATUS_CODES.CREATED, true, null);
    });

    it('Get product by id', async () => { 
      const body = generateNewProduct();
      const response = await productClient.create(body, token);
      const responseBody = response.body;
      createdProduct = responseBody;
      const getProductById = await productClient.getById(responseBody.Product._id, token);
      validateResponse(getProductById, STATUS_CODES.OK, true, null);
      _.isEqual(getProductById, response)
    });

    it('Get all products', async () => { 
      const body = generateNewProduct();
      const response = await productClient.create(body, token);
      const responseBody = response.body;
      createdProduct = responseBody;
      const allProducts = await productClient.getAll(token);
      validateResponse(allProducts, STATUS_CODES.OK, true, null);
      validateSchema(allProducts, allProductsSchemas);
    });

    it('Update product', async () => { 
      const body = generateNewProduct();
      const response = await productClient.create(body, token);
      const responseBody = response.body;
      createdProduct = responseBody;
      const updatedProduct = {
        _id: createdProduct.Product._id,
        name: 'Updated Product',
        manufacturer: MANUFACTURERS.GOOGLE,
        price: 25,
        amount: 100,
        notes: 'Updated notes'
      };
      const responseUpdate = await productClient.update(updatedProduct, token);
      const responseUpdateBody = responseUpdate.body
      createdProduct = responseUpdateBody;
      validateResponse(responseUpdate, STATUS_CODES.OK, true, null);
      validateSchema(responseUpdate, createdProductSchema);
      expect(responseUpdateBody.ErrorMessage).toBe(null);
      expect(responseUpdateBody.IsSuccess).toBe(true);
    });

    it('Delete product', async () => {
      const body = generateNewProduct();
      const response = await productClient.create(body, token);
      const responseBody = response.body;
      createdProduct = responseBody;
      validateResponse(response, STATUS_CODES.CREATED, true, null);
      await productClient.delete(createdProduct.Product._id, token);
    });
  });
  