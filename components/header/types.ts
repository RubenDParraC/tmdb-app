// types
import type { TranslationKeys } from "../../i18n/types";

// Defines the structure of an item in the button list
export type ButtonListItem = {
  href: string; // URL the button will link to
  key: TranslationKeys; // Translation key for the button's label
};
