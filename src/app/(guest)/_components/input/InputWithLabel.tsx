import InputText from "@/components/input/InputText";
import {BaseInputProps} from "@/components/interface/InterfaceInput";

interface InputWithLabel extends BaseInputProps {
  label?: string;
  htmlfor?: string;
}

const InputWithLabel = ({
  isPassword,
  name,
  placeholder,
  value,
  label,
  htmlfor,
}: InputWithLabel) => {
  return (
    <div className="text-sm flex flex-col gap-y-2 ">
      <label htmlFor={htmlfor}>{label}</label>
      <InputText
        className="w-full"
        name={name}
        placeholder={placeholder}
        value={value}
        isPassword={isPassword}
      />
    </div>
  );
};

export default InputWithLabel;
