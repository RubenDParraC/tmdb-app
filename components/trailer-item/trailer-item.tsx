import { t } from "@/i18n/i18n";

// external components
import { FaRegCirclePlay } from "react-icons/fa6";

// types
import type { TrailerItemTypes } from "./types";

// context
import { useLanguage } from "@/context/language-context/language-context";

function TrailerItem({
  trailer,
  setIsOpenTrailer,
  setSelectedTrailer,
}: TrailerItemTypes) {
  const { language } = useLanguage();
  return (
    <button
      type="button"
      key={`trailer-${trailer.id}`}
      onClick={async () => {
        await setSelectedTrailer(trailer.key);
        await setIsOpenTrailer(true);
      }}
      className="flex flex-row items-center gap-2"
    >
      <FaRegCirclePlay className="w-5 h-5 text-white" />
      <span className="text-sm text-white font-bold uppercase text-left">
        {t("details.see", language)} "{trailer.name}"
      </span>
    </button>
  );
}

export default TrailerItem;
