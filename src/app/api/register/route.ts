import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    const body = await req.json()

    const { email, password, name, role } = body

    if (!email || !password) {
        return new Response("Missing fields", { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    })

    if (existingUser) {
        return new Response("User already exists", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
            role,
        },
    })

    return Response.json(user)
}
