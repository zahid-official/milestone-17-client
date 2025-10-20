// React import not required with new JSX transform
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface DriverStat {
  name: string;
  rides: number;
  earnings: number;
}

const chartConfig = {
  desktop: {
    label: "Earnings",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function AdminDriverBar({
  data,
  title = "Driver Performance",
  description,
}: {
  data: DriverStat[];
  title?: string;
  description?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description ?? "Earnings by driver"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" dataKey="earnings" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="earnings" fill="var(--color-primary)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Driver earnings (BDT)
        </div>
      </CardFooter>
    </Card>
  );
}
