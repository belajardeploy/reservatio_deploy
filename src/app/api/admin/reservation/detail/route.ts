import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const params = Object.fromEntries(searchParams.entries());

  const res = await ApiHandler({
    requestfunc: () => RequestHttp({type: 'get', url: 'admin/borrower', params: params})
  })

  return NextResponse.json(res)
}