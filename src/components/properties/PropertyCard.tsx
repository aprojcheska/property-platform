'use client'

import Image from "next/image"
import Link from "next/link"
import {useRouter} from "next/navigation";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {ReactNode} from "react";
import {FrameIcon, StarIcon, Trash, Trash2, Trash2Icon} from "lucide-react";
import {ButtonModal} from "@/components/common/ButtonModal";

type Props = {
    property: {
        id: string
        title: string
        subtitle: string
        price: number
        listingType: string
        propertyType: string
        image: string
    }
    showActions?: boolean
}


function AlertDialogMedia(props: { className: string, children: ReactNode }) {
    return null;
}

export function PropertyCard({property, showActions = false}: Props) {
    const router = useRouter()

    async function handleDelete() {
        const res = await fetch(`/api/properties/${property.id}`, {
            method: "DELETE",
        })

        if (!res.ok) {
            alert("Грешка при бришење")
            return
        }

        router.refresh()
    }
    return (
        <div>
            <Link
                href={`/properties/${property.id}`}
                className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
                <div className="relative h-56">
                    <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover"
                    />

                    <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-[#B23A3A] border border-[#B23A3A] text-xs px-3 py-1 rounded-md">
            {property.listingType}
          </span>
                        <span className="text-[#303c51] border border-[#303c51] text-xs px-3 py-1 rounded-md">
            {property.propertyType}
          </span>
                    </div>
                </div>

                <div className="p-5">
                    <h3 className="font-semibold text-lg group-hover:text-[#B23A3A] max-w-68 truncate transition">
                        {property.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        {property.subtitle}
                    </p>

                    <p className="mt-4 font-semibold text-[#B23A3A]">
                        €{property.price}
                    </p>
                </div>
            </Link>
            {showActions && (
                <div className="flex-1">
                <div className="flex gap-3 mt-4">
                    <Link href={`/properties/${property.id}/edit`}
                    className="text-center flex-1 bg-[#303c51] text-white py-2 rounded-md text-sm hover:opacity-90 transition">
                        Измени
                    </Link>
                    <ButtonModal
                        triggerLabel="Избриши"
                        triggerClassName="flex-1 bg-[#B23A3A] text-white py-2 rounded-md text-sm cursor-pointer hover:bg-[#B22D2D] transition"
                        icon={Trash2Icon}
                        title="Избриши оглас?"
                        description="Овој оглас ќе биде трајно избришан. Оваа акција не може да се врати."
                        actionLabel="Избриши"
                        actionClassName="bg-[#B23A3A] hover:bg-[#B22D2D] text-white cursor-pointer"
                        onConfirm={handleDelete}
                    />
                </div>
                    <div className="mt-2">
                        <ButtonModal
                            triggerLabel="Промовирај"
                            triggerClassName="w-full border border-[#B23A3A] text-[#B23A3A] py-2 rounded-md text-sm hover:bg-gray-50 cursor-pointer transition"
                            icon={StarIcon}
                            title="Промовирај оглас?"
                            description="За оваа акција треба систем за наплата 🙂."
                            actionLabel="Промовирај"
                            actionClassName="bg-[#B23A3A] hover:bg-[#B22D2D] text-white cursor-pointer"
                        />
                    </div>
                </div>


            )}
        </div>
    )
}
