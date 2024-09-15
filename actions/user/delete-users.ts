"use server";

import { UseDeleteUsers } from "@/hooks/user/use-delete-users";

export const deleteUsers = async (data: UseDeleteUsers, token: string) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/user`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ids: data.row })
    })

    return await req.json()
};
