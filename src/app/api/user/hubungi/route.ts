import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Parse body request
  // const body = await request.json()
  const body = await request.formData()
  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: "post", url: "user/complaints", datas: body }),
  })

  return NextResponse.json(data)
}