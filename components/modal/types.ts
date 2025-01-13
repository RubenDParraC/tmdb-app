// types
import type { ReactNode, SetStateAction } from "react";

// ModalTypes describes the props required by the Modal component.
export type ModalTypes = {
  isOpen: boolean; // Boolean to control whether the modal is open or not
  children: ReactNode; // The content to be displayed inside the modal
  setIsOpen: (value: SetStateAction<boolean>) => void; // Function to set the modal open/close state
  className?: string; // Optional className to apply additional styles to the modal
};
