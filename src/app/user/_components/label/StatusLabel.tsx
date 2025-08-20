import { CircleCheckBig, ShieldAlert, Hourglass } from "lucide-react";
import React from "react";
import clsx from "clsx"
import { statusresponse } from "@/components/json/user/dashboardresponse";
import dayjs from "dayjs";
import "dayjs/locale/id"; // Import bahasa Indonesia
dayjs.locale("id");
type LabelType = "success" | "error" | "info";

interface StatusLabelProps {
  className?: string;
  data: statusresponse;
}

const labelContent = {
  success: {
    icon: <CircleCheckBig size={16} />,
    title: "Anda telah melakukan reservasi hari ini",
    description: "Tidak dapat melakukan reservasi hingga besok",
    color: {
      bg: "bg-green-2/10",
      text: "text-green-2",
      fill: "fill-green-2"
    }
  },
  error: {
    icon: <ShieldAlert size={16} />,
    title: "Akun Anda telah diblokir sementara!",
    description: "Tidak dapat melakukan reservasi hingga",
    color: {
      bg: "bg-red-2/10",
      text: "text-red-2",
      fill: "fill-red-2"
    }
  },
  info: {
    icon: <Hourglass size={16} />,
    title: "Anda belum melakukan reservasi hari ini!",
    description: "Ayo segera lakukan reservasi sebelum penuh",
    color: {
      bg: "bg-orange-200/50",
      text: "text-orange-500",
      fill: "fill-yellow-2"
    }
  }
};

const getType = (x: any): LabelType => {
  if (x.is_banned == 1) {
    return 'error'
  }
  else if (x.is_reserve == 1) {
    return 'success'
  } else {
    return 'info'
  }
}

const StatusLabel = ({ className, data }: StatusLabelProps) => {
  const type: LabelType = getType(data)

  const content = labelContent[type];

  return (
    <div className={clsx("p-3 rounded-md text-[11px] w-full", content.color.bg, className)}>
      <div className={clsx("flex gap-x-1.5", content.color.text, content.color.fill)}>
        {content.icon}
        <p>{content.title}</p>
      </div>
      {!data.is_banned ? <p className="mt-2 italic text-neutral-3">{content.description}.</p>
        :
        <p className="mt-2 italic text-neutral-3">{content.description} {data.ban_until}.</p>
      }
      {/* {data.is_banned && <p className="mt-2 italic text-neutral-3">{content.description} {data.ban_until}.</p>} */}
    </div>
  );
};

export default StatusLabel;