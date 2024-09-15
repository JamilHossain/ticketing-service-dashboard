"use server";

import { UseEditUserProps } from "@/hooks/user/use-edit-user";

import { UseCreateUserProps } from "@/hooks/user/use-create-user";

export const editUser = async (data: UseEditUserProps, id: string | undefined, token: string | undefined) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/user/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            ...data
        })
    })

    return await req.json()
};
