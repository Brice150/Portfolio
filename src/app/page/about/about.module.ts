import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { SkillsModule } from './skills.component/skills.module';
import { HistoryModule } from './history.component/history.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule, SkillsModule, HistoryModule
  ],
  exports : [AboutComponent]
})
export class AboutModule { }
