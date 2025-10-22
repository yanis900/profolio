// import { AppWindowIcon, CodeIcon } from "lucide-react"

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

export function TabsDemo(props) {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="portfolio">
        <TabsList>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="portfolio">
          <Card className="rounded-tl-none">
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>
                {props.projects && props.projects.length === 0
                  ? "You have no projects click + Add Project to display"
                  : ""}
              </CardDescription>
              <CardAction>
                <AddProjectButton />
              </CardAction>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6">
              {props.projects && props.projects.map((project) => {
                    return (
                      <>
                        <Card key={project._id}>
                          <CardHeader>
                            <CardTitle>{project.title}</CardTitle>
                            <CardDescription>
                              {project.description}
                            </CardDescription>
                            <CardAction className="flex gap-2">
                              <EditProjectButton project={project} />
                              <DeleteProjectButton project={project} />
                            </CardAction>
                          </CardHeader>
                          <CardContent>
                            {/* <Button size={"icon"}>
                              <a href={project.links[0]}>
                                <Link />
                              </a>
                            </Button>
                            <Button size={"icon"}>
                              <a href={project.links[1]}>
                                <Link />
                              </a>
                            </Button> */}
                          </CardContent>
                        </Card>
                      </>
                    );
                  })}
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
