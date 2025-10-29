import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { capitalise } from "../utils/capitalise";
import { AppWindow, Github } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export function ProjectSearchResults({ results }) {
  const navigate = useNavigate();

  function handleUserClick(project) {
    const slug = `${project.firstname}-${project.lastname}-${project.userId.slice(-6)}`;
    navigate(`/portfolio/${slug}`);
  }
  
  return (
    <>
      {results.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-12">
            <p className="text-lg text-muted-foreground">
              No projects found matching your search.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Try different tags.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {results.map((project) => (
            <Card
              key={project.project._id}
              className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-500"
              onClick={() => handleUserClick(project)}

            >
              <CardHeader>
                <CardAction>
                  <CardDescription>

                  By {capitalise(project.firstname)} {capitalise(project.lastname)}
                  </CardDescription>
                </CardAction>
                <CardTitle>
                  <div className="flex items-center gap-4">
                    {/* Project Thumbnail */}
                    <img
                      src={project.project.thumbnail}
                      alt={project.project.title}
                      className="w-30 h-30 rounded-xl border-2 border-purple-300 object-cover"
                    />

                    {/* Project Info */}
                    <div className="flex-1 text-left">
                      <h4 className="text-xl font-semibold">
                        {project.project.title}
                      </h4>
                      {project.project.description && (
                        <p className="text-sm font-normal text-muted-foreground line-clamp-2">
                          {project.project.description}
                        </p>
                      )}

                      {/* Tags */}
                      {project.project.tags &&
                        project.project.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {project.project.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                      {/* Links */}
                      {project.project.links &&
                        project.project.links.length > 0 && (
                          <div className="flex gap-2 mt-3">
                            {project.project.links[0] && (
                              <Button size="icon" variant="link">
                                <a
                                  href={project.project.links[0]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Github />
                                </a>
                              </Button>
                            )}
                            {project.project.links[1] && (
                              <Button size="icon" variant="link">
                                <a
                                  href={project.project.links[1]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <AppWindow />
                                </a>
                              </Button>
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
