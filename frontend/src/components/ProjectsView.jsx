import { AddProjectButton } from "./AddProjectButton";
import { EditProjectButton } from "./EditProjectButton";
import { DeleteProjectButton } from "./DeleteProjectButton";
import { Folder, Loader2, CheckCircle2, Rocket } from "lucide-react";
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
import { ImageZoom } from "./ui/shadcn-io/image-zoom";
import { Badge } from "./ui/badge";

function getStateConfig(state) {
  switch (state) {
    case "In Progress":
      return {
        icon: Loader2,
        bgColor: "bg-blue-50",
        textColor: "text-blue-700",
        ringColor: "ring-blue-700/10",
        shadowColor: "#FFD300",
        label: "In Progress",
      };
    case "Completed (Not Deployed)":
      return {
        icon: CheckCircle2,
        bgColor: "bg-green-50",
        textColor: "text-green-700",
        ringColor: "ring-green-700/10",
        shadowColor: "#3B82F6",
        label: "Completed (Not Deployed)",
      };
    case "Completed & Deployed":
      return {
        icon: Rocket,
        bgColor: "bg-purple-50",
        textColor: "text-purple-700",
        ringColor: "ring-purple-700/10",
        shadowColor: "#10B981",
        label: "Completed & Deployed",
      };
    default:
      return {
        icon: Loader2,
        bgColor: "bg-gray-50",
        textColor: "text-gray-700",
        ringColor: "ring-gray-700/10",
        shadowColor: "#6B7280",
        label: state,
      };
  }
}

export function ProjectsView(props) {
  return (
    <TabsContent value="portfolio">
      <Card
        className="rounded-tl-none"
        style={{ boxShadow: "#0A2243 10px 10px" }}
      >
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
        <CardContent className="grid grid-cols-3 gap-6">
          {props.projects && props.projects.length !== 0 ? (
            props.projects.map((project) => {
              const stateConfig = getStateConfig(project.states);
              return (
                <>
                  <Card
                    key={project._id}
                    className="pt-0 overflow-hidden hover:translate-x-2.5 hover:translate-y-2.5 transition-all duration-200 ease-in-out"
                    style={{
                      boxShadow: "#0A2243 10px 10px",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow = "none")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "#0A2243 10px 10px")
                    }
                  >
                    <ImageZoom>
                      <img
                        width={150}
                        height={150}
                        src={project.thumbnail}
                        // alt={project.title}
                        className="w-full object-cover h-[200px] object-center"
                      />
                    </ImageZoom>

                    {/* <div className="flex gap-3"> */}
                    {/* <div className="text-left space-y-1"> */}
                    <CardContent className="text-left space-y-2">
                      <CardTitle>{project.title}</CardTitle>
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
                            <Badge key={index} variant={"secondary"}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <CardDescription>{project.description}</CardDescription>
                      {project.links.length > 0 && (
                        <div className="flex gap-2">
                          {project.links[0] && (
                            <Button asChild variant="outline">
                              <a
                                href={project.links[0]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="no-underline hover:no-underline focus:no-underline"
                              >
                                Github
                              </a>
                            </Button>
                          )}
                          {project.links[1] && (
                            <Button
                              asChild
                              className="bg-[#FFD300] text-[#0A2243] hover:bg-[#0A2243] hover:text-[#FFD300]"
                            >
                              <a
                                href={project.links[1]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="no-underline hover:no-underline focus:no-underline"
                              >
                                Live Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      )}
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
                    </CardContent>

                    {/* </div> */}
                    {/* </div> */}
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
