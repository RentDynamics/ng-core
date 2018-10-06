
import {of as observableOf,  Observable } from 'rxjs';

import {catchError, map, refCount, publishReplay} from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { CoreApiService } from '@rd/core';
import { MomentFormat } from './shared/moment-format';

import * as moment from 'moment';
import 'moment-timezone';
import { HttpRequestCache } from './shared/timezone.service';

@Injectable()
export class CommunityGroupTimezoneService implements MomentFormat {

  MOMENT_FORMAT: string = 'MM/DD/YYYY hh:mm a';

  private communityGroupTimezone: HttpRequestCache = {};

  constructor(private coreApiSvc: CoreApiService) { }

  getTimezoneNoCache(id: number) {
    return this.coreApiSvc.get(`/communityGroups/${id}?include=client,time_zone_type`).pipe(
      catchError(r => {
        console.log(r);
        return observableOf(null);
      }));
  }

  getTimezone(id: number) {
    if (!this.communityGroupTimezone[id]){
      this.communityGroupTimezone[id] = this.coreApiSvc
        .get(`/communityGroups/${id}?include=client,time_zone_type`).pipe(
        catchError(r => {
          console.log(r);
          return observableOf(null);
        }),
        publishReplay(1),
        refCount());
      }
    return this.communityGroupTimezone[id];
  }

  getLocalOffset(id: number, utcDatetime: string) {
    return this.getTimezone(id).pipe(map(result => {
      if (!result){
        return;
      }
      let timezone = result.timeZoneType;
      let ianaName = timezone.ianaName;
      let localMomentTz = moment.tz(utcDatetime, [this.MOMENT_FORMAT, moment.ISO_8601], ianaName);
      return localMomentTz;
    }));
  }

  getUtcOffset(id: number, datetime: string) {
    return this.getTimezone(id).pipe(map(result => {
      if (!result) {
        return;
      }
      let timezone = result.timeZoneType;
      let ianaName = timezone.ianaName;
      let utcMomentTz = moment.tz(datetime, [this.MOMENT_FORMAT, moment.ISO_8601], ianaName);
      return utcMomentTz.utc();
    }));
  }
}
