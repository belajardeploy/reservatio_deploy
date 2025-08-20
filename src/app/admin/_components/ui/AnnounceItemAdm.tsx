import React from "react";
import { pengumumanUserresponse } from "@/components/json/global/pengumumanresponse";
import AnnouncementContent from "@/components/ui/AnnouncementContent";

import SecondaryButton from "@/components/button/SecondaryButton";
import { Pencil, Trash2 } from "lucide-react";

interface AnnouncementItemProps {
  data: pengumumanUserresponse;
  onEdit: (data: pengumumanUserresponse) => void;
  onDelete: (data: pengumumanUserresponse) => void;
}

export default function AnnouncementItemAdm({ data, onEdit, onDelete }: AnnouncementItemProps) {
  return (
    <div className="lg:flex gap-x-4 w-full">
      <div className=" space-y-3 lg:pr-6 flex lg:block">
        <p className="lg:text-xs text-[10px] text-neutral-3 lg:w-[64px] mr-auto">
          {data.created_at}
        </p>
      </div>
      <div className="space-y-1.5 text-neutral-3 border-l-2 border-neutral-4 lg:border-l-0 px-3 lg:px-0 w-full">
        <h3 className="text-primary-1 font-semibold text-xs">{data.title}</h3>
        <AnnouncementContent data={data} />

        <div className="flex w-full">
          <p className="text-xs">
            Oleh <span className="font-semibold">{data.sender}</span>
          </p>

          <div className="flex gap-2 ml-auto">
            <SecondaryButton className="group" onClick={() => onEdit(data)}>
              <Pencil className="stroke-primary-1 ml-[1px] group-hover:stroke-white duration-200 ease-in-out" size={18}/>
            </SecondaryButton>
            <SecondaryButton className="group" onClick={() => onDelete(data)}>
              <Trash2 className="stroke-primary-1 ml-[1px] group-hover:stroke-white duration-200 ease-in-out" size={18}/>
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
