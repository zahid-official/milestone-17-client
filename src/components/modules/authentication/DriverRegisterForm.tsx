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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import availability from "@/constants/availability";
import { cn } from "@/lib/utils";
import { useDriverRegisterMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema
const driverRegisterZodSchema = z
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

    // License Number
    licenseNumber: z
      .string()
      .min(8, { error: "License number must be at least 8 characters long." })
      .max(50, { error: "License number cannot exceed 50 characters." })
      .trim(),

    // Vehicle Type
    vehicleType: z.enum(["CAR", "BIKE"], {
      error: "Please select a vehicle type between Bike and Car.",
    }),

    // Vehicle Model
    vehicleModel: z
      .string()
      .min(5, { error: "Model must be at least 5 characters long." })
      .max(50, { error: "Model cannot exceed 50 characters." })
      .trim(),

    // Vehicle Plate Number
    plateNumber: z
      .string()
      .min(8, { error: "Plate Number must be at least 8 characters long." })
      .max(50, { error: "Plate Number cannot exceed 50 characters." })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Password's don't match",
    path: ["confirmPassword"],
  });

const DriverRegisterForm = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  // State for loading
  const [isLoading, setIsloading] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // RTK Query mutation hook
  const [driverRegister] = useDriverRegisterMutation();

  // useForm hook
  const form = useForm<z.infer<typeof driverRegisterZodSchema>>({
    resolver: zodResolver(driverRegisterZodSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      licenseNumber: "",
      vehicleType: undefined,
      vehicleModel: "",
      plateNumber: "",
    },
  });

  // Handle onSubmit
  const onSubmit = async (data: z.infer<typeof driverRegisterZodSchema>) => {
    setIsloading(true);
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      licenseNumber: data.licenseNumber,
      vehicleInfo: {
        vehicleType: data.vehicleType,
        vehicleModel: data.vehicleModel,
        plateNumber: data.plateNumber,
      },
      availability: availability.ONLINE,
    };

    try {
      const result = await driverRegister(userInfo).unwrap();
      console.log(result);
      toast.success(
        result.message || "Driver has been registered successfully"
      );
      if (result.data.email) {
        navigate("/verify", { state: result.data.email });
      }
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {/* Form body */}
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* row-1 */}
            <div className="flex sm:flex-row flex-col gap-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full max-w-xs mx-auto">
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
                  <FormItem className="w-full max-w-xs mx-auto">
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
            </div>

            {/* row-2 */}
            <div className="flex sm:flex-row flex-col gap-4">
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full max-w-xs mx-auto">
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
                  <FormItem className="w-full max-w-xs mx-auto">
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
            </div>

            {/* row-3 */}
            <div className="flex sm:flex-row flex-col gap-4">
              {/* License Number */}
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem className="w-full max-w-xs mx-auto">
                    <FormLabel>License Number</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: 125-256-6988" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Vehicle Type */}
              <FormField
                control={form.control}
                name="vehicleType"
                render={({ field }) => (
                  <FormItem className="relative w-full max-w-xs mx-auto">
                    <FormLabel className="flex items-center gap-1.5">
                      Vehicle Type
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="bg-background focus-visible:ring-2 w-full">
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BIKE">Bike</SelectItem>
                          <SelectItem value="CAR">Car</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* row-4 */}
            <div className="flex sm:flex-row flex-col gap-4">
              {/* Vehicle Model */}
              <FormField
                control={form.control}
                name="vehicleModel"
                render={({ field }) => (
                  <FormItem className="w-full max-w-xs mx-auto">
                    <FormLabel>Vehicle Model</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: Yamaha FZ v2" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Plate Number*/}
              <FormField
                control={form.control}
                name="plateNumber"
                render={({ field }) => (
                  <FormItem className="w-full max-w-xs mx-auto">
                    <FormLabel>Vehicle Plate Number</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: D1-58A5-6981" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit btn */}
            <div className="w-full sm:max-w-lg max-w-xs mx-auto">
              <ButtonSubmit
                isLoading={isLoading}
                value="Create Account"
                loadingValue="Creating account"
              />
            </div>
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

export default DriverRegisterForm;
