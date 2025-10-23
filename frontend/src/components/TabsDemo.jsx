import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddProjectButton } from "./AddProjectButton";
import { EditProjectButton } from "./EditProjectButton";
import { DeleteProjectButton } from "./DeleteProjectButton";
import { AppWindow, Folder, Github } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { EmptyDemo } from "./EmptyDemo";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { VisibilitySwitch } from "./VisibiltySwitch";

export function TabsDemo(props) {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="portfolio">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <VisibilitySwitch />
        </div>
        <TabsContent value="portfolio">
          <Card className="rounded-tl-none">
            <CardHeader>
              <CardTitle>
                <div className="flex gap-3 items-center justify-start"><Folder/>My Projects</div> </CardTitle>
              {/* <CardDescription>
                {props.projects && props.projects.length === 0
                  ? "You have no projects click + to add new project"
                  : ""}
              </CardDescription> */}
              <CardAction>
                <AddProjectButton refreshUser={props.refreshUser} />
              </CardAction>
            </CardHeader>
            <CardContent className="grid gap-6">
              {props.projects && props.projects.length !== 0 ? (
                props.projects.map((project) => {
                  return (
                    <>
                      <Card key={project._id}>
                        <CardHeader>
                          <CardTitle>{project.title}</CardTitle>
                          <CardDescription>
                            {project.description}
                          </CardDescription>
                          <CardAction className="flex gap-2">
                            <EditProjectButton
                              project={project}
                              refreshUser={props.refreshUser}
                            />
                            <DeleteProjectButton
                              project={project}
                              refreshUser={props.refreshUser}
                            />
                          </CardAction>
                        </CardHeader>
                        <CardContent>
                          <Accordion type="single" collapsible>
                            <AccordionItem value={project._id}>
                              <AccordionTrigger>more</AccordionTrigger>
                              <AccordionContent className="flex justify-end gap-3">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button size={"icon"} variant={"outline"}>
                                      <a href={project.links[0]}>
                                        <Github />
                                      </a>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Add to library</p>
                                  </TooltipContent>
                                </Tooltip>
                                <Button size={"icon"} variant={"outline"}>
                                  <a href={project.links[1]}>
                                    <AppWindow />
                                  </a>
                                </Button>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </CardContent>
                      </Card>
                    </>
                  );
                })
              ) : (
                <EmptyDemo />
              )}
            </CardContent>
            <CardFooter className="justify-end"></CardFooter>
          </Card>
        </TabsContent>
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
