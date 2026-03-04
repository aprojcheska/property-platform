"use client"

import { useState } from "react"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogTrigger,
    AlertDialogCancel,
    AlertDialogAction, AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useSession} from "next-auth/react";
import {UserRoundPen} from "lucide-react";

export function ProfileSettingsModal({ user }: any) {
    const [name, setName] = useState(user?.name || "")
    const [avatar, setAvatar] = useState<File | null>(null)
    const [banner, setBanner] = useState<File | null>(null)

    const { update } = useSession()

    async function handleSave() {
        const formData = new FormData()
        formData.append("name", name)

        if (avatar) formData.append("avatar", avatar)
        if (banner) formData.append("banner", banner)

        const res = await fetch("/api/profile/update", {
            method: "POST",
            body: formData,
        })

        console.log("RESPONSE", res)

        if (res.ok) {
            await update()
            window.location.reload()
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-[#3D4A62] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg">
                    Поставки
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader className="flex items-center gap-3">
                    <UserRoundPen className="text-[#B23A3A]" />
                    <AlertDialogTitle>
                        Измени профил
                    </AlertDialogTitle>
                </AlertDialogHeader>

                <div className="space-y-4 mt-4">
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Име"
                    />

                    <div>
                        <p className="text-sm mb-1">Слика на профилот</p>
                        <Input
                            type="file"
                            onChange={(e) =>
                                setAvatar(e.target.files?.[0] || null)
                            }
                        />
                    </div>

                    <div>
                        <p className="text-sm mb-1">Банер слика</p>
                        <Input
                            type="file"
                            onChange={(e) =>
                                setBanner(e.target.files?.[0] || null)
                            }
                        />
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Откажи</AlertDialogCancel>
                    <AlertDialogAction asChild className="bg-[#B23A3A] cursor-pointer">
                        <button onClick={handleSave}>
                            Зачувај
                        </button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}