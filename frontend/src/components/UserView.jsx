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
  Briefcase,
  ChevronRight,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";
import { Button } from "./ui/button";
import { EditUserButton } from "./EditUserButton";
import { EditProfilePictureButton } from "./EditProfilePictureButton";
import { SendEmailButton } from "./SendEmailButton";
import { EditCvButton } from "./EditCvButton";
import { UserBadge } from "./UserBadge";
import { GithubContributions } from "./GithubContributions";

export function UserView(props) {
  return (
    props.user && (
      <Card className="rounded-xl" style={{ boxShadow: "#0A2243 10px 10px" }}>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center space-x-4">
              <div className="w-[170px] h-[170px] rounded-full border overflow-hidden relative">
                {props.isOwner ? (
                  <EditProfilePictureButton
                    user={props.user}
                    refreshUser={props.refreshUser}
                    />
                ) : (
                  <img
                    src={props.user.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
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
            <div className="mt-6 space-y-6 text-left">
              {props.user.opentowork ? (
                <p className="flex gap-2 items-center">
                  <Briefcase />
                  Open to Work
                </p>
              ) : (
                ""
              )}
              <p>{props.user.bio}</p>
              <p className="flex gap-1 items-center">
                <MapPin />
                {props.user.location}
              </p>
              <div className="w-[460px] border-t border-gray-300 ">
                {props.contributions ? (
                  <div className="flex flex-col gap-2 mt-5 -mb-5">
                    Github Contributions:
                    <GithubContributions contributions={props.contributions} />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </CardDescription>
          {props.isOwner && (
            <CardAction className='flex gap-2'>
              <EditUserButton user={props.user} />
                <EditCvButton refreshUser={props.refreshUser} />
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
            <UserBadge token={props.token} user={props.user} />
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
    )
  );
}
