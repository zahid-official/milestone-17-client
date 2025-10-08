/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonSubmit from "@/components/ui/button-submit";
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
import InputPassword from "@/components/ui/input-password";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

// Zod schema
const loginZodSchema = z.object({
  // Email
  email: z
    .email()
    .min(5, { error: "Email must be at least 5 characters long." })
    .max(100, { error: "Email cannot exceed 100 characters." })
    .trim(),

  // Password
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long." })
    .trim(),
});

const LoginForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  // State for loading
  const [isLoading, setIsloading] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // RTK Query mutation hook
  const [login] = useLoginMutation();

  // useForm hook
  const form = useForm<z.infer<typeof loginZodSchema>>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle credentials login
  const credentialsLogin = async (data: z.infer<typeof loginZodSchema>) => {
    setIsloading(true);

    try {
      const result = await login(data).unwrap();
      console.log(result);
      toast.success(result.message || "Logged in successfully");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message || "Something went wrong!");

      // Redirect to verify if not verified
      if (
        error.status === 401 &&
        error.data.message ===
          "User is not verified. Please verify your email to proceed."
      ) {
        navigate("/verify", { state: data.email });
      }
    } finally {
      setIsloading(false);
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Heading */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      {/* Form body */}
      <div className="grid gap-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(credentialsLogin)}
            className="space-y-6"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@email.com" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <InputPassword {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your account password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit btn */}
            <ButtonSubmit
              isLoading={isLoading}
              value="Login"
              loadingValue="Logging in"
            />
          </form>
        </Form>
      </div>

      {/* Navigate to register */}
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
