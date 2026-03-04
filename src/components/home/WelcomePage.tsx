import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {Search} from "lucide-react";
import {NavBar} from "@/components/layout/NavBar";
import {PremiumProperties} from "@/components/home/sections/PremiumProperties";
import {Offer} from "@/components/home/sections/Offer";
import {Tracking} from "@/components/home/sections/Tracking";

export function WelcomePage() {
    return (
        // outer div for the whole page
        <div>
            <div className="relative min-h-screen flex items-center justify-center">

                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/welcome_bg.jpg')",
                    }}
                />
                <div className="absolute inset-0 bg-gray-800/40" />
                <NavBar />
                <div className="relative z-10 text-center text-white px-4">
                    <div className="font-heading font-extrabold leading-tight
                  text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[70px]"
                >
                        <h1>Место Каде Што Почнува</h1>
                        <h1>Вашата Нова Приказна</h1>
                    </div>

                    <p className="mt-4 max-w-2xl mx-auto
                text-sm sm:text-base md:text-lg
                text-gray-200 leading-relaxed"
                    >
                        Платформа создадена за едноставно, транспарентно и професионално купување, продавање и изнајмување недвижности.
                        Пребарајте внимателно селектирани огласи или објавете го Вашиот имот
                        со само неколку чекори.
                    </p>

                    <div className="flex items-center justify-center w-full mt-6">
                        <InputGroup className="w-full max-w-xs sm:max-w-md md:max-w-xl bg-white text-black rounded-sm">
                            <InputGroupInput placeholder="Search..." />
                            <InputGroupAddon
                                className="bg-[#B23A3A] rounded-r-sm text-white px-4 mr-0.5 cursor-pointer flex items-center"
                                align="inline-end"
                            >
                                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="/properties"
                            className="bg-[#B23A3A] text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition w-full sm:w-auto text-center"
                        >
                            Прегледај огласи
                        </a>

                        <a
                            href="/create"
                            className="
            bg-[#303c51]
            text-white
            px-8 py-3
            rounded-md
            font-semibold
            hover:opacity-90
            transition
            w-full sm:w-auto
            text-center
        "
                        >
                            Објави оглас
                        </a>
                    </div>
                </div>
            </div>
            <PremiumProperties />
        </div>
    )
}