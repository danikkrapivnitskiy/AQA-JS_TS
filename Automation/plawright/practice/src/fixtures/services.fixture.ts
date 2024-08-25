import { AddCustomerService } from "../ui/services/customers/addNewCustomer.service";
import { CustomersListService } from "../ui/services/customers/customers.service";
import { HomeService } from "../ui/services/home.service";
import { SignInService } from "../ui/services/signIn.service";
import { test as base } from "@playwright/test";

interface ISalesPortalServices {
  customersPageService: CustomersListService;
  addNewCustomerPageService: AddCustomerService;
  homePageService: HomeService;
  signInPageService: SignInService;
}

export const test = base.extend<ISalesPortalServices>({
  customersPageService: async ({ page }, use) => {
    await use(new CustomersListService(page));
  },

  homePageService: async ({ page }, use) => {
    await use(new HomeService(page));
  },

  signInPageService: async ({ page }, use) => {
    await use(new SignInService(page));
  },

  addNewCustomerPageService: async ({ page }, use) => {
    await use(new AddCustomerService(page));
  },
});
