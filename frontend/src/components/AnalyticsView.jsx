import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { ViewsChart } from "./ViewsChart";

export function AnalyticsView(props) {

    return (
        <TabsContent value="analytics">
          <Card className="rounded-tl-none">
            <CardHeader>
              <CardTitle></CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
              <ViewsChart views={props.views}/>
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
        </TabsContent>
    )
}