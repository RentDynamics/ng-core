import { Observable } from 'rxjs/Rx';

export const AuthServiceMock = {
    authToken: '',
    secretKey: '',
    userId: '',
    formatPayload: () => {},
    getNonce: () => {},
    getAuthHeaders: () => {},
    getAuthHeadersWithoutAuth: () => {},
    logout: () => {},
    login: () => {},
    ssoLogin: () => {
      return Observable.from([]);
    },
    loginCallback: () => {},
    isAuthenticated: () => {},
    forgotPassword: () => {
            return Observable.from([]);
          },
    getHost: () => {},
    errorHandler: () => {}
}