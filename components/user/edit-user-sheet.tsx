"use client";

import { z } from "zod";
import { useTransition } from "react";
import { toast } from "sonner";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { editUser } from "@/hooks/user/edit-user";
import UserForm, { UserSchema } from "@/components/user/user-form";
import { useEditUser } from "@/hooks/user/use-edit-user";
import { useGetUser } from "@/hooks/use-get-user";
import Loader from "@/components/loader";
import { useCurrentUser } from "@/hooks/use-current-user";

const EditUserSheet = () => {
    const user = useCurrentUser();
    const { isOpen, onClose, id } = editUser();
    const [isPending, startTransition] = useTransition();
    const token = user?.accessToken;
    const { isLoading, data } = useGetUser({ id, token });
    const mutation = useEditUser({ id, token });

    console.log(data)

    const defaultValues = data ? {
        email: data.email,
        password: '',
    } : {
        email: '',
        password: '',
    }

    const editSubscriptionPlan = async (data: z.infer<typeof UserSchema>) => {
        const resData = await mutation.mutateAsync(data);
        if (resData.error) {
            return { error: "User update failed!" };
        }
        return { success: "User updated successfully" };
    };

    const onSubmit = (data: z.infer<typeof UserSchema>) => {
        startTransition(() => {
            const promise = editSubscriptionPlan(data);
            toast.promise(promise, {
                loading: "Updating User...",
                success: (data) => {
                    if ("error" in data) {
                        return `Updating User failed: ${data.error}`;
                    } else {
                        return `Updating User successful: ${data.success}`;
                    }
                },
                error: "An unexpected error occurred",
            });
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>Edit User</SheetTitle>
                    <SheetDescription>
                        Update existing User for your ticketing system
                    </SheetDescription>
                </SheetHeader>
                {isLoading ? (
                    <Loader />
                ) : (
                    <UserForm
                        id={id}
                        onSubmit={onSubmit}
                        disabled={isPending}
                        defaultValues={defaultValues}
                    />
                )}
            </SheetContent>
        </Sheet>
    );
};

export default EditUserSheet;