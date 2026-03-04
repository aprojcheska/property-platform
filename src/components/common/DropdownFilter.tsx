"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

type DropdownFilterProps = {
    label: string
    children: React.ReactNode
    active?: boolean
}

export function DropdownFilter({
                                   label,
                                   children,
                                   active = false,
                               }: DropdownFilterProps) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition
          ${
                    active
                        ? "bg-[#303c51] text-white border-[#303c51]"
                        : "bg-white hover:bg-gray-50"
                }`}
            >
                {label}
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && (
                <div className="absolute mt-2 bg-white shadow-xl rounded-xl p-4 min-w-[220px] z-50 border">
                    {children}
                </div>
            )}
        </div>
    )
}