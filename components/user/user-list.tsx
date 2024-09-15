"use client";

import { MdCreateNewFolder } from "react-icons/md"
import { Heading } from "@/components/ui/heading"
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import { useGetUsers } from "@/hooks/user/use-get-users"
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/user/columns'
import { useDeleteUsers } from '@/hooks/user/use-delete-users';

import Loader from '@/components/loader';
import { addUser } from '@/hooks/user/add-user';

interface UserListProps {
    token: string;
}

const UserList: React.FC<UserListProps> = ({
    token
}) => {
    const { data, isLoading } = useGetUsers({ token });
    const deleteSubscription = useDeleteUsers({ token });
    const { onOpen } = addUser()

    if (isLoading) {
        return (
            <Loader />
        )
    }
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex items-center justify-between'>
                <Heading
                    title={`User List (${data.length})`}
                    description="Manage User for ASD ticketing system"
                />

                <Button onClick={onOpen} className="px-1" variant={'outline'}>
                    <MdCreateNewFolder className="w-7 h-7" />
                </Button>

            </div>
            <Separator />
            <DataTable
                onDelete={(row) => {
                    deleteSubscription.mutate({ row })
                }}
                filterKey='email'
                columns={columns}
                data={data}
                status={true}
                disabled={deleteSubscription.isPending || isLoading}
            />
        </div>
    )
}

export default UserList