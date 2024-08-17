"use client";

import { useState } from "react";

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { useGetTickets } from "@/hooks/ticket/use-get-tickets"
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/ticket/columns'

import Loader from '@/components/loader';

import { TicketsType } from "@/components/ticket/columns";

interface TicketListProps {
    token: string;
}

interface DateProps {
    from: Date;
    to: Date;
}

type FilteredData = TicketsType[] | null;

const TicketList: React.FC<TicketListProps> = ({
    token
}) => {
    const { data, isLoading } = useGetTickets({ token });

    const [dataByFilter, setDataByFilter] = useState<FilteredData>(null);

    const filterByDate = async (date: DateProps) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/ticket/filter?from=${date.from.toISOString()}&to=${date.to.toISOString()}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        })

        const dataFromFilter = await res.json();

        setDataByFilter(dataFromFilter)
        return dataFromFilter;
    }

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`Ticket List (${data.length})`}
                    description="Manage Ticket for Ticketing Service"
                />
            </div>
            <Separator />
            <DataTable
                filterKey='name'
                filterByDate={filterByDate}
                setDataByFilter={setDataByFilter}
                columns={columns}
                data={dataByFilter || data}
            />
        </div>
    )
}

export default TicketList