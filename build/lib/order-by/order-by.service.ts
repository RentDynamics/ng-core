import { Injectable } from '@angular/core';

import { ImmutableService } from '../shared/immutable.service';

@Injectable()
export class OrderByService {

  constructor(private immutable: ImmutableService) { }

  sort(array: any[], orderByField: string) {

    let isDescending: boolean = orderByField.substr(0, 1) == '-';

    let sortByProperty: string = orderByField.substr(0, 1) == '+' || orderByField.substr(0, 1) == '-'
      ? orderByField.substr(1)
      : orderByField;

    let result = this.immutable.sort(array, (left, right) => {
      return !isDescending
        ? this.orderByComparator(left[sortByProperty], right[sortByProperty])
        : -this.orderByComparator(left[sortByProperty], right[sortByProperty]);
    });

    return result;
  }

  orderByComparator(left, right) {
    if (left < right)
      return -1;
    if (left == right)
      return 0;
    else
      return 1;
  }

  timer(name) {
    var start = new Date();
    return {
      stop: function () {
        var end = new Date();
        var time = end.getTime() - start.getTime();
        console.log('Timer:', name, 'finished in', time, 'ms');
      }
    }
  }
}
