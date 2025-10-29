import { useEffect, useRef } from "react";
import { Card } from "./ui/card";

export function GithubContributions({ contributions }) {
  const scrollRef = useRef(null);

  // Auto-scroll to end on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      // small delay to ensure the grid renders
      setTimeout(() => {
        el.scrollLeft = el.scrollWidth;
      }, 50);
    }
  }, [contributions]);

  if (!contributions?.weeks) return null;

  // Flatten all days for the whole year
  const allDays = contributions.weeks.flatMap((week) => week.contributionDays);

  const getLevelClass = (count) => {
    if (count > 6) return "bg-[#216e39] border-[#1a562e]";
    if (count > 3) return "bg-[#30a14e] border-[#267e3e]";
    if (count > 1) return "bg-[#40c463] border-[#33a351]";
    if (count > 0) return "bg-[#9be9a8] border-[#7cc886]";
    return "bg-[#ebedf0] border-[#bcc0c4]";
  };

  return (
    <div
      ref={scrollRef}
      className="
        w-full max-w-sm overflow-x-auto overflow-y-hidden
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
      "
      style={{ scrollBehavior: "smooth" }}
    >
      <Card
        className="
          inline-grid p-3 gap-0.5
          grid-rows-[repeat(7,10px)]
          grid-flow-col
        "
      >
        {allDays.map((day) => {
          const gridRowStart = day.weekday + 1;

          return (
            <div
              key={day.date}
              title={`${day.date}: ${day.contributionCount} contributions`}
              className={`
                w-2.5 h-2.5 border rounded-[2px]
                transition-transform duration-200
                hover:scale-200
                ${getLevelClass(day.contributionCount)}
              `}
              style={{ gridRowStart }}
            />
          );
        })}
      </Card>
    </div>
  );
}
