import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login.routing';

// import { SharedModule } from '../shared/shared.module';
import {LoginComponent} from './login.component';

@NgModule({
  imports: [ 
    CommonModule, 
    LoginRoutingModule,
    FormsModule 
  ],
  declarations: [
    LoginComponent
  ]
})
export class RdAngularLoginModule {}
