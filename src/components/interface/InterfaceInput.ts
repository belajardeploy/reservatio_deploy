export interface BaseInputProps {
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  value?: string;
  isFocused?: boolean;
  errorValue?: string;
  name?: string;
  min?: string;
  max?: string;
  isPassword?: boolean;
  required?: boolean;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
