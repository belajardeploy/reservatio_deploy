import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import { CredentialsProvider } from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
export const authOption: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 30,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        id: {
          type: "number",
        },
        name: {
          type: "text",
        },
        email_mhs: {
          type: "email",
        },
        photo: {
          type: "text",
        },
        token: {
          type: "text",
        },
        role: {
          type: "text",
        },
        nim: {
          type: "text"
        },
        is_reserve: {
          type: "number"
        },
        penalty_count:{
          type: "number"
        },
        created_at: {
          type: "text"
        },
        duration:{
          type: "text"
        },
      },
      authorize: async (credentials) => {
        if (!credentials) return null
        // const { email_mhs } = credentials
        // let result = await fetch('autentikasi/login', {method: 'POST', body: email_mhs})
        return credentials || null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (user) {
        token.id = user.id;
        token.token = user.token;
        token.email_mhs = user.email_mhs;
        token.photo = user.photo;
        token.name = user.name;
        token.nim = user.nim;
        token.role = user.role;
        token.penalty_count = user.penalty_count;
        token.is_reserve = user.is_reserve;
        token.created_at = user.created_at;
        token.duration = user.duration;
      }

      if (trigger === "update" && session) {
        token.name = session.name || token.name;
        token.photo = session.photo || token.photo;
        console.log("JWT Updated Photo:", token.photo);
      }

      return token;
    },

    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.id as number;
        session.user.name = token.name as string;
        session.user.token = token.token as string;
        session.user.nim = token.nim  as string;
        session.user.photo = token.photo as string;
        session.user.email_mhs = token.email_mhs as string;
        session.user.penalty_count = token.penalty_count as number;
        session.user.is_reserve = token.is_reserve as number;
        session.user.role = token.role as string;
        session.user.created_at = token.created_at as string;
        session.user.duration = token.duration as string;
      }
      return session;
    },
  },
};
