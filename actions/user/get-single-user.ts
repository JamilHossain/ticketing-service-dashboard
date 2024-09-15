"use server";

export const getSingleUser = async (id: string | undefined, token: string | undefined) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })

    const data = await response.json();

    if (!data) {
        throw new Error("Failed to fetch plan")
    }

    return data;
};
