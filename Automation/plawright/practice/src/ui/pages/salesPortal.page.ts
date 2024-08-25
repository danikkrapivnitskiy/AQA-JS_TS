import { BasePage } from "./base.page.js";

export abstract class SalesPortalPage extends BasePage {
  protected readonly spinner = this.findElement(".spinner-border");
  abstract readonly uniqueElement: string;

  async waitForOpened() {
    await this.waitForElement(this.uniqueElement);
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.spinner, "hidden");
  }
}
