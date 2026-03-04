"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {House} from "lucide-react";

function UserExplanation() {
    return (
        <div>
            <h3 className="font-semibold mb-2">
                Регистрирајте се како Регуларен Корисник
            </h3>
            <ul className="opacity-80 text-sm space-y-1">
                <li>• Лесно креирање огласи</li>
                <li>• Професионална презентација</li>
                <li>• Директна комуникација</li>
                <li>• Контрола на огласите</li>
            </ul>
        </div>
    )
}

function AgencyExplanation() {
    return (
        <div>
            <h3 className="font-semibold mb-2">
                Регистрирајте се како Агенција
            </h3>
            <ul className="opacity-80 text-sm space-y-1">
                <li>• Посебен профил за агенција</li>
                <li>• Централизирано управување</li>
                <li>• Засилена видливост</li>
                <li>• Премиум функционалности</li>
            </ul>
        </div>
    )
}

export default function RegisterPage() {
    const router = useRouter()

    const [role, setRole] = useState<"USER" | "AGENCY">("USER")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [showMore, setShowMore] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Лозинките не се совпаѓаат")
            return
        }

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role }),
        })

        if (!res.ok) {
            const text = await res.text()
            setError(text)
            return
        }

        router.push("/login")
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
                style={{ backgroundImage: "url('/blury_bg.jpg')" }}
            />

            {/* Blue tilted block */}
            <div
                className="absolute inset-0 bg-[#303c51]"
                style={{
                    clipPath: "polygon(0 0, 55% 0, 45% 100%, 0% 100%)",
                }}
            />

            <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 py-16">

                <div className="text-white flex flex-col justify-center space-y-6 text-center">

                    <div className="text-4xl flex justify-center">
                        <House size={48} className="text-[#e43b3b]" />
                    </div>

                    <p className="text-lg leading-relaxed opacity-90 max-w-xl mx-auto lg:mx-0">
                        Придружете ни се во создавање модерно, транспарентно и
                        професионално искуство при купување и продавање недвижности.
                    </p>

                    {/* Desktop full text */}
                    <div className="hidden lg:block space-y-6 max-w-xl">
                        <UserExplanation />
                        <AgencyExplanation />
                    </div>

                    {/* Mobile Show More */}
                    <div className="lg:hidden">
                        {showMore && (
                            <div className="space-y-6 mt-4">
                                <UserExplanation />
                                <AgencyExplanation />
                            </div>
                        )}

                        <button
                            onClick={() => setShowMore(!showMore)}
                            className="mt-4 underline text-sm opacity-90"
                        >
                            {showMore ? "Прикажи помалку" : "Прикажи повеќе"}
                        </button>
                    </div>
                </div>
                <div>
                <div className="bg-white/90 rounded-2xl shadow-xl p-10 border border-[#303c51]">
                    <h2 className="text-2xl font-semibold mb-6 text-center">
                        Регистрирај се
                    </h2>

                    <h4 className="text-center mb-4">Избери тип на корисник</h4>
                    <div className="flex gap-4 mb-6">
                        <button
                            type="button"
                            onClick={() => setRole("USER")}
                            className={`flex-1 py-2 rounded-lg border transition cursor-pointer
                                ${role === "USER"
                                ? "bg-[#303c51] text-white"
                                : "border-gray-400"}
                            `}
                        >
                            Регуларен
                        </button>

                        <button
                            type="button"
                            onClick={() => setRole("AGENCY")}
                            className={`flex-1 py-2 rounded-lg border transition cursor-pointer
                                ${role === "AGENCY"
                                ? "bg-[#303c51] text-white"
                                : "border-gray-400"}
                            `}
                        >
                            Агенција
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                            type="text"
                            placeholder="Име на профилот"
                            className="w-full border rounded-lg px-4 py-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            type="email"
                            placeholder="Е-маил"
                            className="w-full border rounded-lg px-4 py-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Лозинка"
                            className="w-full border rounded-lg px-4 py-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Потврди лозинка"
                            className="w-full border rounded-lg px-4 py-2"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-[#303c51] text-white py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer"
                        >
                            Регистрирај се
                        </button>
                    </form>
                </div>
                <p className="text-white text-sm text-center">Ако веќе имате креирано профил, продолижете <a href="/login" className="underline font-bold">кон најава</a></p>
                </div>
            </div>
        </div>
    )
}
