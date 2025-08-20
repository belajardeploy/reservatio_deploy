import { useState } from "react";
// import input from "../interface/Input";
import { BaseInputProps } from "@/components/interface/InterfaceInput";
import { Eye, EyeOff } from "lucide-react";

const InputText = ({ value, onChange, name, placeholder, type, isPassword, className, disabled }: BaseInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className="font-normal relative flex w-full">
      <input
        className={"border-neutral-4 p-4 py-3 border-2 rounded-lg focus:ring-2 focus:border-primary-2/50 focus:outline-none focus:ring-primary-2/50 duration-200 ease-in-out " + className + (disabled ? ' bg-neutral-4 text-neutral-2 ' : '')}
        placeholder={placeholder}
        name={name}
        value={value}
        type={isPassword ? (isPasswordVisible ? "text" : "password") : type}
        onChange={onChange}
        disabled={disabled}
      />

      {isPassword && (
        <span
          className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <Eye size={24}/>
          ) : (
            <EyeOff size={24} />
          )}
        </span>
      )}
    </div>
  )
}

export default InputText;