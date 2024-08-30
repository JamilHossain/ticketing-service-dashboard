import { useQuery } from "@tanstack/react-query";
import { getAllTickets } from "@/actions/get-tickets";

interface UseGetTickets {
    token: string;
}

export const useGetTickets = ({token}:{token:string}) => {
    const query = useQuery({
        queryKey: ["get_tickets"],
        queryFn: ()=>getAllTickets({token})
    })
    return query;
}