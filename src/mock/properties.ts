export const properties = Array.from({ length: 18 }).map((_, i) => ({
    id: i + 1,
    title: "Модерен стан во Центар",
    subtitle: "Скопје • 85 m² • 2 Спални",
    price: 750,
    listingType: i % 2 === 0 ? "Изнајмување" : "Продажба",
    propertyType: "Стан",
    image: "/property-1.jpg"

}))

export const property = {
    id: 1,
    title: "Модерен стан во центарот на Скопје",
    location: "Центар, Скопје",
    price: 750,
    listingType: "Изнајмнува",
    propertyType: "Стан",
    images: [
        "/property-1.jpg",
        "/property-2.jpg",
        "/property-3.jpg",
    ],
    mainInfo: {
        area: 85,
        rooms: 3,
        bedrooms: 2,
        bathrooms: 1,
        floor: 4,
    },
    additionalInfo: {
        terrace: true,
        parking: true,
        elevator: true,
        furnished: true,
        heating: "Централно",
        orientation: "Јужна",
        yearBuilt: 2018,
    },
    description:
        "Овој модерен и светол стан се наоѓа на одлична локација во централното градско подрачје, во мирна и уредена зграда со лифт. Станот е со површина од 85 м² и нуди функционален распоред кој обезбедува удобност и практичност за секојдневно живеење.\n" +
        "\n" +
        "Располага со пространа дневна соба со излез на тераса, која овозможува доволно природна светлина во текот на целиот ден, како и пријатен простор за одмор или дружење. Кујната е модерно опремена и поврзана со трпезаријата, што го прави просторот идеален за семејни оброци или пријатни вечери со пријатели. Станот има две комфорни спални соби, целосно опремена бања, како и дополнителен простор за складирање.",
    contact: {
        name: "Angela Projcheska",
        phone: "+389 70 123 456",
        email: "contact@property.mk",
    },
}