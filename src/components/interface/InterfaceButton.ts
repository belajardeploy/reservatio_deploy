export interface BaseButtonProps {
  className?: string,
  children: React.ReactNode,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  disabled?: boolean,
  isLoading?: boolean,
  isActive?: boolean,
  type?: "button" | "submit" | "reset"
}
