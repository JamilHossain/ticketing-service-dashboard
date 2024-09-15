"use server";

import { UseCreateUserProps } from "@/hooks/user/use-create-user";

export const createUser = async (data: UseCreateUserProps) => {
    const req = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...data
        })
    })
    const res = await req.json()
    return res;
};
