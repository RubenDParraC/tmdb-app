import { t } from "@/i18n/i18n";

// types
import type { SearchBarTypes } from "./types";

// context
import { useLanguage } from "@/context/language-context/language-context";

function SearchBar({
  searchQuery,
  handleSearchChange,
  handleSearchClick,
}: SearchBarTypes) {
  const { language } = useLanguage();
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-5">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder={t("search_bar.placeholder", language)}
        className="p-3 w-full border-2 border-purple-600 rounded-2xl bg-slate-600 text-white"
      />
      <button
        type="button"
        onClick={handleSearchClick}
        className="w-full md:w-min p-3 px-10 bg-purple-600 text-white rounded-md"
      >
        {t("search_bar.button", language)}
      </button>
    </div>
  );
}

export default SearchBar;
