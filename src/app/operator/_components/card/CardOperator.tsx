import { Tickets } from "lucide-react"; // asumsi kamu pakai lucide untuk ikon
import clsx from "clsx"

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  color: "primary" | "green" | "yellow";
  icon?: React.ReactNode; // opsional, jika ingin menambahkan ikon
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
    bg: "bg-yellow-1/15",
    text: "text-yellow-1/80",
    stroke: "stroke-yellow-1/80",
  },
};

export const StatusCardOpr = ({ title, value, description, color, icon }: StatCardProps) => {
  const colorClasses = colorClassMap[color];
  const iconElement = icon || <Tickets size={22} className={clsx(colorClasses.stroke)} />;
  return (
    <div className={clsx("p-3 space-y-2.5 rounded-md min-w-[150px] w-full max-w-full", colorClasses.bg)}>
      <div className="flex gap-x-1.5 items-center">
        {iconElement  }
        <h3 className={clsx("font-medium text-xs", colorClasses.text)}>{title}</h3>
      </div>

      <div className="px-7">
        <h1 className={clsx("font-semibold text-3xl", colorClasses.text)}>{value}</h1>
        <p className="italic text-xs text-neutral-3">{description}</p>
      </div>
    </div>
  );
};
