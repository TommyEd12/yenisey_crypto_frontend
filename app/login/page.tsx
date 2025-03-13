"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { backendInstance } from "@/http";
import { error } from "console";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  userName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

function Page() {
  const [submitError, setSubmitError] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await backendInstance.post("user/login", {
        userName: values.userName,
        password: values.password,
      });

      if (res.status === 200) {
        router.push("/");
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitError(true);
    }
  }

  return (
    <div className="dark:border-white border-black mx-auto my-auto border h-fit p-3 px-5 rounded-2xl">
      <h1 className="text-center w-full mb-3 font-semibold">Авторизация</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя пользователя</FormLabel>
                <FormControl>
                  <Input placeholder="Пользователь" {...field} />
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
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {submitError && (
            <h2 className="font-medium text-red-500">Ошибка авторизации</h2>
          )}
          <Button type="submit">Войти</Button>
        </form>
      </Form>
    </div>
  );
}

export default Page;
