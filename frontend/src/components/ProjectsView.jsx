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
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { TabsContent } from "./ui/tabs";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { NoProjects } from "./NoProjects";
import { Button } from "./ui/button";


export function ProjectsView(props) {
    return(
        <TabsContent value="portfolio">
          <Card className="rounded-tl-none">
            <CardHeader>
              <CardTitle>
                <div className="flex gap-3 items-center justify-start"><Folder/>My Projects</div> </CardTitle>
              <CardDescription>
              </CardDescription>
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
                <NoProjects />
              )}
            </CardContent>
            <CardFooter className="justify-end"></CardFooter>
          </Card>
        </TabsContent>
    )
}