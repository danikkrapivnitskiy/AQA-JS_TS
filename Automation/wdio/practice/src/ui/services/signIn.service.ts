import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../config/environment.js';
import { IUserCredentials } from '../../data/types/user.types.js';
import { logStep } from '../../utils/report/decorator.js';
import { HomePage } from '../pages/home.page.js';
import { SignInPage } from '../pages/login.page.js';

export class SignInService {
  constructor(
    private signInPage = new SignInPage(),
    private homePage = new HomePage()
  ) {}

  @logStep('Open sales portal')
  async openSalesPortal() {
    await this.signInPage.openPage('https://anatoly-karpovich.github.io/aqa-course-project');
  }

  @logStep('Login')
  async login(credentials: IUserCredentials) {
    await this.signInPage.fillCredentialsInputs(credentials);
    await this.signInPage.clickSubmitButton();
    await this.signInPage.waitForSpinnerToHide();
    await this.homePage.waitForOpened();
  }

  @logStep('Login as Admin')
  async loginAsAdmin() {
    await this.login({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
  }

  @logStep('Sign Out')
  async signOut() {
    await this.signInPage.deleteCookies(['Authorization']);
  }
}
