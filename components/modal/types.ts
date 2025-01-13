// types
import type { ReactNode, SetStateAction } from "react";

export type ModalTypes = {
  isOpen: boolean;
  children: ReactNode;
  setIsOpen: (value: SetStateAction<boolean>) => void;
  className?: string;
};
