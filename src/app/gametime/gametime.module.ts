import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { GametimeComponent } from './gametime.component';

@NgModule({
  declarations: [GametimeComponent],
  imports: [
    CommonModule, RouterModule, MatExpansionModule
  ],
  exports: [GametimeComponent]
})
export class GametimeModule { }
