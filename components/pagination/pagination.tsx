import { t } from "@/i18n/i18n";

// types
import type { PaginationTypes } from "./types";

// external components
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";

// context
import { useLanguage } from "@/context/language-context/language-context";

function Pagination({ page, setPage, total_pages }: PaginationTypes) {
  const { language } = useLanguage();

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < total_pages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="w-full flex flex-row justify-end text-white gap-3">
      <FaAnglesLeft
        className={`h-5 w-5 cursor-pointer shadow-md rounded-full ${
          page === 1
            ? "text-gray-500 cursor-not-allowed"
            : "hover:shadow-purple-600"
        }`}
        onClick={handlePrevious}
      />
      <span>
        {t("pagination.page", language)} {page} {t("pagination.of", language)}{" "}
        {total_pages}
      </span>
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
