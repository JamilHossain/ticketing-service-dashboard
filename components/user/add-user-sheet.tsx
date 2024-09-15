"use client";

import { z } from "zod"
import { useTransition } from "react"
import { toast } from "sonner"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { addUser } from "@/hooks/user/add-user"
import { UserSchema } from "@/components/user/user-form"
import UserForm from "@/components/user/user-form";
import { useCreateUser } from "@/hooks/user/use-create-user";
import { useCurrentUser } from "@/hooks/use-current-user";

const AddUserSheet = () => {
    const user = useCurrentUser();
    const { isOpen, onClose } = addUser()
    const [isPending, startTransition] = useTransition();

    const mutation = useCreateUser()

    const createUser = async (data: z.infer<typeof UserSchema>) => {
        const resData = await mutation.mutateAsync(data, {
            onSuccess: () => {
                onClose()
            }
        })

        if (resData.error) {
            return { error: 'User create failed!' }
        }

        return { success: 'User create successfully' }
    }

    const onSubmit = (data: z.infer<typeof UserSchema>) => {
        startTransition(() => {
            const promise = createUser(data)

            toast.promise(promise, {
                loading: 'Creating User...',
                success: (data) => {
                    if (data.error) {
                        return `Creating User failed: ${data.error}`
                    } else {

                        return `Creating User successful: ${data.success}`
                    }
                },
                error: 'An unexpected error occurred',
            })
        });
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Add User
                    </SheetTitle>
                    <SheetDescription>
                        Create a new User for your tickiting service
                    </SheetDescription>
                </SheetHeader>
                <UserForm
                    onSubmit={onSubmit} disabled={isPending}
                />
            </SheetContent>
        </Sheet>
    )
}

export default AddUserSheet