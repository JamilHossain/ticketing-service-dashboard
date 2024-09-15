"use client";

import { useState } from "react";

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { useGetTickets } from "@/hooks/ticket/use-get-tickets"
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/ticket/columns'

import Loader from '@/components/loader';

import { TicketsType } from "@/components/ticket/columns";
import dateFormat from "@/lib/date-format";
import { getTicketsByDate } from "@/actions/get-tickets-by-date";

interface TicketListProps {
    token: string;
}

export interface DateProps {
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
        const dataFromFilter = await getTicketsByDate({ date, token })

        setDataByFilter(dateFormat(dataFromFilter))
        return dataFromFilter;
    }

    if (isLoading) {
        return (
            <Loader />
        )
    }

    const tickets = dateFormat(data)

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
                filterKey="rating"
                filterByDate={filterByDate}
                setDataByFilter={setDataByFilter}
                columns={columns}
                status={false}
                data={dataByFilter || tickets}
            />
        </div>
    )
}

export default TicketList