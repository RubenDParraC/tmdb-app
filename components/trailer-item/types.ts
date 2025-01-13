// types
import type { Video } from "@/app/interfaces";
import type { SetStateAction } from "react";

export type TrailerItemTypes = {
  trailer: Video;
  setSelectedTrailer: (value: SetStateAction<string | null>) => void;
  setIsOpenTrailer: (value: SetStateAction<boolean>) => void;
};
