import { Observable } from 'rxjs/Rx';

export const CoreApiServiceMock = {
    get: () => {
            return Observable.from([]);
          },
    put: () => {
            return Observable.from([]);
          },
    post: () => {
            return Observable.from([]);
          },
    postBlob: () => {
            return Observable.from([]);
          },
    postWithoutAuth: () => {
            return Observable.from([]);
          },
    delete: () => {
            return Observable.from([]);
          }
}