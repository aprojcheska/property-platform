import {getServerSession} from "next-auth"
import {authOptions} from "@/lib/auth-options"
import {prisma} from "@/lib/prisma"
import {redirect} from "next/navigation"
import {PropertiesSection} from "@/components/properties/PropertiesSection"
import {LogoutButton} from "@/components/auth/LogoutButton";
import {mapPropertyToCard} from "@/lib/mapPropertyToCard";
import {NavBar} from "@/components/layout/NavBar";
import {StatisticsSection} from "@/components/common/StatisticsSection";
import {AgentsSection} from "@/components/common/AgentsSection";
import {ProfileSettingsModal} from "@/components/common/ProfileSettingsModal";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        redirect("/login")
    }

    const userProperties = await prisma.properties.findMany({
        where: {userId: session.user.id},
        orderBy: {created_at: "desc"},
        include: {
            images: {
                orderBy: {position: "asc"},
            },
        },
    })

    const mapped = userProperties.map(mapPropertyToCard)

    async function handleDelete(id: string) {
        const confirmed = confirm("Дали сте сигурни?")

        if (!confirmed) return

        const res = await fetch(`/api/properties/${id}`, {
            method: "DELETE",
        })

        if (!res.ok) {
            alert("Грешка при бришење")
            return
        }
        redirect("/profile")

    }

    return (
        <div>
            <NavBar/>

            <div className="py-6 sm:h-52 lg:h-56 relative flex items-end sm:items-end bg-[#2F3B52]">
                {session.user.role === "AGENCY" && (
                    <img
                        src="/banner.png"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
                {/*{session.user.banner && (*/}

                {/*)}*/}

                <div className="relative w-full px-4 sm:max-w-[90%] sm:mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center items-center gap-4 pb-6">

                    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-6 text-center sm:text-left">
                        <div
                            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden bg-[#B23A3A] flex items-center justify-center">
                            {session.user.image ? (
                                <img
                                    src={session.user.image}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-white text-4xl">
                                  {session.user.name?.charAt(0)}
                                </span>
                            )}
                        </div>

                        <h1 className="text-white text-lg sm:text-2xl lg:text-3xl font-semibold">
                            {session.user.name}
                        </h1>
                    </div>

                    <div className="flex flex-row gap-3 w-full sm:w-auto justify-center sm:justify-end mt-3 sm:mt-3">
                        <ProfileSettingsModal user={session.user} />
                        <LogoutButton/>
                    </div>
                </div>
            </div>
            <div className="w-full px-4 sm:max-w-[90%] sm:mx-auto mt-6 sm:mt-8 space-y-6 sm:space-y-8">

                {session.user.role === "AGENCY" && (
                    <StatisticsSection/>
                )}

                <PropertiesSection
                    title="Активни огласи"
                    properties={mapped}
                    showActionButtons={true}
                />

                {session.user.role === "AGENCY" && (
                    <div className="bg-gray-50 text-gray-600 rounded-xl my-6 sm:my-8 p-4 sm:p-6 text-center sm:text-left">
                        <h4 className="font-semibold mb-3">За Агенцијата</h4>
                        <p>
                            Ние сме современа агенција за недвижности посветена на обезбедување сигурно, транспарентно и
                            ефикасно искуство при купување, продажба и изнајмување на имот. Со долгогодишно искуство и
                            тим од посветени агенти, им помагаме на нашите клиенти да ја донесат најдобрата одлука за
                            нивната иднина. Нудиме внимателно селектирани премиум понуди и индивидуален пристап кон
                            секој
                            клиент. Вашиот нов дом или инвестиција започнува тука.
                        </p>
                    </div>
                )}
                {session.user.role === "AGENCY" && (
                    <div className="my-8">
                        <AgentsSection/>
                    </div>
                )}
            </div>
        </div>
    )
}