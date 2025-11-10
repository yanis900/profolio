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
import { EditProfilePictureButton } from "./EditProfilePictureButton";
import { SendEmailButton } from "./SendEmailButton";
import { UserBadge } from "./UserBadge";
import { GithubContributions } from "./GithubContributions";
import { EditProfileBannerButton } from "./EditProfileBannerButton";
import { Badge } from "./ui/badge";
import TestDropdown from "./TestDropdown";

export function UserView(props) {
  return (
    props.user && (
      <Card
        className="rounded-xl pt-0 overflow-hidden"
        style={{ boxShadow: "#0A2243 10px 10px" }}
      >
        <div className="relative">
          <div className=" h-20vh p-1">
            {props.isOwner ? (
              <EditProfileBannerButton
                user={props.user}
                refreshUser={props.refreshUser}
              />
            ) : (
              <img
                src={props.user.banner}
                alt=""
                className="w-full h-[200px] object-center rounded-t-lg"
              />
            )}
            <TestDropdown user={props.user}/>
          </div>
          <div className="absolute -bottom-15 left-5 border p-0.5 rounded-full bg-white">
            {props.isOwner ? (
              <EditProfilePictureButton
                user={props.user}
                refreshUser={props.refreshUser}
              />
            ) : (
              <img
                width={120}
                height={120}
                src={props.user.image}
                alt=""
                className="object-cover rounded-full"
              />
            )}
          </div>
        </div>
        <CardHeader className="mt-12 space-y-1">
          <CardTitle>
            <div className="text-left">
              <h3 className="text-xl">
                {capitalise(props.user.firstname)}{" "}
                {capitalise(props.user.lastname)}
              </h3>
              <p className="font-light">{capitalise(props.user.jobtitle)}</p>
            </div>
          </CardTitle>
          <CardDescription>
            <div className="space-y-2 text-left">
              <p className="flex gap-1 items-center">
                <MapPin className="w-5 h-5" />
                {props.user.location}
              </p>
              {props.user.opentowork ? (
                <Badge
                  variant={"outline"}
                  className="flex gap-2 items-center bg-[#FFD300]"
                >
                  <Briefcase className="w-5 h-5" />
                  Open to Work
                </Badge>
              ) : (
                ""
              )}
              <p>{props.user.bio}</p>
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
