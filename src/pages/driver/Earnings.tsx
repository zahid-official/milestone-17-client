import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { useEarningDetailsQuery } from "@/redux/features/driver/driver.api";
import { format, startOfWeek } from "date-fns";
import { useMemo, useState } from "react";

type RideItem = {
  _id: string;
  fare: number;
  createdAt?: string;
  vehicleType?: string;
};

function groupByTimeframe(
  items: RideItem[],
  tf: "daily" | "weekly" | "monthly"
) {
  // if createdAt exists, group by date transformed by timeframe
  const map = new Map<string, number>();
  const mapCount = new Map<string, number>();

  items.forEach((it) => {
    const d = it.createdAt ? new Date(it.createdAt) : new Date();
    let key: string;
    if (tf === "daily") key = format(d, "yyyy-MM-dd");
    else if (tf === "weekly") {
      // use week start date as key
      const start = startOfWeek(d, { weekStartsOn: 1 });
      key = format(start, "yyyy-MM-dd");
    } else key = format(d, "yyyy-MM");

    map.set(key, (map.get(key) || 0) + (it.fare || 0));
    mapCount.set(key, (mapCount.get(key) || 0) + 1);
  });

  const labels = Array.from(map.keys()).sort();
  const totals = labels.map((k) => map.get(k) || 0);
  const counts = labels.map((k) => mapCount.get(k) || 0);
  return { labels, totals, counts };
}

const Earnings = () => {
  const { data } = useEarningDetailsQuery(undefined);
  const items = useMemo(
    () => (
      data && Array.isArray(data.data) ? (data.data as RideItem[]) : []
    ) as RideItem[],
    [data]
  );
  const [tf, setTf] = useState<"daily" | "weekly" | "monthly">("weekly");

  const total = useMemo(
    () => items.reduce((s, r) => s + (r.fare || 0), 0),
    [items]
  );
  const rides = items.length;
  const avg = rides ? Math.round((total / rides) * 100) / 100 : 0;

  const grouped = useMemo(() => groupByTimeframe(items, tf), [items, tf]);

  // prepare chartData for ChartAreaInteractive (expecting {date, value})
  const chartData = useMemo(() => {
    return grouped.labels.map((k, i) => ({
      date: k,
      value: grouped.totals[i],
      count: grouped.counts[i],
    }));
  }, [grouped]);

  // compute current timeframe total (most recent key)
  const timeframeTotal = grouped.totals.length
    ? grouped.totals[grouped.totals.length - 1]
    : 0;
  const timeframeRides = grouped.counts.length
    ? grouped.counts[grouped.counts.length - 1]
    : 0;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards
            totalRevenue={total}
            totalRides={rides}
            avgFare={avg}
            timeframeTotal={timeframeTotal}
            timeframeRides={timeframeRides}
            timeframe={tf}
            onTimeframeChange={(v) => setTf(v)}
          />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive
              data={chartData}
              timeframe={tf}
              onTimeframeChange={(v) => setTf(v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
