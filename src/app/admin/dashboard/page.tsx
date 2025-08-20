"use client";
import {
  ListCheck,
  Tickets,
} from "lucide-react";
import { StatusCardAdmin } from "@/app/admin/_components/card/CardAdmin";
import { MdOutlineTableBar } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { mockReservasiData } from "@/data/mockdata/totalreservasi";
import { dashboardadmresponse } from "@/components/json/admin/dashboardresponse";
import { useGetDashboardAdmQuery } from "@/services/admin/DashboardAdmServices";
import { toast } from "sonner";
import { chartConfig } from "@/lib/config/ChartConfig";
import ReservationDistributionChart from "@/app/admin/_components/chart/ReservationDistributionChart";
import TodayReservations from "@/app/admin/_components/ui/TodayReservation";
import UserDistribution from "@/app/admin/_components/ui/UserDistribution";
import UserComplaints from "@/app/admin/_components/ui/UserComplaints";

const DashboardPage = () => {
  const { data: dashboardresponse, isFetching } = useGetDashboardAdmQuery({});

  const [dashboarddata, setDashboardData] =
    useState<dashboardadmresponse | null>(null);

  useEffect(() => {
    if (!dashboardresponse) return;

    if (dashboardresponse.status == "error") {
      console.error(
        "Error fetching dashboard data:",
        dashboardresponse.message
      );
      toast.error("Gagal mengambil data dashboard. Silakan coba lagi.");
      return;
    }

    if (dashboardresponse.status == "success") {
      setDashboardData(dashboardresponse.data);
    }
  }, [dashboardresponse]);
  return (
    <div className="md:pl-4 md:pt-4 md:pr-2 md:pb-0 p-3.5 flex gap-2 w-full max-w-[4096px] h-[648px]">
      <div className="flex flex-col gap-y-2 min-w-2/3">
        <div className="flex gap-2">
          <StatusCardAdmin
            title="Total Reservasi Hari Ini"
            color="primary"
            value={dashboarddata?.total_reservation_today || 0}
            icon={<Tickets size={22} className="stroke-primary-1" />}
          />
          <StatusCardAdmin
            title="Total Check-in Hari Ini"
            color="green"
            value={dashboarddata?.total_checkin_today || 0}
            icon={<ListCheck size={22} className="stroke-[#1BA794]" />}
          />
          <StatusCardAdmin
            title="Total Meja Tersedia"
            color="yellow"
            value={dashboarddata?.total_available_table_today || 0}
            icon={
              <MdOutlineTableBar
                className="stroke-neutral-3/50"
                size={22}
                color="#8f6f00"
              />
            }
          />
        </div>
        <ReservationDistributionChart
          data={dashboarddata?.reservation_distribution || mockReservasiData}
          chartConfig={chartConfig}
          isLoading={isFetching}
        />

        <TodayReservations
          reservations={dashboarddata?.reservations_today || []}
          isLoading={isFetching}
          title="Reservasi Hari Ini"
          viewAllLink="/admin/kelola_reservasi"
        />
      </div>

      <div className="w-full space-y-2 flex flex-col h-full">
        <UserDistribution
        distribution={dashboarddata?.user_distribution}
        isLoading={isFetching}
        />

        <UserComplaints
          complaints={dashboarddata?.user_complaints || []}
          isLoading={isFetching}
          title="Laporan Pengguna"
          viewAllLink="/admin/laporan_pengguna"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
