import { prisma } from "@/lib/prisma"
import { mapPropertyToCard } from "@/lib/mapPropertyToCard"
import { PropertyCard } from "@/components/properties/PropertyCard"

export async function PremiumProperties() {
    const properties = await prisma.properties.findMany({
        take: 4,
        orderBy: { created_at: "desc" },
        include: {
            images: {
                orderBy: { position: "asc" },
            },
        },
    })

    const mapped = properties.map(mapPropertyToCard)

    return (
        <div className="w-full px-4 sm:max-w-[90%] sm:mx-auto my-16">
            <h1
                className="font-semibold leading-tight
                text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                text-center text-[#303c51]"
            >
                Премиум Огласи
            </h1>

            <p className="text-center mt-4 text-gray-500 max-w-xl mx-auto">
                Избрани недвижности со врвен квалитет и атрактивна локација.
            </p>

            <div
                className="
                grid gap-8 mt-10
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                "
            >
                {mapped.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                    />
                ))}
            </div>
        </div>
    )
}