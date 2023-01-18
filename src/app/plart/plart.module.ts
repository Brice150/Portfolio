import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlartComponent } from './plart.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PlartComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [PlartComponent]
})
export class PlartModule { }
