import React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function ViewsChart(props) {
  const chartConfig = {
    total: {
      label: "Total Views",
      color: "var(--chart-1)",
    },
  };

  const chartData = React.useMemo(() => {
    if (!props.views?.views) return [];

    const counts = {};

    props.views.views.forEach((view) => {
      if (!view.viewedAt) return; // skip invalid entries
      const date = new Date(view.viewedAt).toISOString().split("T")[0]; // YYYY-MM-DD
      counts[date] = (counts[date] || 0) + 1;
    });

    return Object.entries(counts).map(([date, total]) => ({ date, total }));
  }, [props.views]);

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b sm:flex-row">
        <div>
          <div className="flex flex-1 flex-col items-start justify-center mt-3">
            <CardDescription>Total Views</CardDescription>
            <CardTitle className="text-3xl font-bold">
              {props.views?.totalViews?.toLocaleString() || 0}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[200px] w-full"
        >
          <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
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
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="total"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }
                />
              }
            />
            <Line
              dataKey="total"
              type="bump"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
