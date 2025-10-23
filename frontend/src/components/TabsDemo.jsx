import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { VisibilitySwitch } from "./VisibiltySwitch";
import { ProjectsView } from "./ProjectsView";

export function TabsDemo(props) {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="portfolio">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="analytics" className='border-2 border-purple-500'>Analytics</TabsTrigger>
          </TabsList>
          <VisibilitySwitch />
        </div>
        <ProjectsView refreshUser={props.refreshUser} projects={props.projects}/>

        <TabsContent value="analytics">
          <Card className="rounded-tl-none">
            <CardHeader>
              <CardTitle></CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6"></CardContent>
            <CardFooter>
              <Button></Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
      </Tabs>
    </div>
  );
}
