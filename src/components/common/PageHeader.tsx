// src/components/layout/PageHeader.tsx
import Image from "next/image"
import { NavBar } from "@/components/layout/NavBar"

type Props = {
    height?: string
}

export function PageHeader({ height = "h-[200px]" }: Props) {
    return (
        <div className={`relative w-full ${height}`}>
            {/* Background image */}
            <Image
                src="/header.png"
                alt="Header background"
                fill
                priority
                className="object-cover"
            />

            {/* Optional dark overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* NavBar */}
            <div className="absolute top-0 left-0 w-full z-20">
                <NavBar />
            </div>
        </div>
    )
}
