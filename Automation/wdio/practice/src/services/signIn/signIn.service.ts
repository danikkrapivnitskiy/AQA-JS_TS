import { SignInApiClient } from '../../api/clients/signIn.client.js';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../../config/environment.js';
import { logStep } from '../../utils/report/decorator.js';

class SignInApiService {
  private token: string | null = null;

  constructor(private signInClient = new SignInApiClient()) {}

  @logStep('Sign in as Admin via API')
  async signInAsAdminApi() {
    const resp = await this.signInClient.login({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
    this.setToken(resp.body.token);
    return resp.body.token;
  }

  removeToken() {
    this.token = null;
  }

  getToken() {
    return this.getConvertedToken();
  }

  private setToken(token: string) {
    this.token = token;
  }

  private getConvertedToken() {
    return `Bearer ${this.token}`;
  }
}

export default new SignInApiService();
