export interface ImageProps {
  className?: string,
  photoclassName?: string
  src: string,
  alt: string,
  width: number,
  height: number,
  props?: string,
  loader?: 'be' | string
}