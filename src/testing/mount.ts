import {
  EnvironmentProviders,
  Provider,
  Type,
  provideZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes, provideRouter } from '@angular/router';

interface MountOptions {
  /** Entrées signal du composant, posées avant le premier rendu. */
  inputs?: Record<string, unknown>;
  providers?: (Provider | EnvironmentProviders)[];
  routes?: Routes;
}

/**
 * Monte un composant autonome avec le strict nécessaire : détection zoneless et
 * routeur, que la moitié des composants réclame via `routerLink`.
 */
export const mount = async <T>(
  component: Type<T>,
  options: MountOptions = {},
): Promise<ComponentFixture<T>> => {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [
      provideZonelessChangeDetection(),
      provideRouter(options.routes ?? []),
      ...(options.providers ?? []),
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);

  for (const [name, value] of Object.entries(options.inputs ?? {})) {
    fixture.componentRef.setInput(name, value);
  }

  fixture.detectChanges();

  return fixture;
};

/** Texte rendu, espaces normalisés : les gabarits sont indentés. */
export const textOf = (fixture: ComponentFixture<unknown>): string =>
  (fixture.nativeElement as HTMLElement).textContent?.replace(/\s+/g, ' ').trim() ?? '';
