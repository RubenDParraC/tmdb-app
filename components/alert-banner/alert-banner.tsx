import { twMerge } from "tailwind-merge";

// External components
import { MdInfo } from "react-icons/md";
import { BiSolidError } from "react-icons/bi";

// Types
import type { AlertBannerTypes } from "./types";

function AlertBanner({
  variant = "error", // Default to "error" variant
  title,
  description,
}: AlertBannerTypes) {
  return (
    <div
      className={twMerge(
        "w-full p-4 rounded-lg border-2 flex flex-col gap-4",
        variant === "error" // If variant is error, apply red styles
          ? "bg-red-200 border-red-600"
          : "bg-blue-200 border-blue-600" // If not, apply blue styles
      )}
    >
      <div
        className={twMerge(
          "flex flex-row items-center gap-3",
          variant === "error" ? "text-red-600" : "text-blue-600" // Color based on variant
        )}
      >
        {variant === "error" && <BiSolidError className="h-5 w-5" />}{" "}
        {/* Error icon */}
        {variant === "info" && <MdInfo className="h-5 w-5" />} {/* Info icon */}
        <span className="font-bold">{title}</span> {/* Title text */}
      </div>
      <p className="text-sm text-gray-600">{description}</p>{" "}
      {/* Description text */}
    </div>
  );
}

export default AlertBanner;
