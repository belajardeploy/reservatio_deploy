'use client'
import { store } from "@/lib/config/store";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  )
}