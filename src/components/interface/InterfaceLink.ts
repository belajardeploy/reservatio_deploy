export interface LinkProps {
  children: React.ReactNode,
  href: string,
  className?: string,
  onClick?: (val: any) => void,
  statichref?: string,
  whenactive?: string,
  whennotactive?: string,
  getActive?: (value: boolean) => void,
  showline?: boolean
}