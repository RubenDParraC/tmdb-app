// Importing the translation function and types
import { t } from "@/i18n/i18n";

// external components
import { FaRegCirclePlay } from "react-icons/fa6";

// types
import type { TrailerItemTypes } from "./types";

// context
import { useLanguage } from "@/context/language-context/language-context";

// TrailerItem component renders a button that opens the selected trailer when clicked
// It accepts trailer data, setIsOpenTrailer to control the modal state, and setSelectedTrailer to set the trailer key
function TrailerItem({
  trailer,
  setIsOpenTrailer,
  setSelectedTrailer,
}: TrailerItemTypes) {
  const { language } = useLanguage();
  return (
    // Button that triggers the trailer modal
    <button
      type="button"
      key={`trailer-${trailer.id}`} // Using the trailer ID as the key for the button
      onClick={async () => {
        try {
          // Setting the selected trailer key and opening the modal
          await setSelectedTrailer(trailer.key);
          await setIsOpenTrailer(true);
        } catch (error) {
          // Handling any errors that might occur during the async operations
          console.error("Failed to set trailer:", error);
        }
      }}
      className="flex flex-row items-center gap-2"
    >
      <FaRegCirclePlay className="w-5 h-5 text-white" /> {/* Play icon */}
      <span className="text-sm text-white font-bold uppercase text-left">
        {/* Translating the button text dynamically based on the language */}
        {t("details.see", language)} &quot;{trailer.name}&quot;
      </span>
    </button>
  );
}

export default TrailerItem;
