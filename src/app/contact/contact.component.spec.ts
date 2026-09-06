import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it } from 'vitest';
import { mount } from '../../testing/mount';
import { ContactComponent } from './contact.component';

const httpProviders = [provideHttpClient(), provideHttpClientTesting()];

const validValues = {
  name: 'Brice',
  email: 'contact@exemple.fr',
  message: 'Un message assez long pour passer la validation.',
};

afterEach(() => TestBed.inject(HttpTestingController).verify());

describe('ContactComponent', () => {
  it('refuse d’envoyer un formulaire invalide', async () => {
    const fixture = await mount(ContactComponent, { providers: httpProviders });

    fixture.componentInstance.submit();

    expect(fixture.componentInstance.status()).toBe('idle');
  });

  it('envoie le message et bascule sur l’état envoyé', async () => {
    const fixture = await mount(ContactComponent, { providers: httpProviders });

    fixture.componentInstance.form.setValue({ ...validValues, website: '' });
    fixture.componentInstance.submit();

    const request = TestBed.inject(HttpTestingController).expectOne(
      (candidate) => candidate.method === 'POST',
    );
    request.flush({ ok: true });

    expect(fixture.componentInstance.status()).toBe('sent');
  });

  it('traduit un refus du service en message d’erreur', async () => {
    const fixture = await mount(ContactComponent, { providers: httpProviders });

    fixture.componentInstance.form.setValue({ ...validValues, website: '' });
    fixture.componentInstance.submit();

    TestBed.inject(HttpTestingController)
      .expectOne((candidate) => candidate.method === 'POST')
      .flush('Trop de requêtes', {
        status: 429,
        statusText: 'Too Many Requests',
      });

    expect(fixture.componentInstance.status()).toBe('error');
    expect(fixture.componentInstance.errorMessage()).toBeTruthy();
  });

  it('fait semblant d’accepter le pot de miel sans rien envoyer', async () => {
    const fixture = await mount(ContactComponent, { providers: httpProviders });

    fixture.componentInstance.form.patchValue({ website: 'robot' });
    fixture.componentInstance.submit();

    expect(fixture.componentInstance.status()).toBe('sent');
  });
});
