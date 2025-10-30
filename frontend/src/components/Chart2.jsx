import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

export const description = "A radial chart with text";

export function Chart2(props) {
 const chartData = [
  {
    total: "total",
    emails: props.emails?.totalEmails ?? 0,
    fill: "var(--color-total)",
  },
];

const chartConfig = {
  emails: {
    label: "Emails",
  },
  total: {
    label: "Total",
    color: "var(--chart-1)",
  },
};
  return (
    <Card className="flex flex-col" style={{ boxShadow: '#0A2243 10px 10px' }}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Emails Received</CardTitle>
        <CardDescription>-</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={250}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="emails" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].emails.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Emails received
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
        <CardDescription>Last 6 months</CardDescription>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-start flex-col gap-2 leading-none w-full max-w-sm font-medium">
          <div className="flex gap-3 items-center justify-center">
            <div className="w-5 h-5 rounded-full border bg-[#f54a00]"></div>
                Moblie
          </div>
          <div className="flex gap-3 items-center justify-center">
            <div className="w-5 h-5 rounded-full border bg-[#009689]"></div>

                Desktop
          </div>
        </div> */}
      </CardFooter>
    </Card>
  );
}
