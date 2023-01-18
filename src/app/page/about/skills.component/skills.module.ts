import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [SkillsComponent],
  imports: [
    CommonModule, MatExpansionModule
  ],
  exports: [SkillsComponent]
})
export class SkillsModule { }
