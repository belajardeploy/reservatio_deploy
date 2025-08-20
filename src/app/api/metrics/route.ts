import { recordHttpRequest, register } from "@/lib/Metrics";

export async function GET() {
  // Hitung setiap kali endpoint metrics diakses
  // Catat request HTTP
  const req = new Request("http://localhost/metrics", { method: "GET" });
  const path = "/metrics";
  const statusCode = 200; // Status code untuk response ini
  recordHttpRequest(req, path, statusCode);

  // Return dalam format Prometheus
  return new Response(await register.metrics(), {
    status: 200,
    headers: { 'Content-Type': register.contentType },
  });
}
