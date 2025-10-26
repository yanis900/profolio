import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VisibilitySwitch } from "./VisibiltySwitch";
import { ProjectsView } from "./ProjectsView";
import { AnalyticsView } from "./AnalyticsView";

export function TabsDemo(props) {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="portfolio">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            {props.isOwner && (
              <TabsTrigger value="analytics" className='border-2 border-purple-500'>Analytics</TabsTrigger>
            )}
          </TabsList>
          {props.isOwner && <VisibilitySwitch user={props.user} refreshUser={props.refreshUser} />}
        </div>
        <ProjectsView refreshUser={props.refreshUser} projects={props.projects} isOwner={props.isOwner} />
        {props.isOwner && <AnalyticsView views={props.views}/>}
      </Tabs>
    </div>
  );
}
