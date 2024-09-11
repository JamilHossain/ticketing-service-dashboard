"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export type TicketsType = {
    Ticket: string
    Rating: string
    TicketUrl?: string
    createdAt?: string
    updatedAt?: string;
}

export const columns: ColumnDef<TicketsType>[] = [
    {
        accessorKey: "Ticket",
        header: "Ticket",
        cell: ({ row }) => {
            const ticketUrl = row.original.TicketUrl;
            const ticketValue = row.getValue("Ticket") as string;

            // Check if the TicketUrl is not null, undefined, or the string "undefined"
            const isValidUrl = ticketUrl && ticketUrl !== "undefined";

            return (
                <div className="capitalize">
                    {isValidUrl ? (
                        <Link href={ticketUrl} className="underline text-blue-300" target="_blank" rel="noopener noreferrer">
                            {ticketValue}
                        </Link>
                    ) : (
                        <>{ticketValue}</>
                    )}
                </div>
            );
        },
    },
    {
        accessorKey: "Rating",
        header: "Rating",
    },
    {
        accessorKey: "updatedAt",
        header: "Date"
    }
]


