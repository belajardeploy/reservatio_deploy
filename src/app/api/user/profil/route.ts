import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());
  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: "get", url: "user", params: params }),
  });

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.formData();
  const file = body.get("photo") as File;
  let data: any = "";

  if (file) {
    body.append("_method", "PATCH");
    data = await ApiHandler({
      requestfunc: () =>
        RequestHttp({
          type: "post",
          url: "update-user",
          datas: body,
          headers: {},
        }),
    });
  } else {
    data = await ApiHandler({
      requestfunc: () =>
        RequestHttp({ type: "patch", url: "update-user", datas: body }),
    });
  }

  return NextResponse.json(data);
}
