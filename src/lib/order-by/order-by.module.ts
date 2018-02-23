import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImmutableService } from '../shared/immutable.service';

import { OrderByPipe } from './order-by.pipe';
import { OrderByObjectPipe } from './order-by-object.pipe';
import { OrderByService } from './order-by.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    OrderByPipe,
    OrderByObjectPipe,
  ],
  exports: [
    OrderByPipe,
    OrderByObjectPipe,
  ],
  providers: [
    ImmutableService,
    OrderByService,
  ]
})
export class OrderByModule { }
