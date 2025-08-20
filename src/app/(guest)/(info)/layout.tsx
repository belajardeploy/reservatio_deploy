"use client";

import React from "react";
import HeaderGuest from "../_components/layout/HeaderGuest";
import Footer from "@/components/ui/footer";

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen relative overflow-x-hidden">
      <HeaderGuest />
      <div className="relative">{children}</div>
      <Footer />
    </div>
  );
}
