"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTransition } from "react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { login } from "@/actions/login"
import { Icons } from "@/components/icons"

import { LoginSchema } from "@/lib/schemas"

const Page = () => {
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })


    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        startTransition(() => {
            const promise = login(data, callbackUrl)

            toast.promise(promise, {
                loading: 'Login into Account...',
                success: (data) => {
                    console.log("login data : ", data)
                    form.reset()
                    if (data?.error) {
                        return `Login failed: ${data?.error}`
                    } else {
                        return `Login successful...`
                    }
                }
            })
        })
    }

    return (
        <div className="h-full w-full">
            <div className="flex justify-center items-center">
                <Card>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email & password below to login
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 h-full">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    type="email"
                                                    placeholder="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isPending}
                                                    type="password"
                                                    placeholder="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    disabled={isPending}
                                    type="submit"
                                    className="w-full"
                                >
                                    Submit
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Page