import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { Poppins } from "next/font/google";
import ReduxProvider from "@/providers/redux";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Reservasi",
  description: "Dibuat oleh bengkod",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased `}
      >
        <link rel="icon" href="/Image/logo-bengkod-polosan.svg" sizes="any"/>
        <Toaster />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
