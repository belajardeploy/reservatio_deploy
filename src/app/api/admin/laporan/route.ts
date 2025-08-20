import { RequestHttp } from "@/services/BE/Request";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());
  const response = await RequestHttp({type: 'get', url: `admin/complaints`, params: params});
  return NextResponse.json(response);
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  // if (!id) {
  //   return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  // }
  
  // const body = await request.json();
  const response = await RequestHttp({type: 'patch', url: `admin/complaints/${id}`});
  
  return NextResponse.json(response);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  // if (!id) {
  //   return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  // }
  const response = await RequestHttp({type: 'delete', url: `admin/complaints/${id}`});
  
  return NextResponse.json(response);
}