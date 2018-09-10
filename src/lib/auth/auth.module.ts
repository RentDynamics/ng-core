import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';



@NgModule({
  imports: [ 
    CommonModule, 
  ],
  providers: [
      AuthGuard
  ]
})
export class RdAngularAuthModule {}
