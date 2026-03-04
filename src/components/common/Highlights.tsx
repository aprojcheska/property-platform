import {Home, BedDouble, Ruler, Handshake} from "lucide-react"

export function Highlights({
                               propertyType,
                               area,
                               listingType,
                               bedrooms,
                           }: {
    propertyType?: string
    area?: number | null
    listingType?: string
    bedrooms?: number | null
}) {
    const items = [
        { label: "Тип", value: propertyType, icon: Home },
        { label: "Големина", value: area ? `${area} m²` : "-" , icon: Ruler },
        { label: "Се", value: listingType, icon: Handshake },
        { label: "Спални соби", value: bedrooms ?? "-" , icon: BedDouble },

    ]

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {items.map(({ label, value, icon: Icon }) => (
                <div
                    key={label}
                    className="bg-white rounded-xl p-5 shadow-sm
                     hover:shadow-md transition
                     flex flex-col items-center text-center"
                >
                    <Icon className="text-[#B23A3A] mb-3" size={24} />
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className="font-semibold">{value}</p>
                </div>
            ))}
        </div>
    )
}

