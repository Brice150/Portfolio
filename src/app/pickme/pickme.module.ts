import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickmeComponent } from './pickme.component';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [PickmeComponent],
  imports: [
    CommonModule, RouterModule, MatExpansionModule
  ],
  exports: [PickmeComponent]
})
export class PickmeModule { }
