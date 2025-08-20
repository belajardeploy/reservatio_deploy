import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Extract search parameters from the request URL
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());
    const data = await ApiHandler({
        requestfunc: () => RequestHttp({ type: "get", url: `operator/dashboard/`, params: params }),
    })
  return NextResponse.json(data)
}