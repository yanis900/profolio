import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VisibilitySwitch } from "./VisibiltySwitch";
import { ProjectsView } from "./ProjectsView";
import { AnalyticsView } from "./AnalyticsView";
import { TimerReset } from "lucide-react";

export function TabsDemo(props) {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="portfolio">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            {props.isOwner && (
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            )}
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-[#0A2243]">
              <TimerReset className="w-4 h-4" />
              Last updated:{" "}
              {props.user?.lastUpdated
                ? new Date(props.user.lastUpdated).toLocaleString()
                : "N/A"}
            </div>
            {props.isOwner && (
              <VisibilitySwitch
                user={props.user}
                refreshUser={props.refreshUser}
              />
            )}
          </div>
        </div>
        <ProjectsView
          refreshUser={props.refreshUser}
          projects={props.projects}
          isOwner={props.isOwner}
        />
        {props.isOwner && (
          <AnalyticsView views={props.views} emails={props.emails} />
        )}
      </Tabs>
    </div>
  );
}
