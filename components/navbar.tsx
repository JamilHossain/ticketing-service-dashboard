"use client"

import Link from "next/link";
import Image from "next/image";
import {
    Menu,
    CreditCard,
    Keyboard,
    Settings,
    User,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo";

const Navbar = () => {

    return (
        <header className={`sticky z-40 top-0 bg-white dark:bg-[#0f0f0f] shadow-sm py-5 w-screen`}>
            <div className='mx-auto px-24 flex justify-between items-center'>
                <Link href={"/"}>
                    <Logo src="/asd.jpeg" />
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Photo Optima</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link href={"/login"}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Log In</span>
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header >
    )
}

export default Navbar