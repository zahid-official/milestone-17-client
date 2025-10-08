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
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema
const registerZodSchema = z
  .object({
    // Name
    name: z
      .string()
      .min(2, { error: "Name must be at least 2 characters long." })
      .max(50, { error: "Name cannot exceed 50 characters." })
      .trim(),

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

      // Password complexity requirements
      .regex(/^(?=.*[A-Z])/, {
        error: "Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        error: "Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        error: "Password must contain at least 1 number.",
      })
      .trim(),

    // Confirm password
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm Password must be at least 8 characters long." })

      // Password complexity requirements
      .regex(/^(?=.*[A-Z])/, {
        error: "Confirm Password must contain at least 1 uppercase letter.",
      })
      .regex(/^(?=.*[!@#$%^&*])/, {
        error: "Confirm Password must contain at least 1 special character.",
      })
      .regex(/^(?=.*\d)/, {
        error: "Confirm Password must contain at least 1 number.",
      })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password's don't match",
    path: ["confirmPassword"],
  });

const RegisterForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  // State for loading
  const [isLoading, setIsloading] = useState(false);

  // RTK Query mutation hook
  const [register] = useRegisterMutation();

  // useForm hook
  const form = useForm<z.infer<typeof registerZodSchema>>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle onSubmit
  const onSubmit = async (data: z.infer<typeof registerZodSchema>) => {
    setIsloading(true);
    const { confirmPassword: _confirmPassword, ...userInfo } = data;

    try {
      const result = await register(userInfo).unwrap();
      console.log(result);
      toast.success("Account created successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message || "Something went wrong!");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Heading */}
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create new account
        </p>
      </div>

      {/* Form body */}
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            {/* Confirm password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <InputPassword {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your confirm password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit btn */}

            <ButtonSubmit
              isLoading={isLoading}
              value="Create Account"
              loadingValue="Creating account"
            />
          </form>
        </Form>
      </div>

      {/* Navigate to login */}
      <div className="text-center text-sm">
        Already have a account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
