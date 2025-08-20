"use server";
import axios, { AxiosError } from "axios";
// import Cookies from 'js-cookie'
import { getServerSession } from "next-auth";
import { authOption } from "../../lib/config/auth";
import { recordHttpRequest } from "@/lib/Metrics";
// import axios from "./BaseRequest";
interface requestparams {
  type: "get" | "post" | "put" | "delete" | "patch";
  url?: string;
  datas?: { [key: string]: any };
  headers?: { [key: string]: any };
  params?: { [key: string]: any };
}

export async function RequestHttp({
  type = "get",
  url = "",
  datas = {},
  headers = { "Content-Type": "application/json" },
  params = {},
}: requestparams): Promise<any> {
  // const authkey = cookies().get('token')?.value ?? "";
  const session = await getServerSession(authOption);
  // return authkey
  const config = {
    method: type,
    url: process.env.NEXT_SECRET_API_BACKEND_URL + url,
    headers: {
      ...headers,
      Authorization: `Bearer ${session?.user.token}`,
    },
    params: { ...params },
    data: datas,
  };

  let statusCode = 200; // Default status code

  try {
    const res = await axios.request(config);
    statusCode = res.status;
    return res.data;
  } catch (err) {
    const errorAxios = err as AxiosError;
    if (errorAxios.response) {
      const status = errorAxios.response.status;
      switch (status) {
        case 400:
          // console.error("Bad Request:", errorAxios.response.data);
          // throw new Error("Bad requestparams - Check parameters and try again.");
          statusCode = status;
          return errorAxios.response.data;
        case 401:
          // console.error("Unauthorized:", errorAxios.response.data);
          // throw new Error("Unauthorized - Please check your credentials.");
          statusCode = status;
          return errorAxios.response.data;
        case 404:
          // console.error("Not Found:", errorAxios.response.data);
          // throw new Error("Resource not found - Verify the URL.");
          statusCode = status;
          return errorAxios.response.data;
        case 500:
          // console.error("Internal Server Error:", errorAxios.response.data);
          // throw new Error("Server error - Try again later.");
          statusCode = status;
          return errorAxios.response.data;
        default:
          // console.error("Unexpected error:", errorAxios.response.data);
          // throw new Error(`Unexpected error - Status code: ${status}`);
          statusCode = status;
          return errorAxios.response.data;
      }
    } else if (errorAxios.request) {
      throw new Error("No response from server - Check network connection.");
    } else {
      // Other errors (e.g., setting up the requestparams)
      throw new Error(
        `Request setup failed - Check configuration, ${errorAxios.message}`
      );
    }
  } finally {
    recordHttpRequest(
      { method: type.toUpperCase() } as Request, // spoof object untuk compat
      url,
      statusCode
    );
  }
}
