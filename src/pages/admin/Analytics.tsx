import AdminChartAreaInteractive from "@/components/ui/admin-chart-area-interactive";
import AdminSectionCards from "@/components/ui/admin-section-cards";
import AdminDriverBar from "@/components/ui/admin-driver-bar";
import { AdminChartBarHorizontal } from "@/components/ui/admin-chart-bar-horizontal";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalyticsQuery } from "@/redux/features/admin/admin.api";

type Ride = {
  status?: string;
  fare?: number | string;
  vehicleType?: string;
  driverId?: string;
  driverInfo?: { name?: string; email?: string; vehicleInfo?: { vehicleType?: string } };
  timestamps?: { completedAt?: string };
  completedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

const toDateKey = (iso?: string) => {
  if (!iso) return null;
  const d = new Date(iso);
  // YYYY-MM-DD
  return d.toISOString().slice(0, 10);
};

const AnalyticsSkeleton = () => (
  <div className="flex flex-1 flex-col">
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full rounded-xl" />
          ))}
        </div>
        <div className="px-4 lg:px-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-72 w-full rounded-xl" />
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
        <div className="px-4 lg:px-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-72 w-full rounded-xl" />
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
      </div>
    </div>
  </div>
);

const Analytics = () => {
  const { data, isLoading } = useAnalyticsQuery(undefined);
  const rides: Ride[] = data?.data ?? [];

  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  // only completed rides
  const completed = rides.filter((r) => r.status === "COMPLETED");

  // totals
  const totalRides = completed.length;
  const totalRevenue = completed.reduce((s, r) => s + (Number(r.fare) || 0), 0);

  // most used vehicle
  const vehicleCount: Record<string, number> = {};
  completed.forEach((r) => {
    const v = r.vehicleType ?? r.driverInfo?.vehicleInfo?.vehicleType ?? "UNKNOWN";
    vehicleCount[v] = (vehicleCount[v] || 0) + 1;
  });
  const mostUsedVehicle = Object.entries(vehicleCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  // driver stats
  const driverMap: Record<string, { name: string; rides: number; earnings: number }> = {};
  completed.forEach((r) => {
    const id = r.driverId ?? r.driverInfo?.email ?? r.driverInfo?.name ?? "unknown";
    const name = r.driverInfo?.name ?? "Unknown";
    if (!driverMap[id]) driverMap[id] = { name, rides: 0, earnings: 0 };
    driverMap[id].rides += 1;
    driverMap[id].earnings += Number(r.fare) || 0;
  });

  const driverStats = Object.values(driverMap).sort((a, b) => b.earnings - a.earnings);
  const topDriver = driverStats[0] ?? null;

  // time series for rides/revenue by date
  const seriesMap: Record<string, { rides: number; revenue: number }> = {};
  completed.forEach((r) => {
    const key = toDateKey(r.timestamps?.completedAt ?? r.completedAt ?? r.updatedAt ?? r.createdAt);
    if (!key) return;
    if (!seriesMap[key]) seriesMap[key] = { rides: 0, revenue: 0 };
    seriesMap[key].rides += 1;
    seriesMap[key].revenue += Number(r.fare) || 0;
  });

  const series = Object.entries(seriesMap)
    .map(([date, vals]) => ({ date, rides: vals.rides, revenue: vals.revenue }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  // prepare driver bar data
  const driverBarData = driverStats.map((d) => ({ name: d.name, rides: d.rides, earnings: d.earnings }));

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <AdminSectionCards
            metrics={{
              totalRevenue,
              totalRides,
              topDriver: topDriver ? { name: topDriver.name, rides: topDriver.rides, earnings: topDriver.earnings } : null,
              mostUsedVehicle,
            }}
          />

          <div className="px-4 lg:px-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <AdminChartAreaInteractive
              data={series.map((s) => ({ date: s.date, rides: s.rides }))}
              valueKey="rides"
              title="Ride Volume"
              description="Count of completed rides over time"
            />

            <AdminChartAreaInteractive
              data={series.map((s) => ({ date: s.date, revenue: s.revenue }))}
              valueKey="revenue"
              title="Revenue Trends"
              description="Total fare collected over time (BDT)"
            />
          </div>

          <div className="px-4 lg:px-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <AdminDriverBar data={driverBarData} />

            <AdminChartBarHorizontal
              data={driverBarData}
              dataKey="rides"
              labelKey="name"
              title="Driver Ride Counts"
              description="Number of completed rides per driver"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
