import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      token: string;
      email_mhs: string;
      nim: string;
      photo: string;
      role: string;
      is_reserve: number;
      penalty_count: number;
      created_at: string;
      duration: string;
    } & DefaultSession["user"];
  }

  interface User {
    token: string;
    email_mhs: string;
    nim: string;
    photo: string;
    role: string;
    penalty_count: string;
    is_reserve: string;
    created_at: string;
    duration: string;
  }
}
