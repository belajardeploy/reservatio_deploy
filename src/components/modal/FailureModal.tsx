// src/components/FailureModal.tsx
import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import { ReactNode, forwardRef } from "react";
import { BaseModalProps } from "@/components/interface/InterfaceModal";

interface ErrorModalProps extends BaseModalProps {
  title: string;
  message: ReactNode;
  onConfirm?: () => void;
  errors?: string | Record<string, string[]>;
  outsideClosable?: boolean;
}

const FailureModal = forwardRef<HTMLDialogElement, ErrorModalProps>(
  ({ title, message, onConfirm, errors, outsideClosable = true }, ref) => {
    return (
      <Modal
        ref={ref}
        title={title}
        message={message}
        onConfirm={onConfirm}
        errors={errors}
        outsideClosable={outsideClosable}
        icon={<AlertTriangle size={36} className="stroke-red-500" />}
      />
    );
  }
);

FailureModal.displayName = "FailureModal";
export default FailureModal;
