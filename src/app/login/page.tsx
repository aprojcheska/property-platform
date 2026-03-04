"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import {House} from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        await signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: "/profile",
        })
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

            <div
                className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
                style={{ backgroundImage: "url('/blury_bg.jpg')" }}
            />

            <div
                className="absolute inset-0 bg-[#303c51]"
                style={{
                    clipPath: "polygon(0 0, 55% 0, 45% 100%, 0% 100%)",
                }}
            />
            <div className="relative z-10 flex justify-center">
                <div className="-mt-10">
                    <div className="text-4xl flex justify-center mb-10"><House size={48} className="text-[#e43b3b]" /></div>

            <div className="bg-white/90 max-w-[90%] lg:max-w-xl mx-auto rounded-2xl shadow-xl p-10 border border-[#303c51]">
                <h2 className="text-2xl font-semibold mb-6 text-center">
                    Најави се
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border p-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border p-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="w-full bg-[#303c51] text-white py-3 rounded-xl font-medium hover:opacity-90 transition cursor-pointer"
                    >
                        Најави се
                    </button>
                </form>
            </div>
                    <p className="text-white text-sm text-center">Ако немате креирано профил, продолижете <a href="/register" className="underline font-bold">кон регистрација</a></p>
                </div>
            </div>
        </div>

    )
}
