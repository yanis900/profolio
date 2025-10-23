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
import { TabsContent } from "./ui/tabs";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { NoProjects } from "./NoProjects";
import { Button } from "./ui/button";

export function ProjectsView(props) {
  return (
    <TabsContent value="portfolio">
      <Card className="rounded-tl-none">
        <CardHeader>
          <CardTitle>
            <div className="flex gap-3 items-center justify-start">
              <Folder />
              My Projects
            </div>{" "}
          </CardTitle>
          <CardDescription></CardDescription>
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
                      <div className="flex gap-3">
                        <img
                          width={150}
                          height={150}
                          src={
                            "https://profile-image-software-dev-project3.s3.eu-west-2.amazonaws.com/default+profile.png"
                          }
                          // alt={project.title}
                          className="w-32 h-32 rounded-xl border object-cover"
                        />
                        <div className="text-left space-y-1">
                          <CardTitle>{project.title}</CardTitle>
                          <CardDescription>
                            {project.description}
                          </CardDescription>
                        </div>
                      </div>
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
                    {/* <CardContent>
                      <Accordion type="single" collapsible>
                        <AccordionItem value={project._id}>
                          <AccordionTrigger></AccordionTrigger>
                          <AccordionContent className="flex justify-end gap-3"></AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent> */}
                    <CardFooter className={"justify-end"}>
                      <CardAction className={'space-x-2'}>
                        <Button size={"icon"} variant={"outline"}>
                          <a href={project.links[0]}>
                            <Github />
                          </a>
                        </Button>
                        <Button size={"icon"} variant={"outline"}>
                          <a href={project.links[1]}>
                            <AppWindow />
                          </a>
                        </Button>
                      </CardAction>
                    </CardFooter>
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
  );
}
