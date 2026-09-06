import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';

export type ThemeMode = 'system' | 'light' | 'dark';
export type AccentName = 'azure' | 'violet' | 'emerald' | 'amber';
export type MotionMode = 'full' | 'reduced';

export interface AccentOption {
  value: AccentName;
  swatch: string;
}

export interface ThemeOption {
  value: ThemeMode;
  icon: 'sun' | 'moon' | 'monitor';
}

const STORAGE_KEY = 'portfolio-preferences';

interface StoredPreferences {
  theme: ThemeMode;
  accent: AccentName;
  motion: MotionMode;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly theme = signal<ThemeMode>('system');
  readonly accent = signal<AccentName>('azure');
  readonly motion = signal<MotionMode>('full');

  readonly accentOptions: AccentOption[] = [
    { value: 'azure', swatch: '#4f8dff' },
    { value: 'violet', swatch: '#a78bfa' },
    { value: 'emerald', swatch: '#34d399' },
    { value: 'amber', swatch: '#fbbf24' },
  ];

  readonly themeOptions: ThemeOption[] = [
    { value: 'light', icon: 'sun' },
    { value: 'dark', icon: 'moon' },
    { value: 'system', icon: 'monitor' },
  ];

  constructor() {
    this.restore();

    effect(() => {
      const theme = this.theme();
      const accent = this.accent();
      const motion = this.motion();

      if (!this.isBrowser) return;

      const root = this.document.documentElement;

      if (theme === 'system') {
        root.removeAttribute('data-theme');
      } else {
        root.setAttribute('data-theme', theme);
      }

      root.setAttribute('data-accent', accent);
      root.setAttribute(
        'data-motion',
        motion === 'reduced' ? 'reduced' : 'full',
      );

      this.persist({ theme, accent, motion });
    });
  }

  setTheme(theme: ThemeMode): void {
    this.theme.set(theme);
  }

  setAccent(accent: AccentName): void {
    this.accent.set(accent);
  }

  toggleMotion(): void {
    this.motion.update((mode) => (mode === 'full' ? 'reduced' : 'full'));
  }

  toggleTheme(): void {
    this.theme.update((mode) =>
      this.resolved(mode) === 'dark' ? 'light' : 'dark',
    );
  }

  resolved(mode: ThemeMode = this.theme()): 'light' | 'dark' {
    if (mode !== 'system') return mode;
    if (!this.isBrowser) return 'dark';

    return this.document.defaultView?.matchMedia(
      '(prefers-color-scheme: light)',
    ).matches
      ? 'light'
      : 'dark';
  }

  private restore(): void {
    if (!this.isBrowser) return;

    try {
      const raw = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const stored = JSON.parse(raw) as Partial<StoredPreferences>;

      if (stored.theme) this.theme.set(stored.theme);
      if (stored.accent) this.accent.set(stored.accent);
      if (stored.motion) this.motion.set(stored.motion);
    } catch {
      // Stockage indisponible ou corrompu : on reste sur les valeurs par défaut.
    }
  }

  private persist(preferences: StoredPreferences): void {
    try {
      this.document.defaultView?.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(preferences),
      );
    } catch {
      // Navigation privée ou stockage bloqué : sans conséquence sur l'affichage.
    }
  }
}
