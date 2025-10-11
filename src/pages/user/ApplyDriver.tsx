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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDriverApplicationMutation,
  useProfileInfoQuery,
} from "@/redux/features/user/user.api";

// Zod schema
const applyDriverZodSchema = z.object({
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
});

// ApplyDriver Component
const ApplyDriver = () => {
  // State for loading
  const [isLoading, setIsloading] = useState(false);

  // RTK Query mutation hook
  const { data: userInfo } = useProfileInfoQuery(undefined);
  const [driverApplication] = useDriverApplicationMutation();

  // useForm hook
  const form = useForm<z.infer<typeof applyDriverZodSchema>>({
    resolver: zodResolver(applyDriverZodSchema),
    defaultValues: {
      licenseNumber: "",
      vehicleType: undefined,
      vehicleModel: "",
      plateNumber: "",
    },
  });

  // Handle onSubmit
  const onSubmit = async (data: z.infer<typeof applyDriverZodSchema>) => {
    setIsloading(true);
    const applicationData = {
      userId: userInfo?.data?._id,
      licenseNumber: data.licenseNumber,
      vehicleInfo: {
        vehicleType: data.vehicleType,
        vehicleModel: data.vehicleModel,
        plateNumber: data.plateNumber,
      },
    };

    try {
      const result = await driverApplication(applicationData).unwrap();
      console.log(result);
      toast.success(result.message || "Ride requested successfully");
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
                Driver Application
              </CardTitle>
              <CardDescription className="text-sm mt-0.5">
                Complete the form below to apply as a driver
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Card content */}
        <CardContent className="space-y-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* License Number */}
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem className="relative">
                    <FormLabel className="text-base font-medium flex items-center gap-1.5">
                      Vehicle Type
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="pl-5 py-4 bg-background border-2 focus-visible:ring-2 w-full">
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

              {/* Vehicle Model */}
              <FormField
                control={form.control}
                name="vehicleModel"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
                    <FormLabel>Vehicle Plate Number</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: D1-58A5-6981" {...field} />
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
                    value="Apply Now"
                    loadingValue="Appling"
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

export default ApplyDriver;
