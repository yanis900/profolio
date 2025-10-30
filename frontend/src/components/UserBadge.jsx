import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getUserBadge } from "../services/user";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { useParams } from "react-router-dom";

import views_50 from "/50_views_badge.png"
import views_100 from "/100_views_badge.png"
import projects_5 from "/5_projects_badge.png"
import emails_10 from "/10_emails_badge.png"
import CV_uploaded from "/CV_uploaded_badge.png"
import no_badge from "/no_badge.png"

export const BADGE_CONFIG = {
  "50_views": {
    id: "50_views",
    title: "Rising Star",
    description: "Reached 50 total views",
    flavorText: "Your content is starting to shine!",
    img: views_50,
    gradient: "from-orange-400 via-amber-400 to-orange-500",
    glowColor: "shadow-orange-500/50",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  "100_views": {
    id: "100_views",
    title: "Viral Sensation",
    description: "Reached 100 total views",
    flavorText: "You're on fire! Keep it up!",
    img: views_100,
    gradient: "from-orange-400 via-amber-400 to-orange-500",
    glowColor: "shadow-orange-500/50",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  "10_emails": {
    id: "10_emails",
    title: "Communication Master",
    description: "Received 10 emails",
    flavorText: "Connecting people, one email at a time",
    img: emails_10,
    gradient: "from-orange-400 via-amber-400 to-orange-500",
    glowColor: "shadow-orange-500/50",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  "5_projects": {
    id: "5_projects",
    title: "Project Pioneer",
    description: "Created 5 projects",
    flavorText: "Building the future, one project at a time",
    img: projects_5,
    gradient: "from-orange-400 via-amber-400 to-orange-500",
    glowColor: "shadow-orange-500/50",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  cv_uploaded: {
    id: "cv_uploaded",
    title: "Career Ready",
    description: "Uploaded your CV",
    flavorText: "Ready to take on the world!",
    img: CV_uploaded,
    gradient: "from-orange-400 via-amber-400 to-orange-500",
    glowColor: "shadow-orange-500/50",
    textColor: "text-orange-600 dark:text-orange-400",
  },
};

function Badge({
  type,
  showLabel = true,
  unlocked = true,
  unlockedDate,
  className,
}) {
  const config = BADGE_CONFIG[type];

  const badgeContent = (
    <div className={cn("group flex flex-col items-center gap-3", className)}>
      <div className="relative">
        <div
          className={cn(
            "flex items-center justify-center rounded-full border-2 border-white transition-all duration-300",
            unlocked
              ? `bg-linear-to-br ${config.gradient} shadow-lg ${config.glowColor} group-hover:scale-110 group-hover:shadow-xl overflow-hidden`
              : "bg-gray-200 opacity-40 grayscale dark:bg-gray-800"
          )}
        >
          <img
          src={config.img}
            className={cn(
              unlocked ? "text-white drop-shadow-lg" : "text-gray-400"
            )}
          />
        </div>
        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-gray-900/80 overflow-hidden">
            <img src={no_badge} />
            </div>
          </div>
        )}
      </div>
      {showLabel && (
        <div className="text-center">
          <div className="mb-1 flex items-center justify-center gap-1">
            <span
              className={cn(
                "text-xs font-bold uppercase tracking-wider",
              )}
            >
            </span>
          </div>
          <p
            className={cn(
              "text-sm font-bold",
              unlocked ? "text-foreground" : "text-muted-foreground"
            )}
          >
            {config.title}
          </p>
          <p className="text-xs text-muted-foreground">{config.description}</p>
          {unlocked && (
            <p className="mt-1 text-xs italic text-muted-foreground">
              {config.flavorText}
            </p>
          )}
          {unlocked && unlockedDate && (
            <p className="mt-1 text-xs text-muted-foreground">
              Unlocked {unlockedDate.toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (!showLabel) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {badgeContent}
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="text-center space-y-1">
            <div>
              <span className={cn("text-xs font-bold uppercase tracking-wider")}>
              </span>
            </div>
            <p className="text-sm font-bold">{config.title}</p>
            <p className="text-xs">{config.description}</p>
            {unlocked && <p className="text-xs italic">{config.flavorText}</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  }

  return badgeContent;
}

export function UserBadge({ user }) {
  const [badges, setBadges] = useState([]);
  const {userSlug} = useParams();

  useEffect(() => {
    async function fetchBadge() {
      try {
        const data = await getUserBadge(userSlug);
        setBadges(data.badges);
      } catch (err) {
        console.error("Failed to fetch badges:", err);
      }
    }

    fetchBadge();
  }, [userSlug, user]);

  const allBadges = [
    "50_views",
    "100_views",
    "10_emails",
    "5_projects",
    "cv_uploaded",
  ];

  if (badges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center ">
        <p className="text-sm text-muted-foreground">No badges earned yet</p>
        <p className="text-xs text-muted-foreground">
          Complete achievements to unlock badges!
        </p>
      </div>
    );
  }

  return (
    <div className="w-[460px] flex flex-col gap-4 border-t border-gray-300 pt-5 text-[oklch(0.556_0_0)] text-sm items-start">
      <p>Achievements:</p>
      <div className="flex flex-row gap-2">
      {allBadges.map((badgeType) => (
        <Badge 
          key={badgeType}
          type={badgeType}
          size="sm"
          showLabel={false}
          unlocked={badges.includes(badgeType)}
          unlockedDate={badges.includes(badgeType) ? new Date() : undefined}
        />
      ))}
    </div>
    </div>
  );
}
