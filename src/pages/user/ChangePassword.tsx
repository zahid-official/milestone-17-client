/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonSubmit from "@/components/ui/button-submit";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/ui/input-password";
import { usePasswordChangeMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

// Zod schema
const changePasswordZodSchema = z
  .object({
    // Old password
    oldPassword: z
      .string()
      .min(2, { error: "Old Password must be at least 2 characters long." })
      .trim(),

    // New password
    newPassword: z
      .string()
      .min(8, { error: "New Password must be at least 8 characters long." })

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
  .refine((data) => data.newPassword === data.confirmPassword, {
    error: "Password's don't match",
    path: ["confirmPassword"],
  });

// ChangePassword Component
const ChangePassword = () => {
  // State for loading
  const [isLoading, setIsloading] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // RTK Query mutation hook
  const [passwordChange] = usePasswordChangeMutation();

  // useForm hook
  const form = useForm<z.infer<typeof changePasswordZodSchema>>({
    resolver: zodResolver(changePasswordZodSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle onSubmit
  const onSubmit = async (data: z.infer<typeof changePasswordZodSchema>) => {
    // Check if data has changed
    if (data.oldPassword === data.newPassword) {
      toast.error("You haven't made any changes.");
      return;
    }
    setIsloading(true);
    const { confirmPassword: _confirmPassword, ...userInfo } = data;

    try {
      const result = await passwordChange(userInfo).unwrap();
      console.log(result);
      toast.success(result.message || "Password changed successfully");
      navigate("/user/ride-request");
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.error[0]?.message ||
          error?.data?.message ||
          "Something went wrong!"
      );
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <Card className="max-w-lg w-full mx-auto border pb-10 shadow-sm bg-card/70 backdrop-blur-sm">
        {/* Card header */}
        <CardHeader className="space-y-1">
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">
                Change Password
              </CardTitle>
              <CardDescription className="text-sm mt-0.5">
                Update your password information
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Card content */}
        <CardContent className="space-y-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Old password */}
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <InputPassword {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <InputPassword {...field} />
                    </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex flex-col-reverse justify-end sm:flex-row gap-2.5">
                {/* Submit button */}
                <div>
                  <ButtonSubmit
                    isLoading={isLoading}
                    value="Save changes"
                    loadingValue="Saving"
                  />
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
