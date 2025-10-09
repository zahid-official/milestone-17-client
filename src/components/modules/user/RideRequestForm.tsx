import { Button } from "@/components/ui/button";
import ButtonSubmit from "@/components/ui/button-submit";
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
import { MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

// Zod schema
const rideRequestZodSchema = z.object({
  // Pickup
  pickup: z
    .string()
    .min(2, { error: "Pickup address must be at least 2 characters long." })
    .max(500, { error: "Pickup address cannot exceed 500 characters." })
    .trim(),

  // Dropoff
  dropoff: z
    .string()
    .min(2, { error: "Dropoff address must be at least 2 characters long." })
    .max(500, { error: "Dropoff address cannot exceed 500 characters." })
    .trim(),
});

const RideRequestForm = () => {
  // State form react
  const [isLoading, setIsloading] = useState(false);

  // useForm hook
  const form = useForm<z.infer<typeof rideRequestZodSchema>>({
    resolver: zodResolver(rideRequestZodSchema),
    defaultValues: {
      pickup: "",
      dropoff: "",
    },
  });

  // Handle onSubmit
  const onSubmit = (data: z.infer<typeof rideRequestZodSchema>) => {
    console.log(data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Pickup */}
          <FormField
            control={form.control}
            name="pickup"
            render={({ field }) => (
              <FormItem>
                {/* label */}
                <FormLabel className="text-base font-medium flex items-center">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  Pickup location
                </FormLabel>

                <FormControl>
                  <div className="relative">
                    {/* icon */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex-shrink-0 z-10">
                      <div className="w-3 h-3 rounded-full bg-foreground" />
                    </div>

                    {/* input */}
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter pickup location"
                      className="pl-9 h-14 text-base bg-background border-2 focus-visible:ring-2"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dropoff */}
          <FormField
            control={form.control}
            name="dropoff"
            render={({ field }) => (
              <FormItem>
                {/* label */}
                <FormLabel className="text-base font-medium flex items-center">
                  <Navigation className="w-4 h-4 text-muted-foreground" />
                  Dropoff location
                </FormLabel>

                <FormControl>
                  <div className="relative">
                    {/* icon */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex-shrink-0 z-10">
                      <div className="w-3 h-3 bg-foreground" />
                    </div>

                    {/* input */}
                    <Input
                      {...field}
                      type="text"
                      placeholder="Enter dropoff location"
                      className="pl-9 h-14 text-base bg-background border-2 focus-visible:ring-2"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit btn */}
          <ButtonSubmit
            isLoading={isLoading}
            value="See prices"
            loadingValue="Calculating"
          />
        </form>
      </Form>
    </div>
  );
};

export default RideRequestForm;
