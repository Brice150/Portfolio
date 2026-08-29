import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { toSignal } from '@angular/core/rxjs-interop';
import { profile } from '../shared/data/profile';
import { SeoService } from '../core/services/seo.service';
import { ToastService } from '../core/services/toast.service';
import { IconComponent } from '../shared/components/icon/icon.component';
import { PageHeroComponent } from '../shared/components/page-hero/page-hero.component';
import { CopyTextDirective } from '../shared/directives/copy-text.directive';
import { RevealDirective } from '../shared/directives/reveal.directive';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbjbjwpk';
const MESSAGE_MAX_LENGTH = 1500;

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

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

  readonly profile = profile;
  readonly messageMaxLength = MESSAGE_MAX_LENGTH;

  readonly status = signal<FormStatus>('idle');
  readonly errorMessage = signal('');

  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    company: [''],
    subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(90)]],
    message: [
      '',
      [Validators.required, Validators.minLength(20), Validators.maxLength(MESSAGE_MAX_LENGTH)],
    ],
    // Piège à robots : un humain ne remplit jamais ce champ.
    website: [''],
  });

  private readonly messageValue = toSignal(this.form.controls.message.valueChanges, {
    initialValue: '',
  });

  readonly messageLength = computed(() => this.messageValue().length);
  readonly isSending = computed(() => this.status() === 'sending');

  readonly channels = [
    {
      icon: 'phone' as const,
      label: 'Téléphone',
      value: profile.phone,
      href: `tel:${profile.phoneHref}`,
      hint: 'Du lundi au vendredi, 9 h – 19 h',
    },
    {
      icon: 'linkedin' as const,
      label: 'LinkedIn',
      value: 'brice-lecomte',
      href: profile.linkedin,
      hint: 'Parcours détaillé et publications',
    },
    {
      icon: 'github' as const,
      label: 'GitHub',
      value: 'Brice150',
      href: profile.github,
      hint: 'Le code des projets présentés ici',
    },
  ];

  ngOnInit(): void {
    this.seoService.setPage({
      title: 'Contact | Brice Lecomte, développeur Angular & Java',
      description:
        'Contacter Brice Lecomte, développeur Full-Stack Angular et Java : formulaire, e-mail, téléphone ou LinkedIn. Réponse sous 48 heures ouvrées.',
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
    this.errorMessage.set('');

    const { name, email, company, subject, message } = this.form.getRawValue();

    this.http
      .post(FORMSPREE_ENDPOINT, {
        name,
        _replyto: email,
        email,
        company,
        _subject: subject,
        subject,
        message,
      })
      .subscribe({
        next: () => {
          this.status.set('sent');
          this.form.reset();
          this.toastService.success('Message envoyé. Je reviens vers vous sous 48 h.');
        },
        error: (error: HttpErrorResponse) => {
          this.status.set('error');
          this.errorMessage.set(this.describeError(error));
          this.toastService.error('L’envoi a échoué. Le détail est indiqué au-dessus du formulaire.');
        },
      });
  }

  reset(): void {
    this.form.reset();
    this.status.set('idle');
    this.errorMessage.set('');
  }

  /** Traduit l'échec technique en message compréhensible et actionnable. */
  private describeError(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Impossible de joindre le service d’envoi. Vérifiez votre connexion, puis réessayez.';
    }

    if (error.status === 429) {
      return 'Trop de messages envoyés en peu de temps. Patientez quelques minutes avant de réessayer.';
    }

    if (error.status >= 400 && error.status < 500) {
      return 'Le formulaire a été refusé. Vérifiez notamment votre adresse e-mail, puis réessayez.';
    }

    return 'Le service d’envoi est momentanément indisponible. Réessayez plus tard ou écrivez-moi directement par e-mail.';
  }

  private focusFirstInvalidField(): void {
    const invalid = this.document.querySelector<HTMLElement>(
      'form .ng-invalid input, form .ng-invalid textarea',
    );
    invalid?.focus();
  }
}
