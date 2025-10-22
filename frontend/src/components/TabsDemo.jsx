// import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogDemo } from "./DialogDemo";
import { Trash } from "lucide-react";
import { deleteProject } from "../services/projects";

export function TabsDemo(props) {
  const token = localStorage.getItem("token");

  async function handleDelete(id) {
    try {
      console.log(props.projects);
      await deleteProject(token, id);
    } catch (error) {
      console.error(error);
    }
  }

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
                {props.projects &&
                  props.projects.map((project) => {
                    return (
                      <>
                        <Card className="m-20" key={project._id}>
                          <CardHeader>
                            <CardTitle>{project.title}</CardTitle>
                            <CardDescription>
                              Description: {project.description}
                            </CardDescription>
                          </CardHeader>
                          Github: {project.links[0]}
                          Website: {project.links[1]}
                          <Button
                            size={"icon"}
                            variant={"destructive"}
                            onClick={() => handleDelete(project._id)}
                          >
                            <Trash />
                          </Button>
                        </Card>
                      </>
                    );
                  })}
              </CardDescription>
              <DialogDemo />
            </CardHeader>
            <CardContent className="grid gap-6"></CardContent>
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
