import { ChartConfig } from "@/components/ui/chart";

export const chartConfig = {
  reservasi_cancel: {
    label: "Reservasi Dibatalkan",
    color: "hsl(var(--yellow-1))",
  },
  reservasi_success: {
    label: "Reservasi Berhasil",
    color: "hsl(var(--green-2))",
  },
  reservasi_failure: {
    label: "Reservasi Gagal",
    color: "hsl(var(--red-2))",
  },
} satisfies ChartConfig;