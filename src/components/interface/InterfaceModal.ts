import { ReactNode } from "react";

export interface BaseModalProps {
  title: string;
  message: ReactNode;
  icon?: ReactNode;
  onConfirm?: () => void;
  outsideClosable?: boolean;
}