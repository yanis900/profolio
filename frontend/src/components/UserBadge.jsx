import { useEffect, useState } from "react";
import { Badge } from "./ui/Badge";
import { Award, Flame, TreePalm, Shrimp } from "lucide-react";
import { getUserBadge } from "../services/user";

export function UserBadge({ token }) {
  const [badges, setBadge] = useState([]);

  const badgeIcons = {
    "100_views": <Award className="w-4 h-4 mr-1" />,
    "200_views": <Flame className="w-4 h-4 mr-1" />,
    "5_projects": <TreePalm className="w-4 h-4 mr-1" />,
    "cv_uploaded": <Shrimp className="w-4 h-4 mr-1" />,
  };

  useEffect(() => {
    async function fetchBadge() {
      try {
        const data = await getUserBadge(token);
        setBadge(data.badges);
      } catch (err) {
        console.error("Failed to fetch badges:", err);
      }
    }

    if (token) fetchBadge();
  }, [token]);

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <Badge key={badge} variant="default">
          {badgeIcons[badge] || null} {badge.replace("_", " ")}
        </Badge>
      ))}
    </div>
  );
}