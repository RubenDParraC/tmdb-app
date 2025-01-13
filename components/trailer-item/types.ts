// Importing the VideoInterface type from the application's interfaces
import type { VideoInterface } from "@/app/interfaces";

// Importing SetStateAction type for setting state with React
import type { SetStateAction } from "react";

// TrailerItemTypes defines the types for the props used in the TrailerItem component
export type TrailerItemTypes = {
  // The trailer object contains the details of the video trailer, including its ID, key, name, etc.
  trailer: VideoInterface;

  // setSelectedTrailer is a function that sets the selected trailer's key or null (for resetting)
  // It's used to store the trailer's unique identifier
  setSelectedTrailer: (value: SetStateAction<string | null>) => void;

  // setIsOpenTrailer is a function that controls the state of the trailer modal (whether it's open or not)
  setIsOpenTrailer: (value: SetStateAction<boolean>) => void;
};
