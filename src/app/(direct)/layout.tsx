"use client";

import type React from "react";

interface DirectLayoutProps {
  children: React.ReactNode;
}

export default function DirectLayout({ children }: DirectLayoutProps) {
  return (
    <div className="bg-[url('/Image/direct.png')] bg-cover bg-center bg-no-repeat w-full min-h-screen">
      <div className="w-full min-h-screen">{children}</div>
    </div>
  );
}
