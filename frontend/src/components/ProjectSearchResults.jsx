import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { capitalise } from "../utils/capitalise";
import { MapPin } from "lucide-react";

export function ProjectSearchResults({ results }) {
            return (
                <>
                {results.length === 0 ? (
                    <Card className="border-2 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-12">
                    <p className="text-lg text-muted-foreground">
                    No projects found matching your search.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                    Try a different tags.
                    </p>
                    </CardContent>
                    </Card>
                ) : (
                <div className="space-y-4">
                {results.map((project) => (
                  <Card
                    key={project._id}
                    className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-purple-500"
                  >
                    <CardHeader>
                      <CardTitle>
                        <div className="flex items-center gap-4">
                          {/* project Avatar */}
                          <img
                            src={project.thumbnail}
                            alt={`${project.firstname} ${project.lastname}`}
                            className="w-16 h-16 rounded-full border-2 border-purple-300"
                          />

                          {/* project Info */}
                          <div className="flex-1">
                            <h4 className="text-xl font-semibold">
                              {capitalise(project.firstname)}{" "}
                              {capitalise(project.lastname)}
                            </h4>
                            {project.jobtitle && (
                              <p className="text-sm font-normal text-muted-foreground">
                                {capitalise(project.jobtitle)}
                              </p>
                            )}
                            <div className="flex gap-2 mt-2 items-center flex-wrap">
                              {project.project.title && (
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                  <MapPin size={14} />
                                  {project.project.title}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    {project.project.description && (
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.project.description}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
                )}
                </>
            )
}