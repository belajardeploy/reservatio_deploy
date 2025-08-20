import clsx from "clsx"
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
  color: "primary" | "green" | "yellow";
}

const colorClassMap = {
  primary: {
    bg: "bg-primary-1/15",
    text: "text-primary-1",
    stroke: "stroke-primary-1",
  },
  green: {
    bg: "bg-[#1BA794]/15",
    text: "text-[#1BA794]",
    stroke: "stroke-[#1BA794]",
  },
  yellow: {
    bg: "bg-[#FE8630]/15",
    text: "text-[#F97315]",
    stroke: "stroke-yellow-1/80",
  },
};

export const StatusCardAdmin = ({ title, value, color, icon }: StatCardProps) => {
  const colorClasses = colorClassMap[color];

  return (
    <div className={clsx("px-3 pt-3 rounded-md min-w-[150px] w-full max-w-full", colorClasses.bg)}>
      <div className="flex gap-x-1.5 items-center">
        {/* {icon && <span className={clsx(colorClasses.stroke)}>{icon}</span>} */}
        {icon}
        <h3 className={clsx("font-medium text-xs ", colorClasses.text)}>{title}</h3>
      </div>

      <div className="px-7">
        <h1 className={clsx("font-semibold text-[32px]", colorClasses.text)}>{value}</h1>
      </div>
    </div>
  );
};
