/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonSubmit from "@/components/ui/button-submit";
import { Form } from "@/components/ui/form";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useProfileInfoQuery,
  useRequestRideMutation,
} from "@/redux/features/user/user.api";
import {
  calculateDistance,
  getCoordinatesFromAddress,
  searchAddressSuggestions,
} from "@/utils/geo";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
import RideLocationField from "./RideLocationField";
import RideSummaryCard from "./RideSummaryCard";
import {
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

// Zod schema
const rideRequestZodSchema = z.object({
  // Pickup
  pickup: z
    .string()
    .min(2, { error: "Pickup address must be at least 2 characters long." }),

  // Destination
  destination: z.string().min(2, {
    error: "Destination address must be at least 2 characters long.",
  }),

  // Payment Method
  paymentMethod: z.enum(["Cash", "Online"], {
    error: "Please select a payment method.",
  }),
});

const RideRequestForm = ({
  setShowHeading,
}: {
  setShowHeading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // States from react
  const [isLoading, setIsLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [rideData, setRideData] = useState<any>(null);
  const [pickupSuggestions, setPickupSuggestions] = useState<any[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<any[]>(
    []
  );
  const [loadingPickup, setLoadingPickup] = useState(false);
  const [loadingDestination, setLoadingDestination] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // RTK Query mutation hook
  const { data: userInfo } = useProfileInfoQuery(undefined);
  const [requestRide] = useRequestRideMutation();

  // useHook form
  const form = useForm<z.infer<typeof rideRequestZodSchema>>({
    resolver: zodResolver(rideRequestZodSchema),
    defaultValues: { pickup: "", destination: "", paymentMethod: "Cash" },
  });

  // Debounce for pickup
  const debouncePickup = useDebounce(async (value: string) => {
    if (!value.trim()) return setPickupSuggestions([]);
    try {
      setLoadingPickup(true);
      const res = await searchAddressSuggestions(value);
      setPickupSuggestions(res);
    } finally {
      setLoadingPickup(false);
    }
  }, 350);

  // Debounce for destination
  const debounceDestination = useDebounce(async (value: string) => {
    if (!value.trim()) return setDestinationSuggestions([]);
    try {
      setLoadingDestination(true);
      const res = await searchAddressSuggestions(value);
      setDestinationSuggestions(res);
    } finally {
      setLoadingDestination(false);
    }
  }, 350);

  // Handle onSubmit for find ride
  const onSubmit = async (data: z.infer<typeof rideRequestZodSchema>) => {
    setIsLoading(true);

    try {
      const pickupCoords = await getCoordinatesFromAddress(data.pickup);
      const destinationCoords = await getCoordinatesFromAddress(
        data.destination
      );
      const distance = calculateDistance(pickupCoords, destinationCoords);
      const fare = (parseFloat(distance) * 15).toFixed(0);

      setRideData({
        pickup: data.pickup,
        destination: data.destination,
        distance: parseFloat(distance),
        fare: parseFloat(fare),
        paymentMethod: data.paymentMethod,
      });
      setShowCard(true);
      setShowHeading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle confirm to trigger backend
  const handleConfirm = async () => {
    setConfirmLoading(true);
    const confirmData = {
      ...rideData,
      paymentMethod: rideData.paymentMethod.toUpperCase(),
      userId: userInfo.data._id,
    };

    try {
      const result = await requestRide(confirmData).unwrap();
      console.log(result);
      toast.success(result.message || "Ride requested successfully");
      navigate("/user/history");
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.error[0]?.message ||
          error?.data?.message ||
          "Something went wrong!"
      );

      // Redirect to verify if not verified
      if (
        error.status === 400 &&
        error.data.message ===
          "Please update your profile with phone number before requesting a ride"
      ) {
        navigate("/user/profile");
      }
    } finally {
      setConfirmLoading(false);
    }
  };

  // Manage card
  if (showCard && rideData) {
    return (
      <RideSummaryCard
        rideData={rideData}
        onConfirm={handleConfirm}
        onBack={() => {
          setShowCard(false);
          setShowHeading(true);
        }}
        confirmLoading={confirmLoading}
      />
    );
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 relative"
        >
          <RideLocationField
            control={form.control}
            name="pickup"
            label="Pickup location"
            icon={<MapPin className="w-4 h-4 text-muted-foreground" />}
            suggestions={pickupSuggestions}
            loading={loadingPickup}
            onChange={debouncePickup}
            onSelectSuggestion={(val) => {
              form.setValue("pickup", val);
              setPickupSuggestions([]);
            }}
          />

          <RideLocationField
            control={form.control}
            name="destination"
            label="Destination location"
            icon={<Navigation className="w-4 h-4 text-muted-foreground" />}
            suggestions={destinationSuggestions}
            loading={loadingDestination}
            onChange={debounceDestination}
            onSelectSuggestion={(val) => {
              form.setValue("destination", val);
              setDestinationSuggestions([]);
            }}
          />

          {/* ✅ Added payment method field with same design style */}
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-base font-medium flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  Payment method
                </FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="pl-5 py-5.5  bg-background border-2 focus-visible:ring-2 w-full">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Online">Online</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ButtonSubmit
            isLoading={isLoading}
            value="Find ride"
            loadingValue="Finding"
            className="h-11 text-base font-medium"
          />
        </form>
      </Form>
    </div>
  );
};

export default RideRequestForm;
