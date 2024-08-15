"use client";

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { useGetTickets } from "@/hooks/ticket/use-get-tickets"
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/ticket/columns'

import Loader from '@/components/loader';

type Ticket = {
    Ticket: number;
    Rating: number;
}

interface TicketListProps {
    token: string;
}

const TicketList: React.FC<TicketListProps> = ({
    token
}) => {
    const { data, isLoading } = useGetTickets({ token });

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
                columns={columns}
                data={data}
            />
        </div>
    )
}

export default TicketList