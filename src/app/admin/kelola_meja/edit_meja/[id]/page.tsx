import EditMejaClient from "@/app/admin/_components/ui/EditMejaClient";
import { DetailTableResponse } from "@/components/json/admin/kelolamejaresponse";
import { ApiHandler } from "@/lib/ApiHandler";
import { RequestHttp } from "@/services/BE/Request";
import dayjs from "dayjs";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    date?: string;
    time_slot_id?: string;
  }>;
}

export default async function Page({
  params: paramsPromise,
  searchParams: searchParamsPromise, // Ganti nama untuk kejelasan
}: PageProps) {
  // Await paramsPromise untuk mendapatkan objek params yang sebenarnya
  const { id } = await paramsPromise;

  // Await searchParamsPromise jika ada, jika tidak, hasilnya undefined
  const resolvedSearchParams = searchParamsPromise
    ? await searchParamsPromise
    : undefined;

  // Akses properti dari resolvedSearchParams dengan aman
  const date = resolvedSearchParams?.date;
  const time_slot_id = resolvedSearchParams?.time_slot_id;

  const res = await ApiHandler({
    requestfunc: () =>
      RequestHttp({
        type: "get",
        url: `admin/tables/${id}/reservations`,
        params: {
          id: id,
          date: dayjs(date).format("YYYY-MM-DD"),
          time_slot_id: time_slot_id,
        },
      }),
  });
  if (res.status == "error") {
    // Handle error response
    notFound();
  }

  const data: DetailTableResponse = res.data;

  return <EditMejaClient id={id} date={date} timeSlotId={time_slot_id} detailTable={data}  />;
}
