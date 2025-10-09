/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonSubmit from "@/components/ui/button-submit";
import { Form } from "@/components/ui/form";
import { useDebounce } from "@/hooks/useDebounce";
import {
  calculateDistance,
  getCoordinatesFromAddress,
  searchAddressSuggestions,
} from "@/utils/geo";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import RideLocationField from "./RideLocationField";
import RideSummaryCard from "./RideSummaryCard";

// Zod schema
const rideRequestZodSchema = z.object({
  pickup: z
    .string()
    .min(2, { message: "Pickup address must be at least 2 characters long." }),
  dropoff: z
    .string()
    .min(2, { message: "Dropoff address must be at least 2 characters long." }),
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
  const [dropoffSuggestions, setDropoffSuggestions] = useState<any[]>([]);
  const [loadingPickup, setLoadingPickup] = useState(false);
  const [loadingDropoff, setLoadingDropoff] = useState(false);

  // useHook form
  const form = useForm<z.infer<typeof rideRequestZodSchema>>({
    resolver: zodResolver(rideRequestZodSchema),
    defaultValues: { pickup: "", dropoff: "" },
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

  // Debounce for dropoff
  const debounceDropoff = useDebounce(async (value: string) => {
    if (!value.trim()) return setDropoffSuggestions([]);
    try {
      setLoadingDropoff(true);
      const res = await searchAddressSuggestions(value);
      setDropoffSuggestions(res);
    } finally {
      setLoadingDropoff(false);
    }
  }, 350);

  // Handle onSubmit for find ride
  const onSubmit = async (data: z.infer<typeof rideRequestZodSchema>) => {
    setIsLoading(true);
    try {
      const pickupCoords = await getCoordinatesFromAddress(data.pickup);
      const dropoffCoords = await getCoordinatesFromAddress(data.dropoff);
      const distance = calculateDistance(pickupCoords, dropoffCoords);
      const estFare = (parseFloat(distance) * 15).toFixed(0);

      setRideData({
        pickup: data.pickup,
        dropoff: data.dropoff,
        distance,
        estFare,
      });
      setShowCard(true);
      setShowHeading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle ride confirm
  const handleConfirm = () => console.log("Confirmed ride:", rideData);

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
            name="dropoff"
            label="Dropoff location"
            icon={<Navigation className="w-4 h-4 text-muted-foreground" />}
            suggestions={dropoffSuggestions}
            loading={loadingDropoff}
            onChange={debounceDropoff}
            onSelectSuggestion={(val) => {
              form.setValue("dropoff", val);
              setDropoffSuggestions([]);
            }}
          />

          <ButtonSubmit
            isLoading={isLoading}
            value="Find ride"
            loadingValue="Finding..."
            className="h-11 text-base font-medium"
          />
        </form>
      </Form>
    </div>
  );
};

export default RideRequestForm;
