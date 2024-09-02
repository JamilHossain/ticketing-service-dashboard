import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import { TicketsType } from "@/components/ticket/columns";

const dateFormat = (tickets: TicketsType[]) => {

    const data = tickets.map((ticket: TicketsType) => {
        // Convert to BD Time Zone
        const bdTimeZone = "Asia/Dhaka";
        const createdAtInBd = toZonedTime(ticket.createdAt!, bdTimeZone);
        const updatedAtInBd = toZonedTime(ticket.updatedAt!, bdTimeZone);

        // Format the date to "dd-MMM-yyyy HH:mm"
        const formattedCreatedAt = format(createdAtInBd, "dd-MMM-yyyy HH:mm");
        const formattedUpdatedAt = format(updatedAtInBd, "dd-MMM-yyyy HH:mm");
        
        return {
        ...ticket,
        createdAt: formattedCreatedAt,
        updatedAt: formattedUpdatedAt,
        };
    });

    return data;
};

export default dateFormat;
