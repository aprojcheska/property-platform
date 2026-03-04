"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type ButtonModalProps = {
    triggerLabel: string
    triggerClassName?: string
    icon?: React.ElementType
    title: string
    description?: string
    actionLabel: string
    actionClassName?: string
    onConfirm?: () => void | Promise<void>
}

export function ButtonModal({
                                triggerLabel,
                                triggerClassName,
                                icon: Icon,
                                title,
                                description,
                                actionLabel,
                                actionClassName,
                                onConfirm,
                            }: ButtonModalProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className={triggerClassName}>
                    {triggerLabel}
                </button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader className="flex items-center gap-3">
                    {Icon && (
                        <Icon className="text-[#B23A3A]" size={22} />
                    )}

                    <AlertDialogTitle>
                        {title}
                    </AlertDialogTitle>

                    {description && (
                        <AlertDialogDescription>
                            {description}
                        </AlertDialogDescription>
                    )}
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                        Откажи
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={onConfirm}
                        className={actionClassName}
                    >
                        {actionLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}