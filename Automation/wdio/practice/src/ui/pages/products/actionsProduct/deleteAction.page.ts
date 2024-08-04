import { IActionsProduct } from "../../../../data/types/actions.types.js";
import { SalesPortalPage } from "../../salesPortal.page.js";

export class DeleteProduct extends SalesPortalPage implements IActionsProduct {
    readonly uniqueElement = "//h5[.='Delete Product']";
    private readonly 'Delete button' = '//button[@title="Delete"]';
    private readonly 'Submit button' = '.btn-danger';
    private readonly 'Successfull delete message' = '.toast-body';
    async clickOnAction(actionPath: string):  Promise<this> {
        await this.click(`${actionPath}${this["Delete button"]}`)
        await this.waitForOpened();
        return this
    }

    async clickOnSubmitDelete() {
        await this.click(this['Submit button']);
        await this.waitForElement(this['Successfull delete message']);
    }

    async closePopup() {
        await this.waitForSpinnerToHide()
        await this.verifyAndClosePopup('Product was successfully deleted')
    }

}