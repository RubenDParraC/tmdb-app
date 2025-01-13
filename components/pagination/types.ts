// types
// Importing necessary types for dispatching actions and setting state in React
import type { Dispatch, SetStateAction } from "react";

// Defining the types for pagination component properties
export type PaginationTypes = {
  // Current page number
  page: number;

  // Total number of pages
  total_pages: number;

  // Function to update the current page
  setPage: Dispatch<SetStateAction<number>>;
};
