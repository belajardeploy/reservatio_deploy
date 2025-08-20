import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const res = await ApiHandler({
    requestfunc: () =>
      RequestHttp({ type: "post", url: "admin/reservations", datas: body }),
  });

  return NextResponse.json(res);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());

  const res = await ApiHandler({
    requestfunc: () =>
      RequestHttp({ type: "get", url: "admin/reservation", params: params }),
  });

  return NextResponse.json(res);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());

  const res = await ApiHandler({
    requestfunc: () =>
      RequestHttp({ type: "delete", url: `admin/reservations/${params.id}` }),
  });

  return NextResponse.json(res);
}
