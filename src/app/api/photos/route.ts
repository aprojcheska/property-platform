import { NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"
import {prisma} from "@/lib/prisma"

export async function POST(req: NextRequest) {
    const data = await req.formData()

    const propertyId = data.get("propertyId") as string
    const files = data.getAll("files") as File[]

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const fileName = `${Date.now()}-${file.name}`
        const filePath = path.join(process.cwd(), "public/uploads", fileName)

        await writeFile(filePath, buffer)

        await prisma.property_images.create({
            data: {
                property_id: propertyId,
                image_url: `/uploads/${fileName}`,
                position: i,
            },
        })
    }

    return NextResponse.json({ success: true })
}
