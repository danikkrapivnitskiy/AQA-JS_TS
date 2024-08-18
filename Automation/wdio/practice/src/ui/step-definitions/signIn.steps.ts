import { When } from "@wdio/cucumber-framework";
import { SignInService } from "../services/signIn.service.js";

const signInUIService = new SignInService();

When(/^I log in as Admin$/, async function () {
  await signInUIService.loginAsAdmin();
});
