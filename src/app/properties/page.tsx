import {prisma} from "@/lib/prisma"
import {PropertyCard} from "@/components/properties/PropertyCard"
import {PageHeader} from "@/components/common/PageHeader"
import {PropertiesSection} from "@/components/properties/PropertiesSection";
import {NavBar} from "@/components/layout/NavBar";
import {FilterSection} from "@/components/properties/FilterSection";
import {ActiveFilters} from "@/components/properties/ActiveFilters";
import {mapPropertyToCard} from "@/lib/mapPropertyToCard";

const PER_PAGE = 8

export default async function PropertiesPage({
                                                 searchParams,
                                             }: {
    searchParams: Promise<{
        page?: string
        type?: string
        listing?: string
        rooms?: string
    }>
}) {
    const params = await searchParams
    const currentPage = Number(params?.page || 1)
    const skip = (currentPage - 1) * PER_PAGE
    const propertyTypes = params?.type?.split(",") || []
    const listingType = params?.listing || null
    const rooms = params?.rooms ? Number(params.rooms) : null

    // Get properties with first image
    const where: any = {}

    if (propertyTypes.length > 0) {
        where.property_type = {
            in: propertyTypes,
        }
    }

    if (listingType) {
        where.listing_type = listingType
    }

    if (rooms !== null) {
        where.rooms = rooms
    }

    const properties = await prisma.properties.findMany({
        where,
        take: PER_PAGE,
        skip,
        orderBy: { created_at: "desc" },
        include: {
            images: {
                orderBy: { position: "asc" },
            },
        },
    })

    console.log("PROPERTIES: ", properties)

    const totalCount = await prisma.properties.count({
        where,
    })
    const totalPages = Math.ceil(totalCount / PER_PAGE)

    // Map DB → Card shape
    const mapped = properties.map(mapPropertyToCard)

    return (
        <div className="bg-gray-50 min-h-screen">
            <NavBar />

            <div className="pt-24 sm:pt-32 w-full px-4 sm:max-w-[90%] sm:mx-auto">
                <FilterSection />
                <ActiveFilters />
            </div>

            <div className="w-full px-4 sm:max-w-[90%] sm:mx-auto">
            <PropertiesSection
                properties={mapped}
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/properties"
                showActionButtons={false}
            />
            </div>
        </div>
    )
}
