import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { login } from "@/adapter/auth/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  email: z.email({ message: "Email no validate" }),
});

export function LoginContainer() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      toast.success(res.message, { position: "top-right" });
      localStorage.setItem("accessToken", res?.access_token);
      localStorage.setItem("user", JSON.stringify(res?.user));
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-4">LOGIN</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[400px] space-y-6 "
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
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
                  <Input placeholder="Password" {...field} type={"password"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className="flex justify-end">
            <a href="/register">Go to register</a>
          </p>
          <Button disabled={isSubmitting} type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
