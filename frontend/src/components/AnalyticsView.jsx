import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Chart } from "./Chart";
import { Chart2 } from "./Chart2";

export function AnalyticsView(props) {
 
    return (
        <TabsContent value="analytics">
          <Card className="rounded-tl-none" style={{ boxShadow: '#0A2243 10px 10px' }}>
            <CardHeader>
              <CardTitle></CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
          <Chart views={props.views} />
          <Chart2 emails={props.emails} />
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
        </TabsContent>
    )
}