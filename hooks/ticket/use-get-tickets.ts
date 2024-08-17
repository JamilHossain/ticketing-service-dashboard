import { useQuery } from "@tanstack/react-query";

interface UseGetTickets {
    token: string;
}

export const useGetTickets = ({token}:{token:string}) => {
    const query = useQuery({
        queryKey: ["get_tickets"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/ticket`,{
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`, 
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error("Failed to fetch images");
            }
            const  data  = await res.json();

            return data;
        },
    })
    return query;
}