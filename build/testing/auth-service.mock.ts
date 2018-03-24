import { Observable } from 'rxjs/Rx';

export const AuthServiceMock = {
    forgotPassword: () => {
            return Observable.from([]);
          },
    ssoLogin: () => {
            return Observable.from([]);
          }
}