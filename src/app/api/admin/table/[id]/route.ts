import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const params = Object.fromEntries(searchParams.entries());
  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: "get", url: `table/${params.id}` }),
  });
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const params = Object.fromEntries(searchParams.entries());
  const body = await request.formData();
  const file = body.get("thumbnail") as File;
  let data: any = "";

  if (file) {
    body.append("_method", "PATCH");
    data = await ApiHandler({
      requestfunc: () =>
        RequestHttp({
          type: "post",
          url: `table/update/${params.id}`,
          datas: body,
          headers: {},
        }),
    });
  } else {
    data = await ApiHandler({
      requestfunc: () =>
        RequestHttp({ type: "patch", url: `table/update/${params.id}`, datas: body }),
    });
  }

  return NextResponse.json(data);
}