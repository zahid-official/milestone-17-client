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

type AreaItem = { date: string; rides?: number; revenue?: number };

const defaultChartData: AreaItem[] = [];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

interface Props {
  data?: AreaItem[];
  valueKey?: "rides" | "revenue";
  title?: string;
  description?: string;
}
const AdminChartAreaInteractive = ({
  data = defaultChartData,
  valueKey = "rides",
  title = "Total",
  description,
}: Props) => {
  const isMobile = useIsMobile();
  // default to last 7 days
  const [timeRange, setTimeRange] = React.useState("7d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  // filter by relative time from now using the `date` field
  // Use UTC-day normalization to avoid timezone boundary issues when parsing
  const filteredData = React.useMemo(() => {
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    if (timeRange === "7d") daysToSubtract = 7;

    // compute UTC midnight timestamp for `now`
    const nowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const startDate = new Date(now);
    startDate.setUTCDate(startDate.getUTCDate() - daysToSubtract);
    const startUTC = Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());

    // reduce items into a map keyed by YYYY-MM-DD (UTC) so we can later fill missing dates
    const map: Record<string, AreaItem> = {};
    for (const item of data) {
      if (!item?.date) continue;
      const d = new Date(item.date);
      const itemUTC = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
      if (itemUTC < startUTC || itemUTC > nowUTC) continue;
      // key as YYYY-MM-DD
      const key = new Date(itemUTC).toISOString().slice(0, 10);
      if (!map[key]) map[key] = { date: key };
      // accumulate only the metric specified by `valueKey` to avoid double-counting
      const maybeVal = (item as unknown) as Record<string, unknown>;
      const v = typeof maybeVal[valueKey] === "number" ? Number(maybeVal[valueKey]) : 0;
      map[key][valueKey] = (map[key][valueKey] || 0) + v;
    }

    // create continuous array from startUTC to nowUTC, one entry per day
    const out: AreaItem[] = [];
    for (let t = startUTC; t <= nowUTC; t += 24 * 60 * 60 * 1000) {
      const key = new Date(t).toISOString().slice(0, 10);
      out.push({ date: key, rides: map[key]?.rides ?? 0, revenue: map[key]?.revenue ?? 0 });
    }
    return out;
  }, [data, timeRange, valueKey]);

  // compute a simple moving average (7-day) for smoothing
  const smoothedData = React.useMemo(() => {
    const key = valueKey;
    if (!filteredData || filteredData.length === 0) return [];
    // assume filteredData sorted by date asc
  const sorted = [...filteredData].sort((a, b) => (a.date < b.date ? -1 : 1));
    const window = 7;
    const out: Array<AreaItem & { smoothed?: number }> = [];
    for (let i = 0; i < sorted.length; i++) {
      const slice = sorted.slice(Math.max(0, i - (window - 1)), i + 1);
      const sum = slice.reduce((s, it) => s + Number(it[key] ?? 0), 0);
      const avg = sum / slice.length;
      out.push({ ...sorted[i], smoothed: avg });
    }
    return out;
  }, [filteredData, valueKey]);

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">{description ?? "Total for the last 3 months"}</span>
          <span className="@[540px]/card:hidden">{description ?? "Last 3 months"}</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={smoothedData.length ? smoothedData : filteredData}>
            <defs>
              <linearGradient id="fillSmoothed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-desktop)" stopOpacity={0.12} />
                <stop offset="100%" stopColor="var(--color-desktop)" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-mobile)" stopOpacity={0.9} />
                <stop offset="100%" stopColor="var(--color-mobile)" stopOpacity={0.06} />
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
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
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
                />
              }
            />
            {/* smoothed (wide, subtle area) */}
            <Area
              dataKey="smoothed"
              type="natural"
              fill="url(#fillSmoothed)"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />

            {/* actual values (narrow stroke, brighter area) */}
            <Area
              dataKey={valueKey}
              type="natural"
              fill="url(#fillActual)"
              stroke="var(--color-mobile)"
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AdminChartAreaInteractive;
