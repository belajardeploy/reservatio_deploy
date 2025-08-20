import client from 'prom-client';

export const register = new client.Registry();
client.collectDefaultMetrics({ register });

export const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total jumlah HTTP request',
  labelNames: ['method', 'path', 'status_code'],
});

register.registerMetric(httpRequestCounter);

export function recordHttpRequest(req: Request, path: string, statusCode: number) {
  httpRequestCounter.inc({
    method: req.method,
    path,
    status_code: statusCode.toString(),
  });
}