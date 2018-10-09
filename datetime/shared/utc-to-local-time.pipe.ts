import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';

import { MomentFormat } from './moment-format';
import { TimezoneService } from './timezone.service';

import * as moment from 'moment';

@Pipe({
  name: 'utcToLocalTime'
})
export class UtcToLocalTimePipe implements MomentFormat, PipeTransform {

  MOMENT_FORMAT: string = 'h:mm a';

  constructor(public timezoneSvc: TimezoneService) {

  }

  // todo: cache result - http://www.syntaxsuccess.com/viewarticle/caching-with-rxjs-observables-in-angular-2.0
  transform(utcISOString: string, accountId: number): any {
    if(!utcISOString || !accountId) {
      return observableOf(null);
    }
    return this.timezoneSvc.getLocalOffset(accountId, utcISOString)
    .pipe(
      map(result => {
        return result ? result.format(this.MOMENT_FORMAT) : moment.utc(utcISOString).format(this.MOMENT_FORMAT) + ' (UTC)';
      })
    );
  }

}
