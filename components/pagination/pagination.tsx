// Importing the translation function and types
import { t } from "@/i18n/i18n";

// types
import type { PaginationTypes } from "./types";

// external components
// Importing icons for pagination buttons
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

// context
// Importing the language context to get the current language setting
import { useLanguage } from "@/context/language-context/language-context";

function Pagination({ page, setPage, total_pages }: PaginationTypes) {
  const { language } = useLanguage();

  // Function to go to the previous page, ensuring it does not go below 1
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Function to go to the next page, ensuring it does not exceed total pages
  const handleNext = () => {
    if (page < total_pages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="w-full flex flex-row justify-end text-white gap-3">
      {/* Previous Page Button */}
      <FaAnglesLeft
        className={`h-5 w-5 cursor-pointer shadow-md rounded-full ${
          page === 1
            ? "text-gray-500 cursor-not-allowed"
            : "hover:shadow-purple-600"
        }`}
        onClick={handlePrevious}
      />

      {/* Page info */}
      <span>
        {t("pagination.page", language)} {page} {t("pagination.of", language)}{" "}
        {total_pages}
      </span>

      {/* Next Page Button */}
      <FaAnglesRight
        className={`h-5 w-5 cursor-pointer shadow-md rounded-full ${
          page === total_pages
            ? "text-gray-500 cursor-not-allowed"
            : "hover:shadow-purple-600"
        }`}
        onClick={handleNext}
      />
    </div>
  );
}

export default Pagination;
