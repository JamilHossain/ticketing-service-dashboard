import { useQuery } from "@tanstack/react-query";
import { getSingleUser } from "@/actions/user/get-single-user";

interface UseGetUserProps {
    id?: string;
    token?: string;
}

export const useGetUser = ({ id, token }: UseGetUserProps) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["single-user", { id }],
        queryFn: async () => await getSingleUser(id, token)
    })

    return query;
}