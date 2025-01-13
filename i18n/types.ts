// Tipo para las claves de traducción. Esto está directamente relacionado con las claves de SectionsKeys
export type TranslationKeys = keyof SectionsKeys extends string
  ? `${keyof SectionsKeys & string}.${string}`
  : never;

// Interfaz que define las secciones y las claves de traducción correspondientes
export interface SectionsKeys {
  header: {
    home: string;
    favorites: string;
  };
  home: {
    seo_title: string;
  };
  pagination: {
    page: string;
    of: string;
  };
  search_bar: {
    placeholder: string;
    button: string;
    banner_title: string;
    banner_description: string;
    seo_title: string;
  };
  details: {
    button: string;
    trailers: string;
    see: string;
    button_cast: string;
  };
  error: {
    title: string;
    description: string;
  };
  favorites: {
    info_title: string;
    info_description: string;
  };
}

// Estructura de traducciones para los idiomas
export interface Translations {
  ES: SectionsKeys;
  EN: SectionsKeys;
}
