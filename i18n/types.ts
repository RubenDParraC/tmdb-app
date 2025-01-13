export type TranslationKeys =
  | "header.home"
  | "header.favorites"
  | "pagination.page"
  | "pagination.of"
  | "search_bar.placeholder"
  | "search_bar.button"
  | "search_bar.banner_title"
  | "search_bar.banner_description"
  | "details.trailers"
  | "details.see"
  | "details.button"
  | "details.button_cast"
  | "error.title"
  | "error.description"
  | "favorites.info_title"
  | "favorites.info_description";

export interface SectionsKeys {
  header: {
    home: string;
    favorites: string;
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

export interface Translations {
  ES: SectionsKeys;
  EN: SectionsKeys;
}
