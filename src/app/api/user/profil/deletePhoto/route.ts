import { RequestHttp } from "@/services/BE/Request";
import { ApiHandler } from "@/lib/ApiHandler";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const data = await ApiHandler({
      requestfunc: () => RequestHttp({ type: "delete", url: "delete-photo" }),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in DELETE photo:", error);
    return NextResponse.json({
      status: "error",
      message: "Failed to delete photo.",
    });
  }
}
