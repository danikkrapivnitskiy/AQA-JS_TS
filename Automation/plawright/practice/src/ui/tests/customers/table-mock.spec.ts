import { test as servicesTest } from "../../../fixtures/services.fixture";
import { test as mockTest } from "../../../fixtures/mock.fixture";
import { mergeTests } from "@playwright/test";
import { apiConfig } from "../../../config/apiConfig";
import { STATUS_CODES } from "../../../data/types/api.types";
import { EMPTY_TABLE_MOCK } from "../../../data/customers/mocks";

const test = mergeTests(mockTest, servicesTest);

test.describe("[UI] [Customers] Smoke", async function () {
  test.beforeEach(async function ({ signInPageService }) {
    await signInPageService.openSalesPortal();
    await signInPageService.loginAsAdmin();
  });

  test("Create customer with valid data", async function ({ homePageService, customersPageService, mock }) {
    const getCustomersUrl = apiConfig.baseUrl + apiConfig.endpoints.Customers;
    await mock.modifyReponse(getCustomersUrl, EMPTY_TABLE_MOCK, STATUS_CODES.OK);
    await homePageService.openCustomersPage();
    await customersPageService.validateEmptyTable();
  });
});
