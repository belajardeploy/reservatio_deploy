import { ApiHandler } from "@/lib/ApiHandler";
import { RequestHttp } from "@/services/BE/Request";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Parse body request
  const { searchParams } = new URL(request.url)
  const params = Object.fromEntries(searchParams.entries());
  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: "get", url: "user/reservations/check-status", params: params }),
  })

  return NextResponse.json(data)
}