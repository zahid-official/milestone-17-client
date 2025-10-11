import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSingleRideDetailsQuery } from "@/redux/features/user/user.api";
import { MapPin, Navigation } from "lucide-react";
import { useParams } from "react-router";
import { format } from "date-fns";

const RideDetails = () => {
  const { id: rideId } = useParams();

  // RTK Query mutation hook
  const { data, isLoading } = useSingleRideDetailsQuery(rideId);
  const rideData = data?.data;

  // Loader
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-6">
        <div className="w-8 h-8 border-5 border-black/30 border-t-black dark:border-white/30 dark:border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  console.log(data);
  return (
    <div className="grid lg:grid-cols-2 gap-7 mt-20 max-w-5xl w-full mx-auto">
      {/* Ride details */}
      <Card className="max-w-lg w-full border border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-2xl shadow-lg transition-colors">
        {/* Card header */}
        <CardHeader className="">
          <CardTitle className="text-2xl border-b pb-6 font-bold text-center text-foreground tracking-tight">
            Ride Details
          </CardTitle>
        </CardHeader>

        {/* Card content */}
        <CardContent className="space-y-4">
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
              <span className="text-muted-foreground">Fare</span>
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
      </Card>

      {/* Ride details */}
      <Card className="max-w-lg w-full border border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-2xl shadow-lg transition-colors">
        {/* Card header */}
        <CardHeader className="">
          <CardTitle className="text-2xl border-b pb-6 font-bold text-center text-foreground tracking-tight">
            Ride Status
          </CardTitle>
        </CardHeader>

        {/* Card content */}
        <CardContent className="space-y-4">
          {/* Requested */}
          {rideData?.timestamps?.requestedAt && (
            <div className="flex items-start gap-2">
              <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-primary mt-[5px]"></div>
              <div className="flex-1 flex justify-between items-center gap-1.5">
                <p className="text-sm text-muted-foreground">Requested</p>
                <p className="text-sm font-medium text-foreground leading-tight mt-[3px]">
                  {format(
                    new Date(rideData?.timestamps?.requestedAt),
                    "dd-MM-yyyy hh:mm a"
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Accepted */}
          {rideData?.timestamps?.acceptedAt && (
            <div className="flex items-start gap-2">
              <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-primary mt-[5px]"></div>
              <div className="flex-1 flex justify-between items-center gap-1.5">
                <p className="text-sm text-muted-foreground">Accepted</p>
                <p className="text-sm font-medium text-foreground leading-tight mt-[3px]">
                  {format(
                    new Date(rideData?.timestamps?.acceptedAt),
                    "dd-MM-yyyy hh:mm a"
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Rejected */}
          {rideData?.timestamps?.rejectedAt && (
            <div className="flex items-start gap-2">
              <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-primary mt-[5px]"></div>
              <div className="flex-1 flex justify-between items-center gap-1.5">
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-sm font-medium text-foreground leading-tight mt-[3px]">
                  {format(
                    new Date(rideData?.timestamps?.rejectedAt),
                    "dd-MM-yyyy hh:mm a"
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Cancelled */}
          {rideData?.timestamps?.cancelledAt && (
            <div className="flex items-start gap-2">
              <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-primary mt-[5px]"></div>
              <div className="flex-1 flex justify-between items-center gap-1.5">
                <p className="text-sm text-muted-foreground">Cancelled</p>
                <p className="text-sm font-medium text-foreground leading-tight mt-[3px]">
                  {format(
                    new Date(rideData?.timestamps?.cancelledAt),
                    "dd-MM-yyyy hh:mm a"
                  )}
                </p>
              </div>
            </div>
          )}

          {/* PickedUp */}
          {rideData?.timestamps?.pickedUpAt && (
            <div className="flex items-start gap-2">
              <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-primary mt-[5px]"></div>
              <div className="flex-1 flex justify-between items-center gap-1.5">
                <p className="text-sm text-muted-foreground">Picked Up</p>
                <p className="text-sm font-medium text-foreground leading-tight mt-[3px]">
                  {format(
                    new Date(rideData?.timestamps?.pickedUpAt),
                    "dd-MM-yyyy hh:mm a"
                  )}
                </p>
              </div>
            </div>
          )}

          {/* In Transit */}
          {rideData?.timestamps?.inTransitAt && (
            <div className="flex items-start gap-2">
              <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-primary mt-[5px]"></div>
              <div className="flex-1 flex justify-between items-center gap-1.5">
                <p className="text-sm text-muted-foreground"> In Transit </p>
                <p className="text-sm font-medium text-foreground leading-tight mt-[3px]">
                  {format(
                    new Date(rideData?.timestamps?.inTransitAt),
                    "dd-MM-yyyy hh:mm a"
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Completed */}
          {rideData?.timestamps?.completedAt && (
            <div className="flex items-start gap-2">
              <div className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-primary mt-[5px]"></div>
              <div className="flex-1 flex justify-between items-center gap-1.5">
                <p className="text-sm text-muted-foreground"> Completed </p>
                <p className="text-sm font-medium text-foreground leading-tight mt-[3px]">
                  {format(
                    new Date(rideData?.timestamps?.completedAt),
                    "dd-MM-yyyy hh:mm a"
                  )}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rider Details */}
      <Card className="max-w-lg w-full border border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-2xl shadow-lg transition-colors">
        {/* Card header */}
        <CardHeader className="">
          <CardTitle className="text-2xl border-b pb-6 font-bold text-center text-foreground tracking-tight">
            Rider Information
          </CardTitle>
        </CardHeader>

        {/* Card content */}
        <CardContent>
          <div className="space-y-4">
            {/* name */}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium text-foreground leading-tight">
                {rideData?.userId?.name}
              </p>
            </div>

            {/* Email */}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium text-foreground leading-tight">
                {rideData?.userId?.email}
              </p>
            </div>

            {/* Phone */}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium text-foreground leading-tight">
                {rideData?.userId?.phone
                  ? rideData?.userId?.phone
                  : "Not Provided"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Driver Details */}
      <Card className="max-w-lg w-full border border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-2xl shadow-lg transition-colors">
        {/* Card header */}
        <CardHeader className="">
          <CardTitle className="text-2xl border-b pb-6 font-bold text-center text-foreground tracking-tight">
            Driver Information
          </CardTitle>
        </CardHeader>

        {/* Card content */}
        <CardContent>
          {rideData?.driverInfo ? (
            <>
              {/* row-1 */}
              <div className="space-y-4 flex justify-between">
                {/* name */}
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground leading-tight">
                    {rideData?.driverInfo?.userId?.name}
                  </p>
                </div>

                {/* phone */}
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground leading-tight">
                    {rideData?.driverInfo?.userId?.phone
                      ? rideData?.driverInfo?.userId?.phone
                      : "Not Provided"}
                  </p>
                </div>
              </div>

              {/* row-2 */}
              <div className="space-y-4 flex justify-between">
                {/* License */}
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">License</p>
                  <p className="font-medium text-foreground leading-tight">
                    {rideData?.driverInfo?.licenseNumber}
                  </p>
                </div>

                {/* Vehicle Type */}
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Vehicle Type</p>
                  <p className="font-medium text-foreground leading-tight">
                    {rideData?.driverInfo?.vehicleInfo?.vehicleType}
                  </p>
                </div>
              </div>

              {/* row-3 */}
              <div className="space-y-4 flex justify-between">
                {/* Vehicle Model */}
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Vehicle Model</p>
                  <p className="font-medium text-foreground leading-tight">
                    {rideData?.driverInfo?.vehicleInfo?.vehicleModel}
                  </p>
                </div>

                {/* Plate Number */}
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Plate Number</p>
                  <p className="font-medium text-foreground leading-tight">
                    {rideData?.driverInfo?.vehicleInfo?.plateNumber}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex justify-center mt-14 items-center text-lg font-semibold">
              Not Assigned
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RideDetails;
