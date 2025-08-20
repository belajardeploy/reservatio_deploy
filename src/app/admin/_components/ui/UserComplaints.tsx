import React from "react";
import WhiteCard from "@/components/card/WhiteCard";
import { ChevronRight, Megaphone } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usercomplaintsresp } from "@/components/json/admin/dashboardresponse";
import ComplaintRowSkeleton from "./skeleton/UserComplaintsRowSekelton";

interface UserComplaintsCardProps {
  complaints?: usercomplaintsresp[];
  title?: string;
  viewAllLink?: string;
  className?: string;
  isLoading?: boolean;
}

const UserComplaints: React.FC<UserComplaintsCardProps> = ({
  complaints = [],
  title = "Laporan Pengguna",
  viewAllLink = "/admin/laporan_pengguna",
  className = "",
  isLoading = false,
}) => {
  return (
    <WhiteCard className={`space-y-2 h-full ${className}`}>
      <div className="flex space-x-1.5 items-center">
        <Megaphone />
        <h1 className="font-medium text-sm">{title}</h1>
        <Link
          href={viewAllLink}
          className="ml-auto text-primary-1 text-[10px] flex gap-x-1 items-center hover:underline cursor-pointer"
        >
          Lihat semua
          <ChevronRight className="stroke-primary-1" size={14} />
        </Link>
      </div>

      <div className="grid grid-rows-4 h-[93%]">
        {isLoading ? (
          <>
            <ComplaintRowSkeleton />
            <ComplaintRowSkeleton />
            <ComplaintRowSkeleton />
            <ComplaintRowSkeleton isLast={true} />
          </>
        ) : complaints && complaints.length > 0 ? (
          complaints.map((complaint, index) => (
            <div
              className={clsx(
                "p-1 text-xs flex flex-col gap-y-2 row-span-1",
                index < complaints.length - 1 &&
                  "border-b-2 border-b-neutral-3/25"
              )}
              key={index}
            >
              <div className="flex items-center">
                <h1 className="text-xs text-primary-1 font-semibold mr-auto">
                  {complaint.category}
                </h1>
              </div>
              <p className="text-[10px] line-clamp-3 mt-2">
                {complaint.description}
              </p>
              <div className="flex gap-x-4 text-[10px] text-neutral-3/75 mt-auto">
                <p>
                  Oleh <span className="font-medium">{complaint.sender}</span>
                </p>
                <p className="ml-auto">{complaint.created_at}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center text-neutral-3 italic">
            Tidak ada laporan pengguna terbaru!
          </p>
        )}
      </div>
    </WhiteCard>
  );
};

export default UserComplaints;