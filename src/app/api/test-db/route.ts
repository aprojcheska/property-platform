import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    const data = await prisma.properties.findMany({ take: 1 })
    return NextResponse.json(data)
}
