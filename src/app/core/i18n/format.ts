export type Params = Record<string, string | number>;

/** Un jeton sans valeur est laissé tel quel, pour que la faute se voie. */
export const format = (template: string, params: Params): string =>
  template.replace(/\{(\w+)\}/g, (token, key: string) =>
    key in params ? String(params[key]) : token,
  );
