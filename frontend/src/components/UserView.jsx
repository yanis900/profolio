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
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { EditUserButton } from "./EditUserButton";
import { EditProfilePictureButton } from "./EditProfilePictureButton";
import { SendEmailButton } from "./SendEmailButton";
import { EditCvButton } from "./EditCvButton";
import { UserBadge } from "./UserBadge";
import { GithubContributions } from "./GithubContributions";

export function UserView(props) {
  if (!props.user) return null;

  return (
    <>
      <Card className="rounded-tl-none">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center space-x-4">
              <div className="w-[200px] h-[200px] rounded-full border overflow-hidden">
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
              <p className="flex gap-1 items-center">
                <MapPin />
                {props.user.location}
              </p>
              <div>
                {props.contributions ? (
                  <div className="flex flex-col gap-2">
                  Github Contributions:
                   {/* <ContributionsButton contributions={props.contributions} /> */}
                              <GithubContributions contributions={props.contributions} />
                  </div>
                  

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
          <div className="flex gap-4">
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-12 w-12 rounded-full hover:bg-blue-50 hover:border-blue-500 transition-all hover:scale-110"
            >
              <a href={props.user.links[0]} target="_blank" rel="noreferrer">
                <Linkedin className="h-5 w-5 text-blue-600" />
              </a>
            </Button>
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-12 w-12 rounded-full hover:bg-gray-900 hover:border-gray-900 transition-all hover:scale-110"
            >
              <a href={props.user.links[1]} target="_blank" rel="noreferrer">
                <Github className="h-5 w-5 hover:text-white" />
              </a>
            </Button>
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-12 w-12 rounded-full hover:bg-purple-50 hover:border-purple-500 transition-all hover:scale-110"
            >
              <a href={props.user.links[2]} target="_blank" rel="noreferrer">
                <AppWindow className="h-5 w-5 text-purple-600" />
              </a>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-end flex items-center gap-3">
          {!props.isOwner && (
            <>
              <p className="text-muted-foreground flex gap-1 items-center">
                For enquires and collaboration contact here <ChevronRight />
              </p>
              <CardAction>
                <SendEmailButton />
              </CardAction>
            </>
          )}
        </CardFooter>
      </Card>
      {/* Badges in separate card */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg">Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <UserBadge token={props.token} user={props.user} />
        </CardContent>
      </Card>
    </>
  );
}
