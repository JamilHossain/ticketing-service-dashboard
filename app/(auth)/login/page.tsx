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
                        return `Login successful: ${data?.success}`
                    }
                }
            })
        })
    }

    return (
        <div className="flex justify-center items-center w-full h-full">
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email & password below to login
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Form {...form}>
                        <div className="grid grid-cols-2 gap-6">
                            <Button variant="outline">
                                <Icons.gitHub className="mr-2 h-4 w-4" />
                                Github
                            </Button>
                            <Button variant="outline">
                                <Icons.google className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
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
    )
}

export default Page