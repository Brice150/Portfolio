import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { SimulatorComponent } from './simulator.component';

@NgModule({
  declarations: [SimulatorComponent],
  imports: [CommonModule, RouterModule, MatExpansionModule],
  exports: [SimulatorComponent],
})
export class SimulatorModule {}
