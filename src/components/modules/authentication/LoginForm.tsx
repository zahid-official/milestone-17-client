/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonSubmit from "@/components/ui/button-submit";
import { FieldSeparator } from "@/components/ui/field";
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
import accountStatus from "@/constants/accountStatus";
import role from "@/constants/role";
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
  const [activeLogin, setActiveLogin] = useState<
    "form" | "admin" | "rider" | "driver" | null
  >(null);

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

  const roleRedirects = {
    [role.ADMIN]: "/admin",
    [role.DRIVER]: "/driver",
    [role.RIDER]: "/user",
  } as const;

  // Handle credentials login
  const credentialsLogin = async (data: z.infer<typeof loginZodSchema>) => {
    setIsloading(true);

    try {
      const result = await login(data).unwrap();
      toast.success(result.message || "Logged in successfully");
      const destination =
        roleRedirects[result.data?.role as keyof typeof roleRedirects];
      navigate(destination ?? "/");
    } catch (error: any) {
      toast.error(error.data.message || "Something went wrong!");

      // Redirect to verify if not verified
      if (
        error.status === 401 &&
        error.data.message ===
          "User is not verified. Please verify your email to proceed."
      ) {
        navigate("/verify", { state: data.email });
      }

      // Redirect to contact page if BLOCKED
      if (
        error.status === 401 &&
        error.data.message ===
          "User is BLOCKED. Please contact support for more information."
      ) {
        navigate("/contact", { state: accountStatus.BLOCKED });
      }

      // Redirect to contact page if SUSPENDED
      if (
        error.status === 401 &&
        error.data.message ===
          "User is SUSPENDED. Please contact support for more information."
      ) {
        navigate("/contact", { state: accountStatus.SUSPENDED });
      }

      // Redirect to contact page if INACTIVE
      if (
        error.status === 401 &&
        error.data.message ===
          "User is INACTIVE. Please contact support for more information."
      ) {
        navigate("/contact", { state: accountStatus.INACTIVE });
      }
    } finally {
      setIsloading(false);
      setActiveLogin(null);
    }
  };

  const roleCredentials = {
    admin: {
      email: "default@email.com",
      password: "default@Admin123",
    },
    rider: {
      email: "rider@email.com",
      password: "default@Admin123",
    },
    driver: {
      email: "driver@email.com",
      password: "default@Admin123",
    },
  } as const;

  const handleRoleLogin = (role: keyof typeof roleCredentials) => {
    const credentials = roleCredentials[role];
    form.setValue("email", credentials.email, {
      shouldDirty: true,
      shouldValidate: true,
    });
    form.setValue("password", credentials.password, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setActiveLogin(role);
    void credentialsLogin(credentials);
  };

  const handleFormSubmit = (data: z.infer<typeof loginZodSchema>) => {
    setActiveLogin("form");
    return credentialsLogin(data);
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
            onSubmit={form.handleSubmit(handleFormSubmit)}
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
              isLoading={isLoading && activeLogin === "form"}
              value="Login"
              loadingValue="Logging in"
            />

            <FieldSeparator>Or continue with credentials</FieldSeparator>
            <div className="pt-6.5 grid grid-cols-3 gap-3">
              <ButtonSubmit
                isLoading={isLoading && activeLogin === "admin"}
                value="Admin Login"
                loadingValue="Logging in"
                type="button"
                onClick={() => handleRoleLogin("admin")}
              />
              <ButtonSubmit
                isLoading={isLoading && activeLogin === "rider"}
                value="Rider Login"
                loadingValue="Logging in"
                type="button"
                onClick={() => handleRoleLogin("rider")}
              />
              <ButtonSubmit
                isLoading={isLoading && activeLogin === "driver"}
                value="Driver Login"
                loadingValue="Logging in"
                type="button"
                onClick={() => handleRoleLogin("driver")}
              />
            </div>
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
