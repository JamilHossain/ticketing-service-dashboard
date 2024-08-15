"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export type SubscriptionType = {
    id: string
    name: string
    bandwidth: string
    price: number
}

export const columns: ColumnDef<SubscriptionType>[] = [
    {
        accessorKey: "Ticket",
        header: "Ticket",
    },
    {
        accessorKey: "Rating",
        header: "Rating",
    },
]
