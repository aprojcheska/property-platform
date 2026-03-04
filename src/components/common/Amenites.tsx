import {
    Car,
    Sofa,
    Wind,
    Sun,
    Building2,
} from "lucide-react"

export function Amenities({ property }: { property: any })
 {
     const amenities = []

     if (property.has_terrace)
         amenities.push({ label: "Тераса", icon: Sun })

     if (property.has_parking)
         amenities.push({ label: "Паркинг", icon: Car })

     if (property.has_elevator)
         amenities.push({ label: "Лифт", icon: Building2 })

     if (property.furnished)
         amenities.push({ label: "Опремен", icon: Sofa })

     if (property.klima)
         amenities.push({ label: property.klima, icon: Wind })


     return (
        <section className="mt-12">
            <h2 className="font-semibold text-xl mb-6">Дополнителни погодности</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {amenities.map(({ label, icon: Icon }) => (
                    <div
                        key={label}
                        className="flex items-center gap-3 bg-white rounded-xl p-4
                       shadow-sm hover:shadow-md transition"
                    >
                        <Icon className="text-[#B23A3A]" size={20} />
                        <span className="text-sm font-medium">{label}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}
