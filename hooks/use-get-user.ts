import { useQuery } from "@tanstack/react-query";

interface UseGetUserProps {
    id?: string;
    token?: string;
}

export const useGetUser = ({ id, token }: UseGetUserProps) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["single-user", { id }],
        queryFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            
            const data  = await response.json();

            if (!data) {
                throw new Error("Failed to fetch plan")
            }

            return data;
        }
    })

    return query;
}