

import * as React from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface SectionCardsProps {
  totalRevenue?: number;
  totalRides?: number;
  avgFare?: number;
  timeframeTotal?: number;
  timeframeRides?: number;
  timeframe?: "daily" | "weekly" | "monthly";
  onTimeframeChange?: (v: "daily" | "weekly" | "monthly") => void;
}

export function DriverSectionCards({
  totalRevenue = 0,
  totalRides = 0,
  avgFare = 0,
  timeframeTotal = 0,
  timeframeRides = 0,
  timeframe = "weekly",
  onTimeframeChange,
}: SectionCardsProps) {
  // guard against rapid double clicks that could toggle timeframe unexpectedly
  const lastClickRef = React.useRef<{ [k: string]: number }>({});
  const handleClick = (key: "daily" | "weekly" | "monthly") => {
    const now = Date.now();
    const last = lastClickRef.current[key] || 0;
    // ignore if clicked twice within 300ms
    if (now - last < 300) return;
    lastClickRef.current[key] = now;
    onTimeframeChange?.(key);
  };
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ৳ {totalRevenue}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Total earnings</div>
          <div className="text-muted-foreground">Across all time</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Trips</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{totalRides}</CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Total rides</div>
          <div className="text-muted-foreground">Across all time</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average Fare</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">৳ {avgFare}</CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Per ride average</div>
          <div className="text-muted-foreground">Based on available rides</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Timeframe</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">৳ {timeframeTotal}</CardTitle>
          <div className="flex gap-2">
            <button className={`text-xs ${timeframe === "daily" ? "font-semibold" : "text-muted-foreground"}`} onClick={() => handleClick("daily")}> 
              Day
            </button>
            <button className={`text-xs ${timeframe === "weekly" ? "font-semibold" : "text-muted-foreground"}`} onClick={() => handleClick("weekly")}> 
              Week
            </button>
            <button className={`text-xs ${timeframe === "monthly" ? "font-semibold" : "text-muted-foreground"}`} onClick={() => handleClick("monthly")}> 
              Month
            </button>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Rides: {timeframeRides}</div>
          <div className="text-muted-foreground">Current {timeframe}</div>
        </CardFooter>
      </Card>
    </div>
  );
}
