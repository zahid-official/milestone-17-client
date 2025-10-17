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
import { Circle, MapPin, Navigation } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ButtonSubmit from "@/components/ui/button-submit";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import rideStatus from "@/constants/rideStatus";

const CurrentRide = () => {
  // States from react
  const [loading, setLoading] = useState(false);

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
      console.log(result);
      toast.success(result.message || "Rider picked up successfully");
    } catch (error: any) {
      console.log(error);
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
      console.log(result);
      toast.success(result.message || "Ride is now in transit");
    } catch (error: any) {
      console.log(error);
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
      console.log(result);
      toast.success(result.message || "Ride completed successfully");
    } catch (error: any) {
      console.log(error);
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

  return (
    <>
      {rideData ? (
        <div className="flex justify-center items-center min-h-[85vh]">
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
