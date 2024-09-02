"use server";
import { DateProps } from "@/components/ticket/ticket-list";

export const getTicketsByDate = async ({ date, token }: { date: DateProps; token: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/ticket/filter?from=${date.from.toISOString()}&to=${date.to.toISOString()}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    })

    const data = await res.json();

    return data;
} 