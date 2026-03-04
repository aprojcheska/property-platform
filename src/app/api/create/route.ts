import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    console.log("SESSION:", session) // 👈 ADD THIS

    if (!session?.user?.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    }

    const data = await req.json()

    const property = await prisma.properties.create({
        data: {
            ...data,
            price: data.price.toString(),
            available_from: data.available_from
                ? new Date(data.available_from)
                : null,
            userId: session.user.id,
        },
    })

    return NextResponse.json(property)
}
