import { twMerge } from "tailwind-merge";

// external components
import { IoCloseSharp } from "react-icons/io5";
import { Dialog, DialogPanel } from "@headlessui/react";

// types
import type { ModalTypes } from "./types";

function Modal({ isOpen, children, setIsOpen, className }: ModalTypes) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className={twMerge(
              "w-full max-w-[95%] md:max-w-[80%] h-[300px] md:h-[600px] rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 overflow-y-auto hide-scrollbar",
              className
            )}
          >
            <div className="sticky top-0 flex flex-row justify-end mb-2 z-10">
              <IoCloseSharp
                className="h-6 w-6 text-white rounded-full shadow-md hover:shadow-purple-600 cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default Modal;
