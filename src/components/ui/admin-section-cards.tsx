import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Metrics {
  totalRevenue?: number;
  totalRides?: number;
  topDriver?: { name: string; rides: number; earnings: number } | null;
  mostUsedVehicle?: string | null;
}

const AdminSectionCards = ({ metrics }: { metrics?: Metrics }) => {
  const revenue = metrics?.totalRevenue ?? 0;
  const rides = metrics?.totalRides ?? 0;
  const topDriver = metrics?.topDriver;
  const vehicle = metrics?.mostUsedVehicle ?? "-";

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {revenue.toLocaleString(undefined, {
              style: "currency",
              currency: "BDT",
              maximumFractionDigits: 0,
            })}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total revenue from completed rides
          </div>
          <div className="text-muted-foreground">Currency: BDT</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Rides</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {rides.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Completed rides
          </div>
          <div className="text-muted-foreground">
            Showing rides with status COMPLETED
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Top Driver</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {topDriver ? `${topDriver.name}` : "-"}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {topDriver
              ? `${topDriver.rides} rides • ${topDriver.earnings} BDT`
              : "No data"}
          </div>
          <div className="text-muted-foreground">
            Driver with most earning completed rides
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Most Used Vehicle</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {vehicle}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Most frequent vehicleType
          </div>
          <div className="text-muted-foreground">Based on completed rides</div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminSectionCards;
