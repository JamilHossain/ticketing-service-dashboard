import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/actions/user/create-user";

export interface UseCreateUserProps {
    email: string;
    password: string;
}

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: UseCreateUserProps) => await createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get_users"] })
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: ["get_users"] })
        }
    })
    return mutation;
}