import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/actions/user/get-users";

interface UseGetUsers {
    token: string;
}

export const useGetUsers = ({ token }: { token: string }) => {
    const query = useQuery({
        queryKey: ["get_users"],
        queryFn: async () => await getAllUsers({ token })
    })
    return query;
}