import React from 'react'

const Page = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const { Ticket, Rating, TicketUrl } = searchParams;

    console.log(TicketUrl)

    if (!Ticket || !Rating) {
        return (
            <div>no ticket id or rating available</div>
        )
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_MQSERVER}/ticket/rating?Ticket=${Ticket}&Rating=${Rating}&TicketUrl=${TicketUrl}`)

    const data = await response.json()

    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='flex flex-col justify-center font-sans'>
                <div className='bg-blue-500 py-12 text-center'>
                    <h1 className='text-white text-4xl font-bold'>THANK YOU!</h1>
                </div>
                <div className="flex flex-col items-center mt-8">
                    <i className="fa fa-check text-green-500 text-6xl mb-6"></i>
                    <p className="max-w-md text-center text-gray-700 text-lg">Thanks a bunch for filling that out. It means a lot to us, just like you do! We really appreciate you giving us a moment of your time today. Thanks for being you.</p>
                </div>
                <footer className="text-center mt-12 p-4 bg-gray-200">
                    <p className="text-sm text-gray-500">Copyright ©2014 | All Rights Reserved</p>
                </footer>
            </div>
        </div>
    )
}

export default Page