/* eslint-disable @typescript-eslint/no-explicit-any */
import EmergencyButton from "@/components/modules/user/activeRide/EmergencyButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ButtonSubmit from "@/components/ui/button-submit";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useActiveRideDetailsQuery,
  useCancelRideMutation,
} from "@/redux/features/user/user.api";
import { Circle, MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

const ActiveRideSkeleton = () => (
  <div className="flex justify-center items-center min-h-[85vh]">
    <Card className="border max-w-lg w-full mx-auto border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-2xl shadow-lg transition-colors">
      <CardHeader>
        <Skeleton className="h-8 w-40 mx-auto" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
        <div className="border-t border-border mt-7"></div>
        <div className="flex items-center justify-between text-center text-sm">
          {[0, 1, 2].map((col) => (
            <div key={col} className="flex flex-col items-center gap-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-14" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Skeleton className="h-10 w-full rounded-md" />
      </CardFooter>
    </Card>
  </div>
);

const ActiveRide = () => {
  // States from react
  const [cancelLoading, setCancelLoading] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // RTK Query mutation hooke
  const { data, isLoading } = useActiveRideDetailsQuery(undefined);
  const [cancelRide] = useCancelRideMutation();
  const rideData = data?.data;

  // handleCancel
  const handleCancel = async () => {
    setCancelLoading(true);

    try {
      const result = await cancelRide(rideData._id).unwrap();
      toast.success(result.message || "Ride cancelled successfully");
      navigate("/book-ride");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    } finally {
      setCancelLoading(false);
    }
  };

  // Loader
  if (isLoading) {
    return <ActiveRideSkeleton />;
  }

  return (
    <>
      {rideData ? (
        <div className="flex flex-col gap-5 justify-center items-center min-h-[85vh] relative">
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
            <CardFooter className="flex flex-col gap-3">
              <div onClick={handleCancel} className="w-full">
                <ButtonSubmit
                  isLoading={cancelLoading}
                  value="Cancel Ride"
                  loadingValue="Canceling Ride"
                  className=" h-10 text-base font-medium bg-red-950 text-white hover:text-black"
                />
              </div>
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
                You are not currently on any ride
              </div>
              <Link to={"/book-ride"}>
                <Button>Request Ride</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ActiveRide;
