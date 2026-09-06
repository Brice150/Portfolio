import { Title } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { mount } from '../../testing/mount';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  it('assemble les sections de la page d’accueil', async () => {
    const fixture = await mount(HomeComponent);
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('app-hero')).toBeTruthy();
    expect(host.querySelector('app-highlight-grid')).toBeTruthy();
    expect(host.querySelector('app-profile-intro')).toBeTruthy();
  });

  it('renseigne le titre de la page et limite le bandeau technique', async () => {
    const fixture = await mount(HomeComponent);

    expect(TestBed.inject(Title).getTitle()).toBeTruthy();
    expect(fixture.componentInstance.technologies().length).toBeLessThanOrEqual(
      14,
    );
  });
});
