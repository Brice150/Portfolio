import { Lang, Localized, l } from '../../core/i18n/lang';

/** Seules les entrées rédigées en français ; les noms propres passent tels quels. */
const TECH_LABELS: Record<string, Localized> = {
  'IA générative': l('IA générative', 'Generative AI'),
  'Simulation numérique': l('Simulation numérique', 'Numerical simulation'),
  Aérothermique: l('Aérothermique', 'Aerothermal engineering'),
  'Anglais professionnel': l('Anglais professionnel', 'Professional English'),
};

export const techLabel = (name: string, lang: Lang): string =>
  TECH_LABELS[name]?.[lang] ?? name;
