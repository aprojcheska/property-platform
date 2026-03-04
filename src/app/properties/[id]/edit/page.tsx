import {prisma} from "@/lib/prisma"
import {getServerSession} from "next-auth"
import {authOptions} from "@/lib/auth-options"
import {redirect, notFound} from "next/navigation"
import {CreatePropertyForm} from "@/components/properties/CreatePropertyForm"
import {NavBar} from "@/components/layout/NavBar";

export default async function EditPropertyPage({
                                                   params,
                                               }: {
    params: Promise<{ id: string }>
}) {
    const {id} = await params
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        redirect("/login")
    }

    const property = await prisma.properties.findUnique({
        where: {id},
        include: {
            images: true,
        },
    })

    if (!property) {
        notFound()
    }

    if (property.userId !== session.user.id) {
        redirect("/profile")
    }

    return (
        <div className="relative min-h-screen overflow-hidden">

            <div
                className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
                style={{backgroundImage: "url('/blury_bg.jpg')"}}
            />

            <div
                className="absolute inset-0 bg-[#303c51]"
                style={{
                    clipPath: "polygon(0 0, 55% 0, 45% 100%, 0% 100%)",
                }}
            />
            <NavBar/>

            <div className="relative z-10 py-32">
                <div
                    className="mx-auto max-w-[90%] lg:max-w-[80%] bg-white p-8 rounded-2xl shadow-xl border border-[#B23A3A]">
                    <h1 className="text-center text-3xl text-[#303c51] font-semibold mb-10">
                         Измени оглас
                    </h1>

                    <CreatePropertyForm
                        initialData={{
                            ...property,
                            price: Number(property.price),
                        }}
                        isEditMode
                    />
                </div>
            </div>
        </div>
    )
}