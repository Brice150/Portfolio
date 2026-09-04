import { describe, expect, it } from 'vitest';
import { format } from './format';

describe('format', () => {
  it('remplace les jetons connus', () => {
    expect(format('Bonjour {name}', { name: 'Brice' })).toBe('Bonjour Brice');
  });
});
