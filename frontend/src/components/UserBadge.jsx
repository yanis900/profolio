import { useEffect, useState } from "react";
import { Mail, Trophy, Sparkles, Star, Zap, Award, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { getUserBadge } from "../services/user";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { useParams } from "react-router-dom";

export const BADGE_CONFIG = {
  "100_views": {
    id: "100_views",
    title: "Rising Star",
    description: "Reached 100 total views",
    flavorText: "Your content is starting to shine!",
    icon: Star,
    rarity: "rare",
    gradient: "from-blue-400 via-cyan-400 to-blue-500",
    glowColor: "shadow-blue-500/50",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  "200_views": {
    id: "200_views",
    title: "Viral Sensation",
    description: "Reached 200 total views",
    flavorText: "You're on fire! Keep it up!",
    icon: Zap,
    rarity: "legendary",
    gradient: "from-purple-400 via-pink-400 to-purple-500",
    glowColor: "shadow-purple-500/50",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  "10_emails": {
    id: "10_emails",
    title: "Communication Master",
    description: "Received 10 emails",
    flavorText: "Connecting people, one email at a time",
    icon: Mail,
    rarity: "epic",
    gradient: "from-green-400 via-emerald-400 to-green-500",
    glowColor: "shadow-green-500/50",
    textColor: "text-green-600 dark:text-green-400",
  },
  "5_projects": {
    id: "5_projects",
    title: "Project Pioneer",
    description: "Created 5 projects",
    flavorText: "Building the future, one project at a time",
    icon: Award,
    rarity: "rare",
    gradient: "from-orange-400 via-amber-400 to-orange-500",
    glowColor: "shadow-orange-500/50",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  cv_uploaded: {
    id: "cv_uploaded",
    title: "Career Ready",
    description: "Uploaded your CV",
    flavorText: "Ready to take on the world!",
    icon: Crown,
    rarity: "common",
    gradient: "from-yellow-400 via-amber-400 to-yellow-500",
    glowColor: "shadow-yellow-500/50",
    textColor: "text-yellow-600 dark:text-yellow-400",
  },
};

const RARITY_CONFIG = {
  common: {
    label: "Common",
    color: "text-gray-600 dark:text-gray-400",
    borderColor: "border-gray-300 dark:border-gray-700",
  },
  rare: {
    label: "Rare",
    color: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-400 dark:border-blue-600",
  },
  epic: {
    label: "Epic",
    color: "text-purple-600 dark:text-purple-400",
    borderColor: "border-purple-400 dark:border-purple-600",
  },
  legendary: {
    label: "Legendary",
    color: "text-yellow-600 dark:text-yellow-400",
    borderColor: "border-yellow-400 dark:border-yellow-600",
  },
};

function Badge({
  type,
  size = "md",
  showLabel = true,
  unlocked = true,
  unlockedDate,
  className,
}) {
  const config = BADGE_CONFIG[type];
  const rarityConfig = RARITY_CONFIG[config.rarity];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-20 w-20",
    lg: "h-28 w-28",
  };

  const iconSizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  const badgeContent = (
    <div className={cn("group flex flex-col items-center gap-3", className)}>
      <div className="relative">
        <div
          className={cn(
            "flex items-center justify-center rounded-full border-4 transition-all duration-300",
            sizeClasses[size],
            rarityConfig.borderColor,
            unlocked
              ? `bg-linear-to-br ${config.gradient} shadow-lg ${config.glowColor} group-hover:scale-110 group-hover:shadow-xl`
              : "bg-gray-200 opacity-40 grayscale dark:bg-gray-800"
          )}
        >
          <Icon
            className={cn(
              iconSizeClasses[size],
              unlocked ? "text-white drop-shadow-lg" : "text-gray-400"
            )}
          />
        </div>
        {unlocked && (
          <div className="absolute -right-1 -top-1 animate-pulse">
            <Sparkles className="h-5 w-5 text-yellow-400 drop-shadow-lg" />
          </div>
        )}
        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-gray-900/80 p-2">
              <Trophy className="h-6 w-6 text-gray-400" />
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
                rarityConfig.color
              )}
            >
              {rarityConfig.label}
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
              <span className={cn("text-xs font-bold uppercase tracking-wider", rarityConfig.color)}>
                {rarityConfig.label}
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
    "100_views",
    "200_views",
    "10_emails",
    "5_projects",
    "cv_uploaded",
  ];

  if (badges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center ">
        <Trophy className="h-8 w-8 text-muted-foreground" />
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
