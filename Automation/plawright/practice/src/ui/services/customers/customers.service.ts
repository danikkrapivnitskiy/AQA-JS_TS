import _ from "lodash";
import { AddNewCustomerPage } from "../../pages/customers/addNewCustomer.page.js";
import { CustomersListPage } from "../../pages/customers/customers.page.js";
import { expect, Page } from "@playwright/test";
import { TABLE_MESSAGES } from "../../../data/customers/customersList.js";
import { logStep } from "../../../utils/report/logStep.js";

export class CustomersListService {
  private customersPage: CustomersListPage;
  private addNewCustomerPage: AddNewCustomerPage;
  constructor(protected page: Page) {
    this.customersPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }

  @logStep()
  async openAddNewCustomerPage() {
    await this.customersPage.clickOnAddNewCustomer();
    await this.customersPage.waitForSpinnerToHide();
    await this.addNewCustomerPage.waitForOpened();
  }

  @logStep()
  async validateEmptyTable(message?: string) {
    const actualMessage = await this.customersPage.getEmptyTableMessage();
    expect(actualMessage).toEqual(message ?? TABLE_MESSAGES.EMPTY_TABLE);
  }
}
