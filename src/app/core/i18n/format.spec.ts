import { describe, expect, it } from 'vitest';
import { format } from './format';

describe('format', () => {
  it('remplace les jetons connus', () => {
    expect(format('Bonjour {name}', { name: 'Brice' })).toBe('Bonjour Brice');
  });

  it('laisse en place un jeton sans valeur, pour que la faute se voie', () => {
    expect(format('Bonjour {name}', {})).toBe('Bonjour {name}');
  });

  it('accepte une valeur numérique', () => {
    expect(format('{count} outils', { count: 21 })).toBe('21 outils');
  });
});
