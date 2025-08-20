import { ApiHandler } from "@/lib/ApiHandler";
import { RequestHttp } from "@/services/BE/Request";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: "get", url: "user/blocked-dates" }),
  });

  return NextResponse.json(data);
}