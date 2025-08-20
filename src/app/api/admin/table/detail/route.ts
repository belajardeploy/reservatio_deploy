import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const params = Object.fromEntries(searchParams.entries());
  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: "get", url: `admin/tables/${params.id}/reservations`, params: params }),
  });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.formData();
  // const file = body.get("thumbnail") as File;
  body.append("_method", "PATCH");

  // if (file) {
  //   data = await ApiHandler({
  //     requestfunc: () =>
  //       RequestHttp({
  //         type: "post",
  //         url: `table/update/${params.id}`,
  //         datas: body,
  //         headers: {},
  //       }),
  //   });
  // } else {
  // }
  const data = await ApiHandler({
    requestfunc: () =>
      RequestHttp({ type: "post", url: `admin/tables/${body.get('id')}`, datas: body, headers: {} }),
  });

  return NextResponse.json(data);
}