import { useState } from "react";
// import input from "../interface/Input";
import { Eye, EyeOff, Search } from "lucide-react";
import { BaseInputProps } from "@/components/interface/InterfaceInput";

const InputSearch = ({
  value,
  onChange,
  name,
  placeholder,
  type,
  isPassword,
  className,
  disabled,
}: BaseInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className="font-normal relative flex w-full max-w-[300px]">
      <input
        className={
          "border-neutral-4 p-2.5 py-2 pr-12 border-2 rounded-lg focus:ring-2 focus:border-primary-2/50 focus:outline-none focus:ring-primary-2/50 duration-200 ease-in-out w-full " + // Added w-full here and pr-12
          className +
          (disabled ? " bg-neutral-4 text-neutral-2 " : "")
        }
        placeholder={placeholder}
        name={name}
        value={value}
        type={isPassword ? (isPasswordVisible ? "text" : "password") : type}
        onChange={onChange}
        disabled={disabled}
      />

      {isPassword && (
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500" // Adjusted vertical centering
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}{" "}
          {/* Adjusted size for consistency if needed */}
        </span>
      )}
      {/* Search Icon */}
      <Search
        className="size-8 p-2 bg-primary-1 rounded-md stroke-white absolute right-2 top-1/2 -translate-y-1/2" // Adjusted positioning
        strokeWidth={2}
      />
    </div>
  );
};

export default InputSearch;
