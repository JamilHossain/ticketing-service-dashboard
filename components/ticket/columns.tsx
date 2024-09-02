"use client"

import { ColumnDef } from "@tanstack/react-table"

export type TicketsType = {
    Ticket    : string
    Rating    : string
    createdAt ?: string
    updatedAt ?: string;
}

export const columns: ColumnDef<TicketsType>[] = [
    {
        accessorKey: "Ticket",
        header: "Ticket",
    },
    {
        accessorKey: "Rating",
        header: "Rating",
    },
    {
        accessorKey:"updatedAt",
        header:"Date"
    }
]
