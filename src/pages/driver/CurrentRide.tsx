/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCompleteRideMutation,
  useCurrentRideQuery,
  useInTransitRideMutation,
  usePickupRideMutation,
} from "@/redux/features/driver/driver.api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Circle, MapPin, Navigation, WifiOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ButtonSubmit from "@/components/ui/button-submit";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import rideStatus from "@/constants/rideStatus";
import ToggleAvailability from "./ToggleAvailability";
import { useProfileInfoQuery } from "@/redux/features/user/user.api";
import availability from "@/constants/availability";
import EmergencyButton from "@/components/modules/user/activeRide/EmergencyButton";

const CurrentRide = () => {
  // States from react
  const [loading, setLoading] = useState(false);

  // profile info to check availability
  const { data: profileData } = useProfileInfoQuery(undefined);
  const isAvailable = profileData
    ? profileData.data?.availability === availability.ONLINE
    : true;

  // RTK Query mutation hooks
  const { data, isLoading } = useCurrentRideQuery(undefined);
  const [pickupRide] = usePickupRideMutation();
  const [inTransitRide] = useInTransitRideMutation();
  const [completeRide] = useCompleteRideMutation();
  const rideData = data?.data;

  // handlePickup
  const handlePickup = async () => {
    setLoading(true);

    try {
      const result = await pickupRide(rideData?._id).unwrap();
      toast.success(result.message || "Rider picked up successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // handleInTransit
  const handleInTransit = async () => {
    setLoading(true);

    try {
      const result = await inTransitRide(rideData?._id).unwrap();
      toast.success(result.message || "Ride is now in transit");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // handleComplete
  const handleComplete = async () => {
    setLoading(true);

    try {
      const result = await completeRide(rideData?._id).unwrap();
      toast.success(result.message || "Ride completed successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Loader
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-6">
        <div className="w-8 h-8 border-5 border-black/30 border-t-black dark:border-white/30 dark:border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  // If driver is offline, show themed notice with toggle to go online
  if (!isAvailable) {
    return (
      <div className="max-w-3xl mx-auto mt-8">
        <Card className="border-2 border-muted-foreground/10 bg-surface px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-lg bg-red-50 dark:bg-red-900/40 flex items-center justify-center">
                <WifiOff className="w-7 h-7 text-red-600 dark:text-red-300" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">
                You're Offline
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You won't be able to view or manage ride while you're offline.
                Toggle your availability to get back on the road and manage your
                rides.
              </p>
            </div>
            <div className="flex items-center">
              <ToggleAvailability />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <>
      {rideData ? (
        <div className="flex justify-center items-center min-h-[85vh] relative">
          <Card className="border max-w-lg w-full mx-auto border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-2xl shadow-lg transition-colors">
            {/* Card header */}
            <CardHeader className="">
              <CardTitle className="text-3xl border-b pb-6 font-bold text-center text-foreground tracking-tight">
                Current Ride
              </CardTitle>
            </CardHeader>

            {/* Card content */}
            <CardContent className="space-y-4">
              {/* Pickup */}
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Pickup</p>
                  <p className="font-medium text-foreground leading-tight">
                    {rideData?.pickup}
                  </p>
                </div>
              </div>

              {/* Destination */}
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                  <Navigation className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">destination</p>
                  <p className="font-medium text-foreground leading-tight">
                    {rideData?.destination}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary mt-0.5">
                  <Circle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge>{rideData?.status}</Badge>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border mt-7"></div>
              {/* Distance & fare */}
              <div className="flex items-center justify-between text-center text-sm">
                {/* distance */}
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Distance</span>
                  <span className="font-semibold text-foreground">
                    {rideData?.distance} km
                  </span>
                </div>

                {/* fare */}
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Estimated Fare</span>
                  <span className="font-semibold text-foreground">
                    ৳ {rideData?.fare}
                  </span>
                </div>

                {/* fare */}
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="font-semibold text-foreground">
                    {rideData?.paymentMethod}
                  </span>
                </div>
              </div>
            </CardContent>

            {/* Buttons */}
            <CardFooter>
              {/* Pickup btn */}
              {rideData?.status === rideStatus.ACCEPTED && (
                <div onClick={handlePickup} className="w-full">
                  <ButtonSubmit
                    isLoading={loading}
                    value="Pickup Rider"
                    loadingValue="Pickuping Rider"
                    className=" h-10 text-base font-medium"
                  />
                </div>
              )}

              {/* InTransit btn */}
              {rideData?.status === rideStatus.PICKED_UP && (
                <div onClick={handleInTransit} className="w-full">
                  <ButtonSubmit
                    isLoading={loading}
                    value="In Transit"
                    loadingValue="In Transiting"
                    className=" h-10 text-base font-medium"
                  />
                </div>
              )}

              {/* Complete btn */}
              {rideData?.status === rideStatus.IN_TRANSIT && (
                <div onClick={handleComplete} className="w-full">
                  <ButtonSubmit
                    isLoading={loading}
                    value="Complete Ride"
                    loadingValue="Completing Ride"
                    className=" h-10 text-base font-medium"
                  />
                </div>
              )}
            </CardFooter>
          </Card>

          {/* Emergency / SOS btn */}
          <div className="sm:absolute sm:bottom-0 sm:right-10 w-full flex justify-end items-center">
            <EmergencyButton />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[85vh]">
          <Card className="border max-w-lg w-full mx-auto border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-2xl shadow-lg transition-colors">
            {/* Card header */}
            <CardHeader className="">
              <CardTitle className="text-3xl border-b pb-6 font-bold text-center text-foreground tracking-tight">
                Current Ride
              </CardTitle>
            </CardHeader>

            {/* Card content */}
            <CardContent className="space-y-4 text-center">
              <div className="text-xl font-semibold">
                You are not currently on any ride.
              </div>
              <Link to={"/driver/incoming-requests"}>
                <Button>Accept a ride</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CurrentRide;
