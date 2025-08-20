import { ApiHandler } from "@/lib/ApiHandler"
import { RequestHttp } from "@/services/BE/Request"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.formData()

  const data = await ApiHandler({
    requestfunc: () => RequestHttp({ type: 'post', url: `operator/reservations/${body.get('id')}`, datas: body})
  })

  return NextResponse.json(data)
}