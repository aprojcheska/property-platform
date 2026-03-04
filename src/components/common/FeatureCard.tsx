import Image from "next/image"
import { Button } from "@/components/ui/button"

type Props = {
    item: {
        image: string
        title: string
        subtitle: string
        description: string
    }
}

export function FeatureCard({ item }: Props) {
    return (
        <div className="flex flex-col overflow-hidden">

            <div className="relative aspect-4/3 w-full">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-xs"
                />
            </div>

            <div className="flex flex-col flex-1">
                <h3 className="text-lg mt-4"
                style={{fontFamily: "Poppins"}}>
                    {item.title}
                </h3>
                <h5 className="text-xs text-gray-400 mt-1">
                    {item.subtitle}
                </h5>

                <p className="mt-4 text-sm text-gray-600 flex-1">
                    {item.description}
                </p>

                <Button
                    variant="link"
                    className="mt-4 self-start px-0 text-[#F32747] cursor-pointer"
                >
                    Read More
                </Button>
            </div>
        </div>
    )
}
