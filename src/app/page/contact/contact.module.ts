import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    HttpClientModule, 
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  exports : [ContactComponent]
})
export class ContactModule { }
