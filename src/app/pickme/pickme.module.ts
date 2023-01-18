import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickmeComponent } from './pickme.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PickmeComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [PickmeComponent]
})
export class PickmeModule { }
