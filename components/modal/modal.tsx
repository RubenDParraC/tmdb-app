// Import required modules
import { twMerge } from "tailwind-merge";

// external components
import { IoCloseSharp } from "react-icons/io5";
import { Dialog, DialogPanel } from "@headlessui/react";

// types
import type { ModalTypes } from "./types";

// Modal component that accepts the state, children, and other props to render a modal
function Modal({ isOpen, children, setIsOpen, className }: ModalTypes) {
  return (
    <Dialog
      open={isOpen} // The modal's visibility state
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsOpen(false)} // Close modal when clicking outside
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className={twMerge(
              "w-full max-w-[95%] md:max-w-[80%] h-[300px] md:h-[600px] rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 overflow-y-auto hide-scrollbar", // Styling for the modal panel
              className // Any additional custom classes
            )}
          >
            <div className="sticky top-0 flex flex-row justify-end mb-2 z-10">
              <IoCloseSharp
                className="h-6 w-6 text-white rounded-full shadow-md hover:shadow-purple-600 cursor-pointer"
                onClick={() => setIsOpen(false)} // Close the modal when clicking the close button
              />
            </div>
            {children} {/* The content inside the modal */}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default Modal;
