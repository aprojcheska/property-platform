import {PropertyCard} from "@/components/properties/PropertyCard"

type PropertiesSectionProps = {
    title?: string
    properties: any[]
    currentPage?: number
    totalPages?: number
    basePath?: string
    showCreateButton?: boolean
    showActionButtons?: boolean
}

export function PropertiesSection({
                                              title,
                                              properties,
                                              currentPage,
                                              totalPages,
                                              basePath = "/properties",
                                              showCreateButton = false,
    showActionButtons = false,
                                          }: PropertiesSectionProps) {
    return (
        <section className="py-6">
            <div className="mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <h1 className="text-3xl md:text-4xl font-semibold">
                        {title}
                    </h1>

                    {showCreateButton && (
                        <a
                            href="/create"
                            className="bg-[#B23A3A] text-white px-6 py-2 rounded-md hover:opacity-90 transition"
                        >
                            Креирај оглас
                        </a>
                    )}
                </div>

                {/* Grid */}
                <div
                    className="
                        grid gap-8
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4
                    "
                >
                    {properties.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            showActions={showActionButtons}
                        />
                    ))}

                </div>


                {/* Pagination */}
                {totalPages && totalPages > 1 && currentPage && (
                    <div className="flex justify-center gap-2 mt-12">
                        {Array.from({ length: totalPages }).map((_, i) => {
                            const pageNumber = i + 1

                            return (
                                <a
                                    key={pageNumber}
                                    href={`${basePath}?page=${pageNumber}`}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition
                                        ${
                                        currentPage === pageNumber
                                            ? "bg-[#B23A3A] text-white"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }
                                    `}
                                >
                                    {pageNumber}
                                </a>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}