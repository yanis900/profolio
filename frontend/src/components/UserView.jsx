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
import { EditUserButton } from "./EditUserButton";
import { EditProfilePictureButton } from "./EditProfilePictureButton";
import { EditCvButton } from "./EditCvButton";
import { ContributionsButton } from "./ContributionsButton";
import { UserBadge } from "./UserBadge";

export function UserView(props) {
  return (
    props.user && (
      <Card className="rounded-tl-none">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center space-x-4">
              <div className="w-[150px] h-[150px] rounded-full border overflow-hidden">
                <img
                  src={props.user.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
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
              <div>
                {props.contributions ? (
                  <ContributionsButton contributions={props.contributions} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </CardDescription>
          {props.isOwner && (
            <CardAction className={"grid grid-cols-2 gap-2"}>
              <EditProfilePictureButton
                user={props.user}
                refreshUser={props.refreshUser}
              />
              <EditUserButton user={props.user} />
              <div className="col-start-2">
                <EditCvButton refreshUser={props.refreshUser} />
              </div>
            </CardAction>
          )}
        </CardHeader>
        <CardContent className="grid place-items-center gap-6">
          <div className="flex gap-3 mt-2">
            {props.user.cv && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(props.user.cv, "_blank")}
              >
                View CV
              </Button>
            )}
          </div>
          <div>
            <UserBadge token={props.token} />
          </div>
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
