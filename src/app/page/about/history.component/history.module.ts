import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './history.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [HistoryComponent],
  imports: [CommonModule, MatStepperModule, MatIconModule],
  exports: [HistoryComponent],
})
export class HistoryModule {}
