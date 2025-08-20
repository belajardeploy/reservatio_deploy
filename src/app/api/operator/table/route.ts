import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  
  const { searchParams } = new URL(request.url)
  const params = Object.fromEntries(searchParams.entries());
    const data = await ApiHandler({
        requestfunc: () => RequestHttp({ type: "get", url: `operator/table/${params.table_id}` }),
    })
  return NextResponse.json(data)
}