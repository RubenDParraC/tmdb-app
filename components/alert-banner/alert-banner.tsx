import { twMerge } from "tailwind-merge";

// external components
import { MdInfo } from "react-icons/md";
import { BiSolidError } from "react-icons/bi";

// types
import type { AlertBannerTypes } from "./types";

function AlertBanner({
  variant = "error",
  title,
  description,
}: AlertBannerTypes) {
  return (
    <div
      className={twMerge(
        "w-full p-4 rounded-lg border-2 flex flex-col gap-4",
        variant === "error"
          ? "bg-red-200 border-red-600"
          : "bg-blue-200 border-blue-600"
      )}
    >
      <div
        className={twMerge(
          "flex flex-row items-center gap-3",
          variant === "error" ? "text-red-600" : "text-blue-600"
        )}
      >
        {variant === "error" && <BiSolidError className="h-5 w-5" />}
        {variant === "info" && <MdInfo className="h-5 w-5" />}
        <span className="font-bold">{title}</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

export default AlertBanner;
