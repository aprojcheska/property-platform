"use client"

import Link from "next/link"
import { Menu, Home, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export function NavBar() {
    const pathname = usePathname()
    const { data: session } = useSession()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { label: "Дома", href: "/" },
        { label: "Огласи", href: "/properties" },
        { label: "За Нас", href: "/about" },
    ]

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white/70 backdrop-blur-lg shadow-sm"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

                <Link href="/" className="text-[#B23A3A]">
                    <Home className="h-6 w-6" />
                </Link>

                <nav
                    className={`hidden md:flex items-center gap-20 text-lg font-medium transition-all duration-300
          ${
                        isScrolled
                            ? ""
                            : "bg-white/70 rounded-full px-10 py-2 shadow-sm"
                    }`}
                >
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative pb-1 transition-colors
                ${
                                    isActive
                                        ? "text-[#B23A3A]"
                                        : "text-[#303c51] hover:text-[#B23A3A]"
                                }`}
                            >
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* RIGHT – PROFILE ICON */}
                <div className="flex items-center gap-4">

                    <Link
                        href={session ? "/profile" : "/login"}
                        className="text-[#B23A3A] hover:text-[#B23A3A] transition-colors"
                    >
                        <User className="h-6 w-6" />
                    </Link>

                    {/* MOBILE MENU */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6 text-[#B23A3A]" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent
                                side="right"
                                className="bg-white text-[#B23A3A] w-[70%] max-w-sm"
                            >
                                <div className="flex items-center justify-between mb-8">
                                    <Home className="h-6 w-6" />
                                </div>

                                <nav className="flex flex-col gap-6 text-lg">
                                    {navLinks.map((link) => {
                                        const isActive = pathname === link.href

                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={`transition-colors
                          ${
                                                    isActive
                                                        ? "text-[#B23A3A]"
                                                        : "hover:text-[#B23A3A]"
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        )
                                    })}

                                    <Link
                                        href={session ? "/profile" : "/login"}
                                        className="hover:text-[#B23A3A]"
                                    >
                                        {session ? "Профил" : "Најава"}
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}