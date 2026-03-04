"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {DropdownFilter} from "@/components/common/DropdownFilter";

export function FilterSection() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const selectedType = searchParams.get("type")
    const selectedListing = searchParams.get("listing")
    const selectedRooms = searchParams.get("rooms")

    function updateFilters(newParams: Record<string, string | null>) {
        const params = new URLSearchParams(searchParams.toString())

        Object.entries(newParams).forEach(([key, value]) => {
            if (value) params.set(key, value)
            else params.delete(key)
        })

        params.delete("page")
        router.push(`/properties?${params.toString()}`)
    }

    return (
        <div className="w-full
    bg-[#f8f9fb]
    py-4
    px-4
    rounded-md
    border
    border-gray-200
    flex
    flex-col
    lg:flex-row
    lg:items-center
    gap-4">
            <div className="flex
    flex
    flex-col
    sm:flex-row
    gap-3
    sm:gap-4
    w-full
    lg:w-auto
    flex-1">

                {/* Property Type */}
                <DropdownFilter
                    label={selectedType || "Тип на недвижност"}
                    active={!!selectedType}
                >
                    {["Стан", "Куќа", "Деловен простор"].map((type) => (
                        <button
                            key={type}
                            onClick={() =>
                                updateFilters({
                                    type: selectedType === type ? null : type,
                                })
                            }
                            className={`block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100
                ${
                                selectedType === type
                                    ? "bg-gray-100 font-medium"
                                    : ""
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </DropdownFilter>

                {/* Listing Type */}
                <DropdownFilter
                    label={selectedListing || "Тип на оглас"}
                    active={!!selectedListing}
                >
                    {["Продажба", "Издавање"].map((listing) => (
                        <button
                            key={listing}
                            onClick={() =>
                                updateFilters({
                                    listing:
                                        selectedListing === listing ? null : listing,
                                })
                            }
                            className={`block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100
                ${
                                selectedListing === listing
                                    ? "bg-gray-100 font-medium"
                                    : ""
                            }`}
                        >
                            {listing}
                        </button>
                    ))}
                </DropdownFilter>

                {/* Rooms */}
                <DropdownFilter
                    label={
                        selectedRooms ? `${selectedRooms} соби` : "Број на соби"
                    }
                    active={!!selectedRooms}
                >
                    {[1, 2, 3, 4, 5].map((room) => (
                        <button
                            key={room}
                            onClick={() =>
                                updateFilters({
                                    rooms:
                                        selectedRooms === String(room)
                                            ? null
                                            : String(room),
                                })
                            }
                            className={`block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100
                ${
                                selectedRooms === String(room)
                                    ? "bg-gray-100 font-medium"
                                    : ""
                            }`}
                        >
                            {room} соби
                        </button>
                    ))}
                </DropdownFilter>

            </div>
            <div className="w-full lg:w-auto shrink-0">
                <a
                    href="/create"
                    className="
        block
        w-full
        lg:w-auto
        whitespace-nowrap
        text-center
        bg-[#B23A3A]
        text-white
        px-6
        py-2
        rounded-md
        hover:opacity-90
        transition
    "
                >
                    Креирај оглас
                </a>
                </div>
        </div>

    )
}