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
import { AppWindow, ChevronRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "./ui/shadcn-io/dropzone";
import { useState, useRef} from "react";
import { EditUserButton } from "./EditUserButton";
import { EditProfilePictureButton } from "./EditProfilePictureButton";
import { uploadCV } from "../services/upload";

export function UserView(props) {
  const [cvFile, setCvFile] = useState(null);
  const [cvPreview, setCvPreview] = useState(null);

  // const handleDrop = (files) => {
  //   console.log(files);
  //   setFiles(files);
  // };
  const handleCvDrop = (files) => {
    if (files.length > 0) {
      setCvFile(files[0]);
      setCvPreview(files[0].name); // or just show file name
    }
  };

  async function handleCvUpload() {
    if (!cvFile) return;

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("file", cvFile); // make sure backend expects 'file'

      await uploadCV(token, formData); // call your backend service
      setCvFile(null);
      setCvPreview(null);
      props.refreshUser(); // refresh user to show updated CV link if needed
      alert("CV uploaded successfully!");
    } catch (err) {
      console.error("Error uploading CV:", err);
      alert("Failed to upload CV");
    }
  }

  return (
    props.user && (
      <Card className="rounded-tl-none">
        <CardHeader>
          <CardTitle>
            <div className="flex gap-5 items-center">
              <img
                width={150}
                height={150}
                src={props.user.image}
                alt=""
                className="rounded-full border"
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
                <Badge variant={"outline"} className="border-2 border-blue-500">
                  open to work
                </Badge>
              ) : (
                ""
              )}
              <p>{props.user.bio}</p>
              <p>📍 {props.user.location}</p>
            </div>
          </CardDescription>
          <CardAction className={"flex gap-2"}>
            <EditProfilePictureButton user={props.user} refreshUser={props.refreshUser}/>
            <EditUserButton user={props.user} />
          </CardAction>
        </CardHeader>
        <CardContent className="grid place-items-center gap-6">
          <Dropzone
            className={"border-2 border-purple-500"}
            accept={{ "application/pdf": [".pdf"], "application/msword": [".doc"],"application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],"text/plain": [".txt"] }}
            maxFiles={10}
            maxSize={1024 * 1024 * 10}
            minSize={1024}
            onDrop={handleCvDrop}
            onError={console.error}
            src={cvFile ? [cvFile] : []}
          >
              <DropzoneEmptyState>
                {cvPreview ? (
                  <p>Selected file: {cvPreview}</p>
                ) : (
                  <p>Drag & drop your CV here, or click to select</p>
                )}
              </DropzoneEmptyState>
            <DropzoneContent />
          </Dropzone>
          <Button onClick={handleCvUpload} disabled={!cvFile}>
            Upload CV
          </Button>

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
          <CardAction className={"border-2 border-purple-500"}>
            <Button variant={"outline"} size={"icon"}>
              <Mail />
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    )
  );
}
