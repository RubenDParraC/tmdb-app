// types
import type { SectionsKeys, TranslationKeys, Translations } from "./types";
import type { Language } from "@/context/language-context/types";

export const translations: Translations = {
  ES: {
    header: {
      home: "Inicio",
      favorites: "Favoritos",
    },
    pagination: {
      page: "Página",
      of: "de",
    },
    home: {
      seo_title: "Peliculas populares",
    },
    search_bar: {
      seo_title: "Buscar resultados",
      placeholder: "Buscar peliculas...",
      button: "Buscar",
      banner_title: "No hay resultados de la búsqueda",
      banner_description:
        "No fue posible encontrar resultados con el titulo que ingresaste, intenta con otro titulo.",
    },
    details: {
      button: "Reproducir ahora",
      trailers: "Tráilers",
      see: "Ver",
      button_cast: "Ver reparto",
    },
    error: {
      title: "¡Ups!, parece que ocurrió un error al obtener la información.",
      description: "Recarga para intentar nuevamente.",
    },
    favorites: {
      info_title: "Tus favoritos",
      info_description: "No tienes ninguna pelicula marcada como favorita.",
    },
  },
  EN: {
    header: {
      home: "Home",
      favorites: "Favorites",
    },
    pagination: {
      page: "Page",
      of: "of",
    },
    home: {
      seo_title: "Popular Movies",
    },
    search_bar: {
      seo_title: "Search Results",
      placeholder: "Search for movies...",
      button: "Search",
      banner_title: "No search results",
      banner_description:
        "It was not possible to find results with the title you entered; try another title.",
    },
    details: {
      button: "Play now",
      trailers: "Trailers",
      see: "See",
      button_cast: "See cast",
    },
    error: {
      title:
        "Oops! It looks like an error occurred while retrieving the information.",
      description: "Reload to try again.",
    },
    favorites: {
      info_title: "Your favorites",
      info_description: "You don't have any movie marked as a favorite.",
    },
  },
};

export const t = (key: TranslationKeys, language: Language) => {
  const keys = key.split(".");
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let result: any = translations[language];

  for (let i = 0; i < keys.length; i++) {
    result = result[keys[i]];
    if (!result) return "";
  }

  return result;
};
