"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoIosLogOut } from "react-icons/io";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import Logo from "@/components/logo";

const Navbar = () => {
    const user = useCurrentUser();

    const pathName = usePathname()

    return (
        <header className={`fixed z-40 top-0 bg-white dark:bg-[#0f0f0f] shadow-sm py-5 w-screen`}>
            <div className='mx-auto px-24 flex justify-between items-center'>
                <Link href={"/"}>
                    <Logo src="/asd.jpeg" />
                </Link>
                <div className="flex justify-between gap-4">
                    <Link href={"/dashboard"}>
                        <Button className={`${pathName === "/dashboard" ? 'border-blue-400' : ''}`} variant={"outline"}>
                            Tickets
                        </Button>
                    </Link>
                    <Link href={"/user"}>
                        <Button className={`${pathName === "/user" ? 'border-blue-400' : ''}`} variant={"outline"}>
                            Users
                        </Button>
                    </Link>
                </div>
                <div className="flex justify-between gap-2">
                    <LogoutButton>
                        <IoIosLogOut className="dark:bg-[#0f0f0f] w-8 h-8 cursor-pointer" />
                    </LogoutButton>
                </div>
            </div>
        </header >
    )
}

export default Navbar