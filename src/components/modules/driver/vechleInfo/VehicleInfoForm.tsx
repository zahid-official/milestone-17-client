/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useUpdateProfileMutation } from "@/redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// Zod schema
const vehicleZodSchema = z.object({
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

// IProps
interface IProps {
  userInfo: {
    _id: string;
    licenseNumber?: string;
    vehicleInfo?: {
      vehicleType?: string;
      vehicleModel?: string;
      plateNumber?: string;
    };
  };
  handleCancel: () => void;
}

// VehicleInfoForm Component
const VehicleInfoForm = ({ userInfo, handleCancel }: IProps) => {
  // State for loading
  const [isLoading, setIsloading] = useState(false);

  // RTK Query mutation hook
  const [updateProfile] = useUpdateProfileMutation();

  // useForm hook
  const form = useForm<z.infer<typeof vehicleZodSchema>>({
    resolver: zodResolver(vehicleZodSchema),
    defaultValues: {
      licenseNumber: userInfo.licenseNumber ?? "",
      vehicleType:
        (userInfo.vehicleInfo?.vehicleType as "CAR" | "BIKE") ?? "CAR", // give default
      vehicleModel: userInfo.vehicleInfo?.vehicleModel ?? "",
      plateNumber: userInfo.vehicleInfo?.plateNumber ?? "",
    },
  });

  // Handle onSubmit
  const onSubmit = async (data: z.infer<typeof vehicleZodSchema>) => {
    // Check if data has changed
    const isUnchanged =
      data.licenseNumber === userInfo.licenseNumber &&
      data.vehicleType === userInfo.vehicleInfo?.vehicleType &&
      data.vehicleModel === userInfo.vehicleInfo?.vehicleModel &&
      data.plateNumber === userInfo.vehicleInfo?.plateNumber;

    if (isUnchanged) {
      toast.error("You haven't made any changes.");
      return;
    }

    setIsloading(true);
    const updatedData = {
      _id: userInfo?._id,
      licenseNumber: data.licenseNumber,
      vehicleInfo: {
        vehicleType: data.vehicleType,
        vehicleModel: data.vehicleModel,
        plateNumber: data.plateNumber,
      },
    };

    try {
      const result = await updateProfile(updatedData).unwrap();
      console.log(result);
      toast.success(result.message || "Vehicle details updated successfully");
      handleCancel();
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

  // Update form when userInfo is loaded or changed
  useEffect(() => {
    if (userInfo) {
      form.reset({
        licenseNumber: userInfo.licenseNumber ?? "",
        vehicleType:
          (userInfo.vehicleInfo?.vehicleType as "CAR" | "BIKE") ?? "CAR",
        vehicleModel: userInfo.vehicleInfo?.vehicleModel ?? "",
        plateNumber: userInfo.vehicleInfo?.plateNumber ?? "",
      });
    }
  }, [userInfo, form]);

  return (
    <Card className="border pb-10 shadow-sm bg-card/70 backdrop-blur-sm">
      {/* Card header */}
      <CardHeader className="space-y-1">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-3xl font-bold">Edit Vehicle</CardTitle>
            <CardDescription className="text-sm mt-0.5">
              Update your vehicle information
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
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
                    <Input placeholder="Enter your license number" {...field} />
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
                  <FormLabel className="flex items-center gap-1.5">
                    Vehicle Type
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
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
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>

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
  );
};

export default VehicleInfoForm;
