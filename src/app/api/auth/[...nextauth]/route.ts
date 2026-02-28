import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "School Portal",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                const school = await prisma.school.findUnique({
                    where: { username: credentials.username }
                });

                if (!school || !school.password) {
                    return null;
                }

                const isValid = await bcrypt.compare(credentials.password, school.password);

                if (!isValid) {
                    return null;
                }

                return {
                    id: school.id,
                    name: school.name,
                    slug: school.slug,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.slug = (user as any).slug;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).slug = token.slug;
            }
            return session;
        }
    },
    pages: {
        signIn: "/dashboard/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
