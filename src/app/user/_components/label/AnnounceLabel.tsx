import clsx from "clsx"

type StatusType = "Informasi" | "Pemberitahuan" | "Pengingat";

interface StatusLabelProps {
  type: StatusType;
  className?: string
}

export const AnnounceLabel: React.FC<StatusLabelProps> = ({ type, className }) => {
  const styles = {
    Informasi: {
      bg: "bg-primary-3/15",
      text: "text-primary-1",
    },
    Pemberitahuan: {
      bg: "bg-red-2/15",
      text: "text-red-2",
    },
    Pengingat: {
      bg: "bg-yellow-1/15",
      text: "text-yellow-1",
    },
  };

  return (
    <p
      className={clsx(
        "text-[10px] py-1 lg:w-[112px] w-[90px] rounded-sm font-semibold text-center",
        className,
        styles[type].bg,
        styles[type].text
      )}
    >
      {type}
    </p>
  );
};
