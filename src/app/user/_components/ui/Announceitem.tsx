import React from "react";
import { pengumumanUserresponse } from "@/components/json/global/pengumumanresponse";
import AnnouncementContent from "@/components/ui/AnnouncementContent";

import clsx from "clsx"
import { AnnounceLabel } from "@/app/user/_components/label/AnnounceLabel";

interface AnnouncementItemProps {
  data: pengumumanUserresponse;
}

export default function AnnouncementItem({ data }: AnnouncementItemProps) {
  return (
    <div className="lg:flex gap-x-4">
      <div className="lg:border-r-2 border-neutral-4 space-y-3 lg:pr-6 flex lg:block">
        <p className="lg:text-xs text-[10px] text-neutral-3 lg:w-[64px] mr-auto">
          {data.created_at}
        </p>
        <AnnounceLabel
          type={data.type}
          className={clsx("h-fit lg:w-[112px] w-[96px]")}
        />
      </div>
      <div className="space-y-1.5 text-neutral-3 border-l-2 border-neutral-4 lg:border-l-0 px-3 lg:px-0 flex-1">
        <h3 className="text-primary-1 font-semibold text-xs">{data.title}</h3>
        <AnnouncementContent data={data}/>
        <p className="text-xs">
          Oleh <span className="font-semibold">{data.sender}</span>
        </p>
      </div>
    </div>
  );
}
