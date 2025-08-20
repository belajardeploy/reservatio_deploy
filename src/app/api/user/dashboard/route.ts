import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: "get", url: `user/dashboard`}),
  })
 


  return NextResponse.json(data)
}