import RideRequestForm from "@/components/modules/user/rideRequest/RideRequestForm";
import { useState } from "react";

const RideRequest = () => {
  const [showHeading, setShowHeading] = useState(true);
  return (
    <div className="grid gap-16 sm:px-9 items-center min-h-[85vh] xl:max-w-7xl mx-auto xl:grid-cols-2">
      {/* Content */}
      <div className="flex flex-col gap-4 xl:py-10 max-w-lg mx-auto">
        <div className="flex flex-1 items-center justify-center">
          <div className="space-y-8">
            {/* Heading */}
            {showHeading && (
              <div className="space-y-4">
                <h1 className="font-bold tracking-tight text-4xl sm:text-5xl text-pretty">
                  Get ready for your seamless trip
                </h1>
                <p className="text-lg text-muted-foreground text-pretty max-w-xl">
                  Discover the convenience of Velocia. Request a ride now
                  directly from your browser.
                </p>
              </div>
            )}

            {/* Location Form */}
            <RideRequestForm setShowHeading={setShowHeading} />
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-muted h-7/10 rounded-2xl relative hidden xl:block">
        <img
          src="/images/map.jpg"
          alt="Image"
          className="absolute inset-0 rounded-2xl h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default RideRequest;
