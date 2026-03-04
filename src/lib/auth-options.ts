import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: "jwt",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })

                if (!user || !user.password) return null

                const valid = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if (!valid) return null

                return user
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user, trigger }) {
            if (user) {
                token.id = user.id
                token.role = user.role
                token.image = user.image
                token.name = user.name
            }

            if (trigger === "update") {
                const updatedUser = await prisma.user.findUnique({
                    where: { id: token.id as string },
                })

                if (updatedUser) {
                    token.image = updatedUser.image
                    token.name = updatedUser.name
                }
            }

            return token
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
                session.user.image = token.image as string
                session.user.name = token.name as string
            }
            return session
        },
    },

    pages: {
        signIn: "/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
}
