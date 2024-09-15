import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deleteUsers } from "@/actions/user/delete-users";

export interface UseGetUserToken {
    token: string;
}
export interface UseDeleteUsers {
    row: number[]
}

export const useDeleteUsers = ({ token }: UseGetUserToken) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: UseDeleteUsers) => await deleteUsers(data, token),
        onSuccess: () => {
            toast.success('Successfully Users Deleted')
            queryClient.invalidateQueries({ queryKey: ["get_users"] })

        },
        onError: () => {
            toast.error('something went wrong')
            queryClient.invalidateQueries({ queryKey: ["get_users"] })
        }
    })
    return mutation;
}