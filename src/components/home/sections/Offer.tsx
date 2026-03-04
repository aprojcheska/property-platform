import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Offer() {
    return (
        <section className="relative py-32 overflow-hidden">
            <div
                className="absolute inset-0 -z-10 bg-[#F6F9FB]"
                style={{
                    clipPath: "polygon(0 4%, 100% 12%, 100% 96%, 0 88%)",
                }}
            />

            <div className="mx-auto max-w-7xl px-4">
                <div className="grid items-center gap-12
                        grid-cols-1
                        lg:grid-cols-2">

                    <div className="relative w-full aspect-4/3 overflow-hidden">
                        <Image
                            src="/property-4.jpg"
                            alt="Modern property"
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div>
                    <span className="text-sm text-[#F32747] font-semibold tracking-wide">
                      What we offer
                    </span>

                        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight"
                            style={{fontFamily: "Poppins"}}>
                            Buying and Selling All
                            <br className="hidden sm:block" />
                            in One Place
                        </h2>

                        <p className="mt-6 text-gray-600 leading-relaxed max-w-xl">
                            Connectivity and comfort are key to the ideal home office.
                            Here we offer some tips to create the almost all the walls
                            and rich ceilings in your share house are key to the leading
                            creatives and expert ideal home office.
                        </p>

                        <Button className="mt-8 bg-[#F32747] hover:bg-[#d81f3a] rounded-xs cursor-pointer"
                                style={{fontFamily: "Poppins"}}>
                            Explore More
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    )
}
