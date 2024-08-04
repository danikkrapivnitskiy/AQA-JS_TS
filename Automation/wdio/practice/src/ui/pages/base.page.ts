import { logAction } from '../../utils/report/decorator.js';

const TIMEOUT_5_SECS = 5000;

export abstract class BasePage {
  private async findElement(locator: string) {
    return await $(locator);
  }

  protected async waitForElement(locator: string, timeout = TIMEOUT_5_SECS, reverse = false) {
    const element = await this.findElement(locator);
    await element.waitForDisplayed({ timeout, reverse });
    return element;
  }

  @logAction('Click on element with selector {selector}')
  protected async click(locator: string, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(locator, timeout);
    await element.click();
  }

  @logAction('Set {text} into element with selector {selector}')
  async setValue(locator: string, value: string | number, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(locator, timeout);
    await element.setValue(value);
  }

  async getText(locator: string, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(locator, timeout);
    return await element.getText();
  }

  @logAction('Select dropdown value from {selector}')
  async selectDropdownValue(dropdownLocator: string, value: string | number, timeout = TIMEOUT_5_SECS) {
    const element = await this.waitForElement(dropdownLocator, timeout);
    await element.selectByVisibleText(value);
  }

  @logAction('Open URL {selector}')
  async openPage(url: string) {
    await browser.url(url);
  }

  async deleteCookies(cookieNames: string[]) {
    await browser.deleteCookies(cookieNames);
  }
}
