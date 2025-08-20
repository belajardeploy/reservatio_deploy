import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.formData();
    const data = await ApiHandler({
        requestfunc: () =>
          RequestHttp({
            type: "post",
            url: "auth/change-password",
            datas: body,
          }),
      });

  // try {
  //   data = await ApiHandler({
  //     requestfunc: () =>
  //       RequestHttp({
  //         type: "post",
  //         url: "change-password",
  //         datas: body,
  //       }),
  //   });
  // } catch (error) {
  //   console.error("Error in change password:", error);
  //   return NextResponse.json({
  //     status: "error",
  //     message: "Failed to change password",
  //   });
  // }

  return NextResponse.json(data);
}
