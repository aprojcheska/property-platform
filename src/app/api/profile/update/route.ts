// app/api/profile/update/route.ts
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-options"
import { NextResponse } from "next/server"
import path from "path"
import fs from "fs"

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const name = formData.get("name") as string

    const avatar = formData.get("avatar") as File | null

    let avatarPath = undefined

    if (avatar && avatar.size > 0) {
        const bytes = await avatar.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const fileName = `${Date.now()}-${avatar.name}`
        const uploadPath = path.join(process.cwd(), "public/uploads", fileName)

        fs.writeFileSync(uploadPath, buffer)

        avatarPath = `/uploads/${fileName}`
    }

    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            name,
            ...(avatarPath && { image: avatarPath }),
        },
    })

    return NextResponse.json({ success: true })
}