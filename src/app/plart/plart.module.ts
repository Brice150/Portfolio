import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlartComponent } from './plart.component';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [PlartComponent],
  imports: [CommonModule, RouterModule, MatExpansionModule],
  exports: [PlartComponent],
})
export class PlartModule {}
