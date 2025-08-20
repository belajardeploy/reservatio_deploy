import { ApiHandler } from "@/lib/ApiHandler";
import { RequestHttp } from "@/services/BE/Request";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const params = Object.fromEntries(searchParams.entries());

  const data = await ApiHandler({
    requestfunc: () => RequestHttp({type: 'get', url: 'operator/dashboard/detail-reservation', params: params})
  })

  return NextResponse.json(data)
}