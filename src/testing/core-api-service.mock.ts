
import { from as observableFrom, Observable } from 'rxjs';

export const CoreApiServiceMock = {
  get: (): Observable<any[]> => {
    return observableFrom([]);
  },
  put: (): Observable<any[]> => {
    return observableFrom([]);
  },
  post: (): Observable<any[]> => {
    return observableFrom([]);
  },
  postBlob: (): Observable<any[]> => {
    return observableFrom([]);
  },
  postWithoutAuth: (): Observable<any[]> => {
    return observableFrom([]);
  },
  delete: (): Observable<any[]> => {
    return observableFrom([]);
  }
}