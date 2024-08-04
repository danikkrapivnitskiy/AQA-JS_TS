import _ from "lodash";
import { IProduct } from "../../../data/types/product.types.js";
import { logStep } from "../../../utils/report/decorator.js";
import { DeleteProductModal } from "../../pages/products/actionsProduct/deleteAction.page.js";
import { DetailsProductModal } from "../../pages/products/actionsProduct/detailsAction.page.js";
import { ProductsPage } from "../../pages/products/products.page.js";

export class ActionsProductService {
    constructor(
        private productPage = new ProductsPage(),
        private deleteProductPage = new DeleteProductModal(),
        private detailsProductPage = new DetailsProductModal(),
     ) {}

     @logStep('Remove the product')
     async removeProduct(product: IProduct) {
      if (!await this.productPage.checkProductExists(product.name)) {
         return
      }
        await this.productPage.clickOnProductAction(product.name, this.deleteProductPage)
         .then(async page => {
            await page.clickOnSubmitDelete()
            await page.waitForSpinnerToHide()
            await page.verifyAndClosePopup('Product was successfully deleted')
         });
         return this
     }

     @logStep('Validate product in product details')
     async verifyProductDetails(product: IProduct) {
        const actualProduct = await (await this.productPage.clickOnProductAction(product.name, this.detailsProductPage)).getProductDetails()
         const expectedProduct = _.pick(product, Object.keys(product));
         expect(actualProduct).toMatchObject(expectedProduct);
         this.detailsProductPage.closeDetails()
         return this
     }
}