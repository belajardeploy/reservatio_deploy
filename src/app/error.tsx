"use client";

import ErrorLayout from "@/components/ui/ErrorLayout";

export default function InternalServerError() {
  return (
    <ErrorLayout
      imageSrc="/Image/500.svg"
      imageAlt="500 Internal Server Error"
      title="Terjadi masalah saat menghubungkan ke server"
      description="Server kami sedang sibuk untuk memenuhi permintaan Anda. Silakan coba beberapa saat lagi"
    />
  );
}
