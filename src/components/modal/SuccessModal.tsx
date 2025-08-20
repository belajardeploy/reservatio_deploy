// src/components/SuccessModal.tsx
import React, { forwardRef } from "react";
import { CircleCheckBig } from "lucide-react";
import Modal from "./Modal";
import { BaseModalProps } from "@/components/interface/InterfaceModal";

const SuccessModal = forwardRef<HTMLDialogElement, BaseModalProps>(
  ({ title, message, icon, onConfirm, outsideClosable = true }, ref) => {
    // Use default icon if none provided
    const IconComponent = icon ?? (
      <CircleCheckBig size={36} className="stroke-green-2" />
    );

    return (
      <Modal
        ref={ref}
        title={title}
        message={message}
        onConfirm={onConfirm}
        outsideClosable={outsideClosable}
        icon={IconComponent}
      />
    );
  }
);

SuccessModal.displayName = "SuccessModal";
export default SuccessModal;
