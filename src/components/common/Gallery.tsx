"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Gallery({ images }: { images: string[] }) {
    const [index, setIndex] = useState(0)

    return (
        <div className="relative h-[420px] rounded-xl  overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <Image
                src={images[index]}
                alt="Property image"
                fill
                className="object-contain"
            />

            {/* Arrows */}
            <button
                onClick={() => setIndex((index - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:scale-[1.01] transition-transform"
            >
                <ChevronLeft />
            </button>

            <button
                onClick={() => setIndex((index + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:scale-[1.01] transition-transform"
            >
                <ChevronRight />
            </button>
        </div>
    )
}
