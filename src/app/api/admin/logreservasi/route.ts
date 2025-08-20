import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());

  const result = await ApiHandler({
    requestfunc: () => RequestHttp({ type: 'get', url: `admin/log`, params: params })
  });

  return NextResponse.json(result);
}

export async function DELETE(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const params = Object.fromEntries(searchParams.entries());
  const datas = await request.formData();

  const result = await ApiHandler({
    requestfunc: () => RequestHttp({ type: 'post', url: `admin/reservations/cancel-range`, datas: datas })
  });

  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const body = await request.formData();
  // const file = body.get("thumbnail") as File;
  // body.append("_method", "PATCH");

  const result = await ApiHandler({
    requestfunc: () => RequestHttp({ type: 'post', url: `admin/blocked-dates`, datas: body })
  });

  return NextResponse.json(result);
}