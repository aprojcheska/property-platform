export function mapPropertyToCard(p: any) {
    return {
        id: p.id,
        title: p.title,
        subtitle: p.detailed_location + `, ${p.city || ""}`,
        price: Number(p.price),
        listingType: p.listing_type,
        propertyType: p.property_type,
        image:
            p.images?.length > 0
                ? p.images[0].image_url
                : "/placeholder.jpg",
    }
}