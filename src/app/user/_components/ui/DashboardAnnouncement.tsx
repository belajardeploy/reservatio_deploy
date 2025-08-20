import WhiteCard from "@/components/card/WhiteCard";
import { pengumumanUserresponse } from "@/components/json/global/pengumumanresponse";
import AnnounceSvg from "@/components/svg/AnnounceSvg";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { AnnounceLabel } from "@/app/user/_components/label/AnnounceLabel";
import clsx from "clsx"
import { ContentAnnounceDashboard } from "@/app/user/_components/content/ContentAnnounceDashboard";

interface dashboardannouncement {
  datas: pengumumanUserresponse[];
  className?: string;
}

export const DashboardAnnouncement = ({
  datas,
  className,
}: dashboardannouncement) => {
  return (
    <WhiteCard className={clsx(className, "flex flex-col p-4")}>
      <div className="flex gap-x-2 mb-2 items-center">
        <AnnounceSvg size={20} className="fill-white" />
        <p className="font-medium text-xs">Pengumuman</p>

        <Link
          className="ml-auto text-primary-1 text-[10px] flex gap-x-1 items-center hover:underline cursor-pointer"
          href={"/user/pengumuman"}
        >
          Lihat semua
          <ChevronRight className="stroke-primary-1" size={14} />
        </Link>
      </div>
      <div className="grid grid-rows-2 h-full ">
        {datas.length > 0 ? (
          datas.map((data, index) => (
            <div
              className={clsx(
                "p-1 text-xs flex flex-col gap-y-2 row-span-1",
                index < datas.length - 1 && "border-b-2 border-b-neutral-3/25"
              )}
              key={index}
            >
              <div className="flex items-center">
                <h1 className="text-xs text-primary-1 font-semibold mr-auto">
                  {data.title}
                </h1>

                <AnnounceLabel type={data.type} />
              </div>

              <ContentAnnounceDashboard data={data}/>

              <div className="flex gap-x-4 text-[10px] text-neutral-3/75 mt-auto">
                <p>
                  Oleh <span className="font-semibold">{data.sender}</span>
                </p>
                <p>{data.created_at}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center text-neutral-3 italic">
            Tidak ada pengumuman terbaru!
          </p>
        )}
      </div>
    </WhiteCard>
  );
};
