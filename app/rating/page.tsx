import React from 'react'

const Page = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const { Ticket, Rating } = searchParams;

    if (!Ticket || !Rating) {
        return (
            <div>no ticket id or rating available</div>
        )
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/ticket/rating?Ticket=${Ticket}&Rating=${Rating}`)

    const data = await response.json()
    console.log(data)

    return (
        <div>Thank you for your feedback!</div>
    )
}

export default Page