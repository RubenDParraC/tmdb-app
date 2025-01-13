// types
import type { Dispatch, SetStateAction } from "react";

export type PaginationTypes = {
  page: number;
  total_pages: number;
  setPage: Dispatch<SetStateAction<number>>;
};
