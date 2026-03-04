// app/properties/[id]/page.tsx

import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

import { Gallery } from "@/components/common/Gallery"
import { Highlights } from "@/components/common/Highlights"
import { ContactBox } from "@/components/common/ContactBox"
import { Amenities } from "@/components/common/Amenites"
import { MainInformation } from "@/components/common/MainInformation"
import { DescriptionSection } from "@/components/common/DescriptionSection"
import { MapPin } from "lucide-react"
import {NavBar} from "@/components/layout/NavBar";

export default async function PropertyPage({
                                               params,
                                           }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const rawProperty = await prisma.properties.findUnique({
        where: { id },
        include: {
            images: {
                orderBy: { position: "asc" },
            },
        },
    })

    if (!rawProperty) {
        notFound()
    }


    const property = {
        ...rawProperty,
        price: Number(rawProperty.price),
        available_from: rawProperty.available_from?.toISOString(),
        created_at: rawProperty.created_at?.toISOString(),
        updated_at: rawProperty.updated_at?.toISOString(),
    }
    const images = property.images.map((img) => img.image_url)

    return (
        <section className="py-20 bg-gray-50">
            <NavBar />
            <div className="w-[95%] lg:w-[80%] my-4 mx-auto">
                <Gallery images={images.length > 0 ? images : ["/placeholder.jpg"]} />
            </div>

            <div className="w-[95%] lg:w-[80%] mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <Highlights
                        propertyType={property.property_type}
                        area={property.area_sqm}
                        listingType={property.listing_type}
                        bedrooms={property.bedrooms}
                    />

                    <h1 className="mt-10 text-3xl font-semibold">
                        {property.title}
                    </h1>

                    <div className="flex items-center gap-2">
                        <MapPin className="mt-2 text-[#B23A3A]" size={24} />
                        <p className="text-gray-500 mt-2">
                            {property.detailed_location ||
                                `${property.city || ""}, ${property.country}`}
                        </p>
                    </div>

                    <MainInformation property={property} />

                    <Amenities property={property} />

                    <DescriptionSection
                        description={property.description || ""}
                    />
                </div>

                <div className="relative lg:sticky lg:top-28 h-fit self-start">
                    <ContactBox
                        contact={{
                            name: property.contact_name,
                            phone: property.contact_phone,
                            email: property.contact_email,
                        }}
                    />
                </div>
            </div>
        </section>
    )
}
