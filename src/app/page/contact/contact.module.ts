import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule, FormsModule, HttpClientModule, MatSnackBarModule
  ],
  exports : [ContactComponent]
})
export class ContactModule { }
