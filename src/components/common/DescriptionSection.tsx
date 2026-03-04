"use client"

import { useState } from "react"

export function DescriptionSection({
                                       description,
                                   }: {
    description: string
}) {
    const [expanded, setExpanded] = useState(false)

    return (
        <section className="mt-12">
            <h2 className="font-semibold text-xl mb-4">Опис</h2>

            <div className="bg-white rounded-xl shadow-sm p-6 relative">
                <p
                    className={`text-gray-600 leading-relaxed transition-all
            ${!expanded ? "line-clamp-4" : ""}
          `}
                >
                    {description}
                </p>

                {/* Fade overlay when collapsed */}
                {!expanded && (
                    <div className="absolute bottom-12 left-0 right-0 h-12
                          bg-gradient-to-t from-white to-transparent" />
                )}

                {/* Toggle */}
                <div className="mt-4 text-center">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-[#B23A3A] text-sm font-medium hover:underline cursor-pointer"
                    >
                        {expanded ? "Прикажи помалку" : "Прикажи повеќе"}
                    </button>
                </div>
            </div>
        </section>
    )
}
