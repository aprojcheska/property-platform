import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogTrigger,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function AddAgentModal() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="bg-[#B23A3A] hover:bg-[#B22D2D] cursor-pointer">
                    Додади Агент
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Add New Agent</AlertDialogTitle>
                    <AlertDialogDescription>
                        Пополни ги податоците за агентот подолу.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-4 mt-4">
                    <Input placeholder="Име" />
                    <Input placeholder="Емаил" />
                    <Input placeholder="Телефон" />
                    <Input type="file" />
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Откажи</AlertDialogCancel>
                    <AlertDialogAction className="bg-[#B23A3A] cursor-pointer">
                        Зачувај
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}