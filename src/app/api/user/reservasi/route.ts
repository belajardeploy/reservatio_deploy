import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Parse body request
  const { searchParams } = new URL(request.url)
  const params = Object.fromEntries(searchParams.entries());
  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: "get", url: "user/map", params: params }),
  })

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  // Parse body request
  const body = await request.json()
  // const body = await request.formData()
  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: "post", url: "user/reservations", datas: body }),
  })

  return NextResponse.json(data)
}