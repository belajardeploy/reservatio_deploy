// src/components/Modal.tsx
import React, { forwardRef, ReactNode } from "react";
import { CircleCheckBig } from "lucide-react";
import PrimaryButton from "@/components/button/PrimaryButton";

interface SuccessModalProps {
  title: string;
  message: ReactNode;
  icon?: ReactNode;
  onConfirm?: () => void;
  errors?: string | Record<string, string[] | string>;
  outsideClosable?: boolean;
}

const Modal = forwardRef<HTMLDialogElement, SuccessModalProps>(
  (
    { title, message, icon, errors, onConfirm, outsideClosable = true },
    ref
  ) => {
    const renderErrors = (errs: Record<string, string[] | string>) => {
      const items: ReactNode[] = [];
      Object.entries(errs).forEach(([field, errorValue]) => {
        // Handle both string and array error values
        const errorArray = Array.isArray(errorValue)
          ? errorValue
          : [errorValue];
        errorArray.forEach((msg, i) => {
          items.push(
            <li key={`${field}-${i}`} className="text-sm text-red-600">
              {msg}
            </li>
          );
        });
      });
      return <ul className="mt-3 space-y-1">{items}</ul>;
    };
    const IconComponent = icon ?? (
      <CircleCheckBig size={36} className="stroke-green-2" />
    );

    return (
      <dialog className="modal" ref={ref}>
        <div className="modal-box bg-white rounded-xl">
          <div className="flex flex-col gap-y-3 items-center">
            {IconComponent}

            <div className="text-sm text-center mx-auto">
              <h2 className="font-semibold text-lg border-b-2 border-neutral-4 px-6 pb-2 w-fit mx-auto">
                {title}
              </h2>

              <div className="mt-6 text-center">{message}</div>

              {/* Jika errors string */}
              {typeof errors === "string" && (
                <p className="mt-3 text-sm text-red-600 text-center">
                  {errors}
                </p>
              )}

              {/* Jika errors object */}
              {errors && typeof errors === "object" && renderErrors(errors)}
            </div>

            <PrimaryButton
              onClick={onConfirm}
              className="mx-auto w-16 h-full mt-3"
            >
              OK
            </PrimaryButton>
          </div>
        </div>
        {outsideClosable && (
          <form method="dialog" className="modal-backdrop">
            <button />
          </form>
        )}
      </dialog>
    );
  }
);

Modal.displayName = "ModalReservation";
export default Modal;
