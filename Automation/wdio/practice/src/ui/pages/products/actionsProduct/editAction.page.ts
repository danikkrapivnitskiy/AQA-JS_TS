import { IActionsProduct } from "../../../../data/types/actions.types";
import { SalesPortalPage } from "../../salesPortal.page";

export class EditProduct extends SalesPortalPage implements IActionsProduct {
    readonly uniqueElement = "#edit-product-form";
    private readonly 'Edit button' = '//button[@title="Edit"]';
    async clickOnAction(actionPath: string): Promise<this> {
        await this.click(`${actionPath}${this["Edit button"]}`)
        await this.waitForOpened();
        return this;
    }

}