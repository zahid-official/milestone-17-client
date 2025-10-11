import { Button } from "@/components/ui/button";
import ButtonSubmit from "@/components/ui/button-submit";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Navigation } from "lucide-react";

interface RideSummaryCardProps {
  rideData: {
    pickup: string;
    destination: string;
    distance: string;
    fare: string;
    paymentMethod: string;
  };
  onConfirm: () => void;
  onBack: () => void;
  confirmLoading: boolean;
}

const RideSummaryCard = ({
  rideData,
  onConfirm,
  onBack,
  confirmLoading,
}: RideSummaryCardProps) => {
  return (
    <Card className="border border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-2xl shadow-lg transition-colors">
      {/* Card header */}
      <CardHeader className="">
        <CardTitle className="text-3xl border-b pb-6 font-bold text-center text-foreground tracking-tight">
          Ride Summary
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
              {rideData.pickup}
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
              {rideData.destination}
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
              {rideData.distance} km
            </span>
          </div>

          {/* fare */}
          <div className="flex flex-col">
            <span className="text-muted-foreground">Estimated Fare</span>
            <span className="font-semibold text-foreground">
              ৳ {rideData.fare}
            </span>
          </div>

          {/* fare */}
          <div className="flex flex-col">
            <span className="text-muted-foreground">Payment</span>
            <span className="font-semibold text-foreground">
              {rideData.paymentMethod}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Buttons */}
      <CardFooter className="flex flex-col gap-3">
        <div onClick={onConfirm} className="w-full">
          <ButtonSubmit
            isLoading={confirmLoading}
            value="Confirm Ride"
            loadingValue="Requsting a Ride"
            className=" h-10 text-base font-medium"
          />
        </div>
        <Button
          onClick={onBack}
          variant="ghost"
          className="w-full h-10 text-muted-foreground border hover:text-foreground"
        >
          Back
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RideSummaryCard;
