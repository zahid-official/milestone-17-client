import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "An interactive area chart";

type Point = { date: string; value: number; count?: number };

const chartConfig = {
  value: {
    label: "Amount",
  },
  count: {
    label: "Rides",
  },
} satisfies ChartConfig;

export function DriverInteractiveChart({
  data,
  timeframe,
  onTimeframeChange,
}: {
  data?: Point[];
  timeframe?: "daily" | "weekly" | "monthly";
  onTimeframeChange?: (v: "daily" | "weekly" | "monthly") => void;
}) {
  const isMobile = useIsMobile();
  const isControlled =
    timeframe !== undefined && onTimeframeChange !== undefined;

  const [tfState, setTfState] = React.useState<"daily" | "weekly" | "monthly">(
    (isControlled ? timeframe : undefined) ?? (isMobile ? "daily" : "weekly")
  );

  React.useEffect(() => {
    if (isMobile && !isControlled) {
      setTfState("daily");
    }
  }, [isMobile, isControlled]);

  React.useEffect(() => {
    if (isControlled && timeframe) setTfState(timeframe);
  }, [isControlled, timeframe]);

  const currentTf = tfState;

  const chartPoints = data ?? [];

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Earnings</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Summary for timeframe
          </span>
          <span className="@[540px]/card:hidden">Summary</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={currentTf}
            onValueChange={(v) => {
              if (!v) return;
              const val = v as "daily" | "weekly" | "monthly";
              if (isControlled) onTimeframeChange?.(val);
              else setTfState(val);
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="daily">Day</ToggleGroupItem>
            <ToggleGroupItem value="weekly">Week</ToggleGroupItem>
            <ToggleGroupItem value="monthly">Month</ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={currentTf}
            onValueChange={(v) => {
              const val = v as "daily" | "weekly" | "monthly";
              if (isControlled) onTimeframeChange?.(val);
              else setTfState(val);
            }}
          >
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select timeframe"
            >
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="daily" className="rounded-lg">
                Day
              </SelectItem>
              <SelectItem value="weekly" className="rounded-lg">
                Week
              </SelectItem>
              <SelectItem value="monthly" className="rounded-lg">
                Month
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4  sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <AreaChart data={chartPoints}>
            <defs>
              <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.9}
                />
                <stop
                  offset="95%"
                  stopColor="var(--primary)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                const opts: Intl.DateTimeFormatOptions =
                  currentTf === "monthly"
                    ? { month: "short" }
                    : { month: "short", day: "numeric" };
                return date.toLocaleDateString("en-US", opts);
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                  formatter={(val, _name, props) => {
                    const amount =
                      typeof val === "number" ? val : Number(val) || 0;
                    // extract ride count from the original payload
                    let rideCount: number | undefined = undefined;
                    if (
                      props &&
                      typeof props === "object" &&
                      "payload" in props
                    ) {
                      const p = props as unknown as { payload?: unknown };
                      if (p.payload && typeof p.payload === "object") {
                        const pp = p.payload as { count?: unknown };
                        if (typeof pp.count === "number") rideCount = pp.count;
                      }
                    }

                    return (
                      <div className="grid gap-1 w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">
                              Amount
                            </span>
                          </div>
                          <div className="text-foreground font-mono font-medium tabular-nums">
                            ৳ {amount.toLocaleString()}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Ride</span>
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {rideCount ?? 0}
                          </div>
                        </div>
                      </div>
                    );
                  }}
                />
              }
            />
            <Area
              dataKey="value"
              type="natural"
              fill="url(#fillValue)"
              stroke="var(--primary)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
