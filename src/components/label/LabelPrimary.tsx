import { Label } from "@/components/ui/label";
import { LabelProps } from "../interface/InterfaceLabel";
import clsx from "clsx";

const LabelPrimary = ({ children, className, htmlFor }: LabelProps) => {
  return (
    <Label
      htmlFor={htmlFor} // Tambahan ini
      className={clsx('text-primary-1 text-xs font-normal capitalize', className)}
    >
      {children}
    </Label>
  );
};

export default LabelPrimary;
