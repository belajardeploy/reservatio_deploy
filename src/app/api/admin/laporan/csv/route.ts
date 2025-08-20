import { RequestHttp } from "@/services/BE/Request";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());
  const response = await RequestHttp({ type: 'get', url: `admin/complaints/export`, params: params });
  
  // Set the headers for CSV download
  const headers = new Headers();
  headers.set('Content-Type', 'text/csv');
  headers.set('Content-Disposition', 'attachment; filename="laporan.csv"');

  return new Response(response, { headers });
}