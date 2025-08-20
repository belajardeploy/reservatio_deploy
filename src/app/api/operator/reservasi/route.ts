import { ApiHandler } from "@/lib/ApiHandler";
import { RequestHttp } from "@/services/BE/Request";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)
  const params = Object.fromEntries(searchParams.entries());
  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: 'get', url: 'operator/dashboard/table', params: params})
  })

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()

  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: 'post', url: 'operator/reservations', datas: body})
  })

  return NextResponse.json(data)
}