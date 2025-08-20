import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.formData()
  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: "post", url: "auth/login", datas: body }),
  })
  return NextResponse.json(data)
}