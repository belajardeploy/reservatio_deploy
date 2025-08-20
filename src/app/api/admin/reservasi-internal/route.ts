import { RequestHttp } from "@/services/BE/Request";

import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const date = searchParams.get("date");

  // ubah query params menjadi array integer
  const time_slot_ids_param = searchParams.get("time_slot_ids");
  const time_slot_ids = time_slot_ids_param
    ? time_slot_ids_param.split(",").map((id) => parseInt(id, 10))
    : [];

  const table_ids_param = searchParams.get("table_ids");
  const table_ids = table_ids_param
    ? table_ids_param.split(",").map((id) => parseInt(id, 10))
    : [];

  const data = await ApiHandler({
    requestfunc: () =>
      RequestHttp({
        type: "get",
        url: `admin/reservations/check-conflicts`,
        datas: {
          date: date,
          time_slot_ids: time_slot_ids,
          table_ids: table_ids,
        }, // sesuaikan dengan format backend
      }),
  });

  return Response.json(data);
}

export async function POST(request: Request) {
  const form = await request.formData();
  
  const data = await RequestHttp({
    type: "post",
    url: "admin/reservations",
    datas: form,
    headers: {"Content-Type" : form.get("Content-Type")},
  });
  return NextResponse.json(data);
}
