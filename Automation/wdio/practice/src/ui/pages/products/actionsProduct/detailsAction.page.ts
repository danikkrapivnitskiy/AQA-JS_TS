import { IActionsProduct, ProductDetails } from "../../../../data/types/actions.types.js";
import { SalesPortalPage } from "../../salesPortal.page.js";

export class DetailsProductModal extends SalesPortalPage implements IActionsProduct {
    readonly uniqueElement = '.strong-details';
    private readonly 'Details button' = '//button[@title="Details"]';
    private readonly 'Product detail'  = (fieldName: string) =>  `//div/strong[@class='strong-details' and text()='${fieldName}']/following-sibling::*`
    private readonly 'Close details' = `//button[.='Cancel']`
    async clickOnAction(actionPath: string): Promise<this> {
        await this.click(`${actionPath}${this["Details button"]}`)
        await this.waitForOpened();
        return this
    }

    async getProductDetails() {
        const [name, amount, price, manufacturer, notes] = await Promise.all([
            this.getText(this['Product detail'](ProductDetails.NAME)),
            this.getText(this['Product detail'](ProductDetails.AMOUNT)),
            this.getText(this['Product detail'](ProductDetails.PRICE)),
            this.getText(this['Product detail'](ProductDetails.MANUFACTURER)),
            this.getText(this['Product detail'](ProductDetails.NOTES)),
          ]);
          return { name, amount: +amount, price: +price, manufacturer, notes };
    }

    async closeDetails() {
        await this.click(`${this["Close details"]}`)
    }
    
}