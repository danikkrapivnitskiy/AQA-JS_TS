import { expect } from "@playwright/test";
import { test } from "../../../fixtures/services.fixture";
import { SignInPage } from "../../pages/login.page";

test.describe("[UI] [Visual] [Login]", async function () {
  test.beforeEach(async function ({ signInPageService }) {
    await signInPageService.openSalesPortal();
  });

  test("Validate login page layout", async function ({ page, signInPageService }) {
    await signInPageService.fillInputs({ username: "user", password: "password" });
    await expect(page).toHaveScreenshot();
  });

  test("Validate login form", async function ({ page }) {
    const signInPage = new SignInPage(page);
    await expect(signInPage["Login form"]).toHaveScreenshot("login-form.png");
  });
});
