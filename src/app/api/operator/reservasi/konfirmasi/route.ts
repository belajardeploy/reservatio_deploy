import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Parse body request
  // const { searchParams } = new URL(request.url)
  // const params = Object.fromEntries(searchParams.entries());

  const body = await request.formData()
  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: "post", url: "operator/reservations/checkin", datas: body }),
  })

  return NextResponse.json(data)
}