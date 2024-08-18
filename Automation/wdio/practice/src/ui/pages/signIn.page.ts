import { SalesPortalPage } from "./salesPortal.page.js";

export interface IUserCredentials {
  username: string;
  password: string;
}

export class SignInPage extends SalesPortalPage {
  uniqueElement = '//form[.//input[@id="emailinput"]]';

  readonly "Email input" = "#emailinput";
  readonly "Password input" = "#passwordinput";
  readonly "Login button" = "button.btn-primary";

  async fillCredentialsInputs(credentials: IUserCredentials) {
    await this.setValue(this["Email input"], credentials.username);
    await this.setValue(this["Password input"], credentials.password);
  }

  async clickSubmitButton() {
    await this.click(this["Login button"]);
  }
}
