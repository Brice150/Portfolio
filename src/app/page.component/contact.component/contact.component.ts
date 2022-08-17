import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class AppComponentContact {
  constructor(private http: HttpClient) {}

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/f/mbjbjwpk',
        { name: email.name, replyto: email.email, subject: email.subject, message: email.message },
        { 'headers': headers }).subscribe(
          (response: any) => {
            console.log(response);
            contactForm.reset();
          }
        );
    }
  }
}
