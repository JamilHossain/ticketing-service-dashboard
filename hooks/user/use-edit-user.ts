import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "@/actions/user/edit-user";

export interface UseEditUserProps {
    email: string;
    password: string;
}

interface UseGetUserProps {
    id?: string;
    token?: string;
}

export const useEditUser = ({ id, token }: UseGetUserProps) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: UseEditUserProps) => await editUser(data, id, token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get_users"] })
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["get_users"] })
        }
    })
    return mutation;
}