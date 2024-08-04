import { BasePage } from './base.page.js';

export abstract class SalesPortalPage extends BasePage {
  protected readonly spinner = '.spinner-border';
  abstract readonly uniqueElement: string;
  private readonly 'Popup message' = '.toast-body';
  private readonly 'Close message' = '.btn-close';

  async waitForOpened() {
    await this.waitForElement(this.uniqueElement);
  }

  async waitForSpinnerToHide() {
    await this.waitForElement(this.spinner, 10000, true);
  }

  async verifyAndClosePopup(expectedMessage: string) {
    await this.waitForElement(this['Popup message']);
    expect(await this.getText(this['Popup message'])).toBe(expectedMessage);
    await this.click(this['Close message']);
    await this.waitForElement(this['Popup message'], 5000, true);
  }

}
