import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());
  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: "get", url: `admin/users`, params: params }),
  });
  return NextResponse.json(data);
}
export async function POST(request: Request) {
  const body = await request.formData();
  body.append("_method", "PATCH");

  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: "post", url: `admin/users/${body.get('id')}`, datas: body, headers: {} }),
  });

  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const body = await request.formData();
  body.append("_method", "PATCH");

  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: "post", url: `admin/users/${body.get('id')}/banned-status`, datas: body }),
  });

  return NextResponse.json(data);
  // return NextResponse.json({status: body.get('is_ban'), id: body.get('id')});
}