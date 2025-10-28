import { AddProjectButton } from "./AddProjectButton";
import { EditProjectButton } from "./EditProjectButton";
import { DeleteProjectButton } from "./DeleteProjectButton";
import { AppWindow, Folder, Github } from "lucide-react";
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
              {props.isOwner ? "My Projects" : "Projects"}
            </div>{" "}
          </CardTitle>
          <CardDescription></CardDescription>
          {props.isOwner && (
            <CardAction>
              <AddProjectButton refreshUser={props.refreshUser} />
            </CardAction>
          )}
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
                          src={project.thumbnail}
                          // alt={project.title}
                          className="w-32 h-32 rounded-xl border object-cover"
                        />
                        <div className="text-left space-y-1">
                          <CardTitle>{project.title}</CardTitle>
                          <CardDescription>
                            {project.description}
                          </CardDescription>
                          {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-2">
                              {project.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="space-x-2">
                            <Button size={"icon"} variant={"link"}>
                              <a href={project.links[0]}>
                                <Github />
                              </a>
                            </Button>
                            <Button size={"icon"} variant={"link"}>
                              <a href={project.links[1]}>
                                <AppWindow />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>
                      {props.isOwner && (
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
                      )}
                    </CardHeader>
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
