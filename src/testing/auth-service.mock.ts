
import {from as observableFrom, Observable} from 'rxjs';

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
    ssoLogin: (): Observable<any[]> => {
      return observableFrom([]);
    },
    loginCallback: () => {},
    isAuthenticated: () => {},
    forgotPassword: (): Observable<any[]> => {
            return observableFrom([]);
          },
    getHost: () => {},
    errorHandler: () => {}
}