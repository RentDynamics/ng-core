import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MomentFormat } from './moment-format';
import { TimezoneService } from './timezone.service';

declare var moment;

@Pipe({
  name: 'utcToLocalTime'
})
export class UtcToLocalTimePipe implements MomentFormat, PipeTransform {

  MOMENT_FORMAT: string = 'h:mm a';

  constructor(public timezoneSvc: TimezoneService) {

  }

  // todo: cache result - http://www.syntaxsuccess.com/viewarticle/caching-with-rxjs-observables-in-angular-2.0
  transform(utcISOString: string, accountId: number): any {
    if(!utcISOString || !accountId)
      return Observable.of(null);
    return this.timezoneSvc.getLocalOffset(accountId, utcISOString)
      .map(result => {
        return result ? result.format(this.MOMENT_FORMAT) : moment.utc(utcISOString).format(this.MOMENT_FORMAT) + ' (UTC)';
      });
  }

}
