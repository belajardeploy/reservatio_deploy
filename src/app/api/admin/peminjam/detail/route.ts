import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const params = Object.fromEntries(searchParams.entries());

  const result = await ApiHandler({
    requestfunc: () => RequestHttp({type: 'get', url: `admin/users/${params.id}?page=${1}`})
  })

  return NextResponse.json(result)
}