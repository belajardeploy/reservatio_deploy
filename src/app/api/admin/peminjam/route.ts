import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const params = Object.fromEntries(searchParams.entries());

  const result = await ApiHandler({
    // Ganti route nya biar fetch user banned disini
    requestfunc: () => RequestHttp({type: 'get', url: `admin/users/isban`, params: params})
  })
  return NextResponse.json(result)
  if(params.user_type){
    if(params.user_type == 'banned'){
    }
    else{
      const result = await ApiHandler({
        requestfunc: () => RequestHttp({type: 'get', url: `admin/users/?page=${params.page}`})
      })
      return NextResponse.json(result)
    }
  }
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const params = Object.fromEntries(searchParams.entries());
  // const body = await request.json();

  const res = await ApiHandler({
    requestfunc: () => RequestHttp({type: 'post', url: `admin/users/update-ban/${params.id_user}`}),
  })

  return NextResponse.json(res)
}
