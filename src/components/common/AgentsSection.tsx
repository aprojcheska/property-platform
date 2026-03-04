"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import { AddAgentModal } from "./AddAgentModal"

type Agent = {
    id: string
    name: string
    email: string
    phone: string
    image: string
}

function AgentCard({ agent }: { agent: Agent }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 w-[280px]">
            <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden">
                    <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        className="object-cover"
                    />
                </div>

                <h3 className="mt-4 font-semibold text-lg text-[#303c51]">
                    {agent.name}
                </h3>

                <div className="mt-3 space-y-1 text-sm text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                        <Mail size={14} />
                        {agent.email}
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <Phone size={14} />
                        {agent.phone}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function AgentsSection() {
    const agents = [
        {
            id: "1",
            name: "Александра Петрова",
            email: "aleksandra@agency.com",
            phone: "+389 70 123 456",
            image: "/agent1.jpg",
        },
        {
            id: "2",
            name: "Марко Стојанов",
            email: "marko@agency.com",
            phone: "+389 71 987 654",
            image: "/agent2.jpg",
        },
        {
            id: "3",
            name: "Елена Николова",
            email: "elena@agency.com",
            phone: "+389 75 555 222",
            image: "/agent3.jpg",
        },
        {
            id: "4",
            name: "Христијан Марковски",
            email: "hristijan@agency.com",
            phone: "+389 75 555 333",
            image: "/agent4.jpg",
        },
        {
            id: "5",
            name: "Марија Панова",
            email: "marija@agency.com",
            phone: "+389 75 555 321",
            image: "/agent5.jpg",
        },
        {
            id: "6",
            name: "Димитар Ристев",
            email: "dimitar@agency.com",
            phone: "+389 75 555 453",
            image: "/agent6.jpg",
        },
    ]

    return (
        <section className="mt-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#303c51]">
                    Нашите Агенти
                </h2>

                <AddAgentModal />
            </div>

            <Carousel opts={{ align: "start" }}>
                <CarouselContent className="-ml-4 my-8">
                    {agents.map((agent) => (
                        <CarouselItem key={agent.id} className="pl-4 basis-auto">
                            <AgentCard agent={agent} />
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}