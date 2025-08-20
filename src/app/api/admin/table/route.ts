import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Extract search parameters from the request URL
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());
  
    const data = await ApiHandler({
        requestfunc: () => RequestHttp({ type: "get", url: "admin/tables", params: params }),
    })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  // Parse the request body as form data
  const body = await request.formData();
  // Append _method to the body for PATCH requests
  body.append("_method", "POST");

  // Send a POST request to update the table details
  const data = await ApiHandler({
    requestfunc: () =>
      RequestHttp({ type: "post", url: `admin/reservations/cancel`, datas: body, headers: {} }),
  });

  return NextResponse.json(data);
}