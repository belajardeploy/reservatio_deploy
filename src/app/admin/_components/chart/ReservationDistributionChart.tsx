"use client";

import React from "react";
import WhiteCard from "@/components/card/WhiteCard";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { chartConfig as defaultChartConfig } from "@/lib/config/ChartConfig"; // Impor sebagai default atau beri alias
import clsx from "clsx";

// Definisikan tipe data untuk chart jika belum ada
interface ChartDataPoint {
  week: string; // Atau tipe data yang sesuai untuk sumbu X Anda
  reservasi_cancel?: number;
  reservasi_success?: number;
  reservasi_failure?: number;
  [key: string]: any; // Untuk properti dinamis lainnya jika ada
}

interface ReservationDistributionChartProps {
  data: ChartDataPoint[];
  chartConfig?: typeof defaultChartConfig; // Jadikan opsional, gunakan default jika tidak disediakan
  title?: string;
  description?: string;
  className?: string;
  chartContainerClassName?: string;
  isLoading?: boolean; // Tambahkan prop isLoading
}

const ReservationDistributionChart: React.FC<
  ReservationDistributionChartProps
> = ({
  data,
  chartConfig = defaultChartConfig, // Gunakan default jika tidak ada yang di-pass
  title = "Distribusi reservasi",
  description = "Distribusi reservasi per-bulan ini",
  className,
  chartContainerClassName = "h-[150px] w-full",
  isLoading,
}) => {
  if (isLoading) {
    return (
      <WhiteCard
        className={clsx(
          "space-y-2 w-full max-h-[230px] animate-pulse",
          className
        )}
      >
        <div className="space-y-1">
          <div className="h-5 bg-neutral-4/30 rounded w-3/4"></div>
          <div className="h-4 bg-neutral-4/20 rounded w-1/2"></div>
        </div>
        <div
          className={clsx(
            "bg-neutral-4/10 rounded",
            chartContainerClassName,
            "flex items-center justify-center"
          )}
        >
          <p className="text-sm text-neutral-3">Memuat data chart...</p>
        </div>
      </WhiteCard>
    );
  }

  return (
    <WhiteCard className={clsx("space-y-2 w-full max-h-[230px]", className)}>
      <div className="space-y-0.5">
        <h1 className="font-medium text-sm">{title}</h1>
        <p className="text-xs text-neutral-3">{description}</p>
      </div>

      <ChartContainer config={chartConfig} className={chartContainerClassName}>
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
            top: 5, // Tambahkan sedikit margin atas untuk dot
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="week" // Pastikan ini sesuai dengan properti di data Anda
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) =>
              typeof value === "string" ? value.slice(0, 3) : String(value)
            }
            fontSize={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            width={30}
            fontSize={12}
            allowDecimals={false} // Jika data Anda selalu integer
          />
          <ChartLegend content={<ChartLegendContent />} />
          <ChartTooltip
            cursor={{ fill: "hsl(var(--background))", opacity: 0.5 }}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Line
            dataKey="cancel"
            type="monotone"
            stroke="var(--color-yellow-2)"
            strokeWidth={2}
            dot={true}
          />
          <Line
            dataKey="done"
            type="monotone"
            stroke="var(--color-primary-1)"
            strokeWidth={2}
            dot={true}
          />
          <Line
            dataKey="violation"
            type="monotone"
            stroke="var(--color-red-2)"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ChartContainer>
    </WhiteCard>
  );
};

export default ReservationDistributionChart;

// Helper untuk clsx jika belum ada di file ini
// Anda mungkin sudah punya ini di utils
// const clsx = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');
