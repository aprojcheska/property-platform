import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { NextResponse } from "next/server"

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const existing = await prisma.properties.findUnique({
        where: { id },
    })

    if (!existing || existing.userId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const data = await req.json()

    const cleanData = Object.fromEntries(
        Object.entries(data).filter(
            ([_, value]) =>
                value !== undefined &&
                value !== null &&
                value !== "" &&
                !Number.isNaN(value)
        )
    )

    const updated = await prisma.properties.update({
        where: { id },
        data: cleanData,
    })

    return NextResponse.json(updated)
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const existing = await prisma.properties.findUnique({
        where: { id },
    })

    if (!existing || existing.userId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await prisma.property_images.deleteMany({
        where: { property_id: id },
    })

    await prisma.properties.delete({
        where: { id },
    })

    return NextResponse.json({ success: true })
}