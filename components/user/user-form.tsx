"use client";

import Link from 'next/link'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"

export const UserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type FormValues = z.input<typeof UserSchema>

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
}

const UserForm = ({
  id,
  defaultValues,
  onSubmit,
  disabled
}: Props) => {

  const form = useForm<FormValues>({
    resolver: zodResolver(UserSchema),
    defaultValues: defaultValues,
  });

  return (
    <div className='flex flex-col gap-3'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled || !!id}
                    placeholder="your@mail.com"
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
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    type='password'
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={disabled} type="submit">
            {id ? "Save Changes" : "Create User"}
          </Button>

        </form>
      </Form>
    </div>
  )
}

export default UserForm