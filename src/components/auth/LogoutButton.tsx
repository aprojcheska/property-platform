"use client"

import { signOut } from "next-auth/react"

export function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-[#B23A3A] text-white px-4 py-1.5 rounded-lg hover:opacity-90 transition"
        >
            Одјави се
        </button>
    )
}
