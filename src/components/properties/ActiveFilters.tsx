"use client"

import { useRouter, useSearchParams } from "next/navigation"

export function ActiveFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const params = new URLSearchParams(searchParams.toString())

    if (!params.toString()) return null

    function clearAll() {
        router.push("/properties")
    }

    return (
        <div className="flex flex-wrap gap-3 mt-6 mb-0">
            {[...params.entries()].map(([key, value]) => (
                <span
                    key={key}
                    className="bg-gray-200 px-4 py-2 rounded-full text-sm"
                >
         {value}
        </span>
            ))}

            <button
                onClick={clearAll}
                className="text-[#B23A3A] border border-[#B23A3A] text-xs px-3 py-1 rounded-lg cursor-pointer"
            >
                Исчисти филтри
            </button>
        </div>
    )
}