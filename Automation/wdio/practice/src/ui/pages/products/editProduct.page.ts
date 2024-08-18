import { IProduct } from "../../../data/types/product.types.js";
import { SalesPortalPage } from "../salesPortal.page.js";

export class EditProductPage extends SalesPortalPage {
  readonly uniqueElement = '//h2[@class="page-title-text" and contains(text(), "Edit")]';

  readonly "Name input" = "#inputName";
  readonly "Manufacturer dropdown" = "select#inputManufacturer";
  readonly "Price input" = "#inputPrice";
  readonly "Amount input" = "#inputAmount";
  readonly "Notes textarea" = "#textareaNotes";
  readonly "Delete Product button" = "#delete-product-btn";
  readonly "Save Changes button" = "#save-product-changes";

  async fillInputs(product: Partial<IProduct>) {
    product.name && (await this.setValue(this["Name input"], product.name));
    product.manufacturer && (await this.selectDropdownValue(this["Manufacturer dropdown"], product.manufacturer));
    product.price !== undefined && (await this.setValue(this["Price input"], product.price));
    product.amount !== undefined && (await this.setValue(this["Amount input"], product.amount));
    product.notes !== undefined && (await this.setValue(this["Notes textarea"], product.notes));
  }

  async clickOnSaveButton() {
    await this.click(this["Save Changes button"]);
  }

  async clickOnDeleteButton() {
    await this.click(this["Delete Product button"]);
  }
}
