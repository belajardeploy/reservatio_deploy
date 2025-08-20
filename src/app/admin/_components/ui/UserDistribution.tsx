import React from "react";
import WhiteCard from "@/components/card/WhiteCard";
import { UserRoundCheck, UserRoundX } from "lucide-react";
// import { userdistributionresp } from "@/components/json/admin/dashboardresponse";
import { userdistributionresp } from "@/components/json/admin/dashboardresponse";
import UserDistributionCardSkeleton from "./skeleton/UserDistributionSkeleton";
interface UserDistributionProps {
  distribution?: userdistributionresp;
  title?: string;
  subtitle?: string;
  className?: string;
  isLoading?: boolean;
}

const UserDistribution: React.FC<UserDistributionProps> = ({
  distribution,
  title = "Distribusi Pengguna",
  subtitle = "Distribusi pengguna per-bulan ini",
  className = "",
  isLoading = false,
}) => {
  return (
    <WhiteCard className={`space-y-4 ${className}`}>
      <div className="space-y-0.5">
        <h1 className="font-medium text-sm">{title}</h1>
        <p className="text-xs text-neutral-3">{subtitle}</p>
      </div>

      {isLoading ? (
        <UserDistributionCardSkeleton />
      ) : (
        <div className="flex gap-2">
            <div className="border-2 rounded-lg px-4 py-3 flex gap-x-2 items-center flex-1">
              <UserRoundCheck className="size-11 p-2 rounded-lg bg-green-2/10 stroke-green-2" />
              <div className="text-green-2">
                <p className="text-2xl font-semibold">
                  {distribution?.active_user}
                  <span className="text-[10px] text-neutral-3">
                    / {distribution?.total_user}
                  </span>
                </p>
                <p className="text-[10px]">Pengguna aktif</p>
              </div>
            </div>
            <div className="border-2 rounded-lg px-4 py-3 flex gap-x-2 items-center flex-1">
              <UserRoundX className="size-11 p-2 rounded-lg bg-red-2/10 stroke-red-2" />
              <div className="text-red-2">
                <p className="text-2xl font-semibold">
                  {distribution?.banned_user}
                  <span className="text-[10px] text-neutral-3">
                    / {distribution?.total_user}
                  </span>
                </p>
                <p className="text-[10px]">Pengguna terblokir</p>
              </div>
            </div>
          </div>
      )}
    </WhiteCard>
  );
};

export default UserDistribution;