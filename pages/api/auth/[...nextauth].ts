import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/libs/prismadb"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

export const authOption: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_ClIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_ClIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text"
        },
        password: {
          label: "password",
          type: "password"
        }
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("invalid email or password")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user?.hashedPassword) {
          throw new Error("No user was found")
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error("Incorrect Password")
        }

        return user
      }
    })
  ],

  pages: { signIn: "/login" },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      return true;
    }
  }


  // callbacks: {
  //   async signIn({ user, account }) {
  //     // Only handle Google or GitHub logins
  //     if (account?.provider === "google" || account?.provider === "github") {
  //       const existingUser = await prisma.user.findUnique({
  //         where: { email: user.email! },
  //       });

  //       if (existingUser) {
  //         const linkedAccount = await prisma.account.findFirst({
  //           where: {
  //             provider: account.provider,
  //             providerAccountId: account.providerAccountId,
  //           },
  //         });

  //         if (!linkedAccount) {
  //           // Link account manually
  //           await prisma.account.create({
  //             data: {
  //               userId: existingUser.id,
  //               type: account.type,
  //               provider: account.provider,
  //               providerAccountId: account.providerAccountId,
  //               access_token: account.access_token,
  //               token_type: account.token_type,
  //               scope: account.scope,
  //               id_token: (account as any).id_token,
  //               expires_at: account.expires_at,
  //               refresh_token: account.refresh_token,
  //             },
  //           });
  //         }

  //         return true;
  //       } else {
  //         // No existing user, and no credentials account — block login
  //         return false;
  //       }
  //     }

  //     return true;
  //   },
  // }

}



export default NextAuth(authOption)