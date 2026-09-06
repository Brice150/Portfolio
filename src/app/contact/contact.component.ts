import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { profile } from '../shared/data/profile';
import { IconName } from '../core/interfaces/icon';
import { fromDictionary } from '../core/i18n/localize';
import { LanguageService } from '../core/services/language.service';
import { SeoService } from '../core/services/seo.service';
import { ToastService } from '../core/services/toast.service';
import { IconComponent } from '../shared/components/icon/icon.component';
import { PageHeroComponent } from '../shared/components/page-hero/page-hero.component';
import { CopyTextDirective } from '../shared/directives/copy-text.directive';
import { RevealDirective } from '../shared/directives/reveal.directive';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbjbjwpk';
const MESSAGE_MAX_LENGTH = 1500;

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

interface ContactChannel {
  icon: IconName;
  label: string;
  value: string;
  href: string;
  hint: string;
}

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    PageHeroComponent,
    IconComponent,
    RevealDirective,
    CopyTextDirective,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly formBuilder = inject(FormBuilder);
  private readonly toastService = inject(ToastService);
  private readonly seoService = inject(SeoService);
  private readonly document = inject(DOCUMENT);
  private readonly languageService = inject(LanguageService);

  readonly t = this.languageService.t;
  readonly format = this.languageService.format;

  readonly profile = profile;
  readonly messageMaxLength = MESSAGE_MAX_LENGTH;

  readonly status = signal<FormStatus>('idle');

  private readonly errorStatus = signal<number | null>(null);

  readonly errorMessage = computed(() => {
    const status = this.errorStatus();
    const contact = this.t().contact;

    if (status === null) return '';
    if (status === 0) return contact.errorOffline;
    if (status === 429) return contact.errorRateLimited;
    if (status >= 400 && status < 500) return contact.errorRejected;

    return contact.errorUnavailable;
  });

  readonly form = this.formBuilder.nonNullable.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(60)],
    ],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(120)],
    ],
    message: [
      '',
      [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(MESSAGE_MAX_LENGTH),
      ],
    ],
    website: [''],
  });

  readonly isSending = computed(() => this.status() === 'sending');

  readonly channels = computed<ContactChannel[]>(() => {
    const contact = this.t().contact;

    return [
      {
        icon: 'linkedin',
        label: 'LinkedIn',
        value: 'brice-lecomte',
        href: profile.linkedin,
        hint: contact.linkedinHint,
      },
      {
        icon: 'github',
        label: 'GitHub',
        value: 'Brice150',
        href: profile.github,
        hint: contact.githubHint,
      },
    ];
  });

  ngOnInit(): void {
    this.seoService.setPage({
      title: fromDictionary((dictionary) => dictionary.seo.contactTitle),
      description: fromDictionary(
        (dictionary) => dictionary.seo.contactDescription,
      ),
      path: '/contact',
    });
  }

  submit(): void {
    if (this.isSending()) return;

    // Robot détecté : on simule un succès sans rien envoyer.
    if (this.form.controls.website.value) {
      this.status.set('sent');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.focusFirstInvalidField();
      return;
    }

    this.status.set('sending');
    this.errorStatus.set(null);

    const { name, email, message } = this.form.getRawValue();

    this.http
      .post(FORMSPREE_ENDPOINT, {
        name,
        _replyto: email,
        email,
        _subject: this.format(this.t().contact.subject, { name }),
        message,
      })
      .subscribe({
        next: () => {
          this.status.set('sent');
          this.form.reset();
          this.toastService.success(this.t().toast.messageSent);
        },
        error: (error: HttpErrorResponse) => {
          this.status.set('error');
          this.errorStatus.set(error.status);
          this.toastService.error(this.t().toast.messageFailed);
        },
      });
  }

  reset(): void {
    this.form.reset();
    this.status.set('idle');
    this.errorStatus.set(null);
  }

  private focusFirstInvalidField(): void {
    const invalid = this.document.querySelector<HTMLElement>(
      'form .ng-invalid input, form .ng-invalid textarea',
    );
    invalid?.focus();
  }
}
