import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/lib/schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/auth/login`, {
            method: 'POST',
            body: JSON.stringify(validatedFields.data),
            headers: { 'Content-Type': 'application/json' }
          })
          const {email,accessToken} = await res.json()
          
          if (email && accessToken) {
            return { email: email, accessToken: accessToken }
          } else {
            return null
          }
        }

        return null;
      }
    })
  ],
  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig