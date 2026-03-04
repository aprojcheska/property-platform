"use client"

import { useState } from "react"
import {
    Home,
    Ruler,
    Tag,
    Euro,
    DoorOpen,
    BedDouble,
    Bath,
    Building,
    Compass,
    Calendar,
    Clock,
    Hammer, Sun,
} from "lucide-react"

type InfoItem = {
    label: string
    value: string
    icon: any
}

export function MainInformation({ property }: { property: any }) {
    const [expanded, setExpanded] = useState(false)
    const availableFrom = property.available_from
        ? new Date(property.available_from).toLocaleDateString("en-GB")
        : null

    const rows: InfoItem[][] = [
        [
            { label: "Тип", value: property.property_type, icon: Home },
            { label: "Големина", value: `${property.area_sqm} m²`, icon: Ruler },
            { label: "Тип на оглас", value: property.listing_type, icon: Tag },
            { label: "Цена", value: `€${property.price}`, icon: Euro },

        ],
        [
            { label: "Соби", value: property.rooms, icon: DoorOpen },
            { label: "Спални", value: property.bedrooms, icon: BedDouble },
            { label: "Бањи", value: property.bathrooms, icon: Bath },
            // { label: "Тераса", value: , icon: Sun },
        ],
        [
            { label: "Спрат", value: property.floor, icon: Building },
            { label: "Ориентација", value: property.orientation, icon: Compass },
            { label: "Градба", value: property.year_built, icon: Hammer },
            { label: "Состојба", value: property.condition, icon: Hammer },
        ],
        [
            { label: "Слободен од", value: availableFrom, icon: Calendar },
            { label: "Престој", value: property.stay_duration_months, icon: Clock },
        ],
    ]

    const visibleRows = expanded ? rows : rows.slice(0, 2)

    return (
        <section className="mt-12">
            <h2 className="font-semibold text-xl mb-6">
                Главни информации
            </h2>

            <div className="bg-white rounded-xl shadow-md p-5 sm:p-6">
                <div
                    className="
            grid
            grid-cols-2
            sm:grid-cols-4
            gap-y-6
            sm:gap-y-6
            sm:gap-x-8
        "
                >
                    {visibleRows.flat().map((item, index) => (
                        <div
                            key={item.label}
                            className="
                    flex
                    items-start
                    gap-4
                    py-2
                    sm:py-3
                    sm:border-l
                    sm:border-gray-200
                    sm:pl-6
                    first:sm:border-l-0
                    first:sm:pl-0
                "
                        >
                            <item.icon
                                size={20}
                                className="text-[#B23A3A] shrink-0 mt-1"
                            />

                            <div>
                                <p className="text-xs sm:text-sm text-gray-500">
                                    {item.label}
                                </p>
                                <p className="font-semibold text-sm sm:text-base">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show more */}
                <div className="mt-6 text-center">
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
