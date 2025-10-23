import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CardAction } from "./ui/card";
import { capitalise } from "../utils/capitalise";
import {
  AppWindow,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "./ui/shadcn-io/dropzone";
import { useState } from "react";
import { EditUserButton } from "./EditUserButton";

export function UserView(props) {
  const [files, setFiles] = useState(null);

  const handleDrop = (files) => {
    console.log(files);
    setFiles(files);
  };

  return (
    props.user && (
      <Card className="rounded-tl-none">
        <CardHeader>
          <CardTitle>
            <div className="flex gap-5 items-center">
              <img
                width={150}
                height={150}
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
                alt=""
                className="rounded-full"
              />
              <div className="text-left">
                <h3 className="text-xl">
                  {capitalise(props.user.firstname)}{" "}
                  {capitalise(props.user.lastname)}
                </h3>
                <p className="font-light">{capitalise(props.user.jobtitle)}</p>
              </div>
            </div>
          </CardTitle>
          <CardDescription>
            <div className="mt-2 space-y-4 text-left">
              {props.user.opentowork ? (
                <Badge variant={'outline'} className="border-2 border-blue-500">open to work</Badge>
              ) : (
                ""
              )}
              <p>{props.user.bio}</p>
              <p>📍 {props.user.location}</p>
            </div>
          </CardDescription>
          <CardAction>
            <EditUserButton user={props.user} />
          </CardAction>
        </CardHeader>
        <CardContent className="grid place-items-center gap-6">
          <Dropzone
            accept={{ "image/*": [] }}
            maxFiles={10}
            maxSize={1024 * 1024 * 10}
            minSize={1024}
            onDrop={handleDrop}
            onError={console.error}
            src={files}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>
          <div className="flex gap-3">
            <Button variant={"outline"} size={"icon"}>
              <a href={props.user.links[0]} target="_blank" rel="noreferrer">
                <Linkedin />
              </a>
            </Button>
            <Button variant={"outline"} size={"icon"}>
              <a href={props.user.links[1]} target="_blank" rel="noreferrer">
                <Github />
              </a>
            </Button>
            <Button variant={"outline"} size={"icon"}>
              <a href={props.user.links[2]} target="_blank" rel="noreferrer">
                <AppWindow />
              </a>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-end flex items-center gap-3">
          <p className="text-muted-foreground flex gap-1 items-center">
            For enquires and collaboration contact here <ChevronRight />
          </p>
          <CardAction className={'border-2 border-purple-500'}>
            <Button variant={"outline"} size={"icon"}>
              <Mail />
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    )
  );
}
