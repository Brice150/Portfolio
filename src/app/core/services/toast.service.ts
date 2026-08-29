import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { IconName } from '../interfaces/icon';

export type ToastTone = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
  icon: IconName;
}

const ICONS: Record<ToastTone, IconName> = {
  success: 'check',
  error: 'alert',
  info: 'info',
};

/** Durée d'affichage avant disparition automatique, en millisecondes. */
const DURATION = 4000;

/** Nombre maximum de messages empilés, pour ne pas noyer l'écran. */
const MAX_STACK = 3;

/**
 * File de notifications éphémères. Écrite à la main plutôt que d'embarquer
 * `MatSnackBar` : le composant hôte est monté dans la coquille applicative,
 * donc son poids compterait dans le bundle initial.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly platformId = inject(PLATFORM_ID);
  private nextId = 0;

  readonly toasts = signal<Toast[]>([]);

  show(message: string, tone: ToastTone = 'info'): void {
    // Aucun message au prerendering : ils n'auraient aucun sens dans le HTML.
    if (!isPlatformBrowser(this.platformId)) return;

    const id = ++this.nextId;

    this.toasts.update((list) => [...list, { id, message, tone, icon: ICONS[tone] }].slice(-MAX_STACK));

    setTimeout(() => this.dismiss(id), DURATION);
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  dismiss(id: number): void {
    this.toasts.update((list) => list.filter((toast) => toast.id !== id));
  }
}
