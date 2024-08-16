import { apiConfig } from '../../config/apiConfig.js';
import { IRequestOptions } from '../../data/types/api.types.js';
import { ILoginResponse, IUserCredentials } from '../../data/types/user.types.js';
import { AxiosApiClient } from '../../utils/apiClients/axios.js';
import { logStep } from '../../utils/report/decorator.js';

export class SignInApiClient {
  constructor(private apiClient = new AxiosApiClient()) {}

  @logStep('Sign in via API')
  async login(credentials: IUserCredentials) {
    const options: IRequestOptions = {
      method: 'post',
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.Login,
      headers: { 'Content-Type': 'application/json' },
      data: credentials
    };
    return this.apiClient.send<ILoginResponse>(options);
  }
}
export default new SignInApiClient();
