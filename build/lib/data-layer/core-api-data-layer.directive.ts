import { Directive, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { CoreApiService } from '../shared/core-api.service';
import { CoreApiSelector } from '../shared/core-api.selector';

@Directive({
  selector: '[rdCoreApiDataLayer]'
})
export class CoreApiDataLayerDirective implements OnInit, OnDestroy {
  @Input() endpoint: string;
  @Input() filters: Object;
  @Input() fields: string[];
  @Input() include: string[];
  @Input() orderBy: string;
  @Input() page: number;
  @Input() pageSize: number;
  @Output() result = new EventEmitter();

  get selector() {
    return new CoreApiSelector({
      endpoint: this.endpoint,
      filters: this.filters,
      fields: this.fields,
      include: this.include,
      orderBy: this.orderBy,
      page: this.page,
      pageSize: this.pageSize
    });
  }
  private subscription = {
    get: null
  };

  constructor(private coreApiSvc: CoreApiService) {

  }

  ngOnInit() {
    if (!this.endpoint)
      throw Error('Please provide a valid endpoint [rdCoreApiDataLayer]');

    this.subscription.get = this.coreApiSvc.get(this.selector.stringify()).subscribe(result => {
      this.result.emit(result);
    });
  }

  ngOnDestroy() {
    for (var key in this.subscription) {
      if (this.subscription[key])
        this.subscription[key].unsubscribe();
    }
  }
}
