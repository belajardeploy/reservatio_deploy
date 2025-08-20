import { SvgProps } from "../interface/InterfaceSvg";

const AnnounceSvg = ({
  fill = '',
  stroke = 'none',
  strokeWidth = 1,
  size = 24,
  className = '',
}: SvgProps) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      stroke={stroke}
      strokeWidth={strokeWidth}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 9.16667L17.5 5V15L2.5 11.6667V9.16667Z" stroke="black" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.66628 14.0001C9.57873 14.3175 9.42953 14.6145 9.2272 14.8742C9.02486 15.1339 8.77336 15.3512 8.48705 15.5137C8.20073 15.6762 7.88522 15.7807 7.55851 15.8213C7.2318 15.8619 6.90031 15.8377 6.58294 15.7501C6.26558 15.6626 5.96857 15.5134 5.70887 15.3111C5.44917 15.1087 5.23187 14.8572 5.06936 14.5709C4.90686 14.2846 4.80234 13.9691 4.76178 13.6424C4.72121 13.3157 4.7454 12.9842 4.83294 12.6668" stroke="black" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default AnnounceSvg;