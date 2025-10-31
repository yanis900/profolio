import { AddProjectButton } from "./AddProjectButton";
import { EditProjectButton } from "./EditProjectButton";
import { DeleteProjectButton } from "./DeleteProjectButton";
import { AppWindow, Folder, Github, Loader2, CheckCircle2, Rocket } from "lucide-react";
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

function getStateConfig(state) {
  switch (state) {
    case "In Progress":
      return {
        icon: Loader2,
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        ringColor: "ring-blue-700/10",
        shadowColor: "#FFD300",
        label: "In Progress"
      };
    case "Completed (Not Deployed)":
      return {
        icon: CheckCircle2,
        bgColor: "bg-green-50",
        textColor: "text-green-700",
        ringColor: "ring-green-700/10",
        shadowColor: "#3B82F6",
        label: "Completed (Not Deployed)"
      };
    case "Completed & Deployed":
      return {
        icon: Rocket,
        bgColor: "bg-purple-50",
        textColor: "text-purple-700",
        ringColor: "ring-purple-700/10",
        shadowColor: "#10B981",
        label: "Completed & Deployed"
      };
    default:
      return {
        icon: Loader2,
        bgColor: "bg-gray-50",
        textColor: "text-gray-700",
        ringColor: "ring-gray-700/10",
        shadowColor: "#6B7280",
        label: state
      };
  }
}

export function ProjectsView(props) {
  return (
    <TabsContent value="portfolio">
      <Card className="rounded-tl-none" style={{ boxShadow: '#0A2243 10px 10px' }}>
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
              const stateConfig = getStateConfig(project.states);
              return (
                <>
                  <Card
                    key={project._id}
                    style={{
                      boxShadow: '#0A2243 10px 10px',
                      // borderLeft: `4px solid ${stateConfig.shadowColor}`,
                      // borderTop: `4px solid ${stateConfig.shadowColor}`
                    }}
                  >
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
                          {project.states && (
                            <div className="pt-2">
                              <span
                                className={`inline-flex items-center gap-1 rounded-md ${stateConfig.bgColor} px-2 py-1 text-xs font-medium ${stateConfig.textColor} ring-1 ring-inset ${stateConfig.ringColor}`}
                              >
                                <stateConfig.icon className="w-3 h-3" />
                                {stateConfig.label}
                              </span>
                            </div>
                          )}
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
