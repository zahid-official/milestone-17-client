// imports intentionally minimal for this component
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

export const description = "A horizontal bar chart";

interface Props {
  data: Array<{ [key: string]: string | number }>;
  dataKey: string;
  labelKey?: string;
  title?: string;
  description?: string;
}

const chartConfig = {
  desktop: {
    label: "Value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function AdminChartBarHorizontal({
  data,
  dataKey,
  labelKey = "name",
  title = "Driver Performance",
  description,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description ?? "Top performers"}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data} layout="vertical">
            <XAxis type="number" dataKey={dataKey} hide />
            <YAxis
              dataKey={labelKey}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                typeof value === "string" ? value.slice(0, 12) : String(value)
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey={dataKey} fill="var(--color-primary)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          {description ?? "Showing summary"}
        </div>
      </CardFooter>
    </Card>
  );
}
