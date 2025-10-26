export function GithubContributions(props) {
  if (!props.contributions?.weeks) return null;


  const days = props.contributions.weeks.flatMap((week) => week.contributionDays);

  const getLevelClass = (count) => {
    if (count > 6) return "bg-[#216e39] border-[#1a562e]";
    if (count > 3) return "bg-[#30a14e] border-[#267e3e]";
    if (count > 1) return "bg-[#40c463] border-[#33a351]";
    if (count > 0) return "bg-[#9be9a8] border-[#7cc886]";
    return "bg-[#ebedf0] border-[#bcc0c4]";
  };

  return (
    <div
      className="
        grid p-2 gap-[2px] bg-white
        [grid-template-columns:repeat(auto-fill,10px)]
        [grid-template-rows:repeat(7,10px)]
      "
    >
      {days.map((day, index) => {
        const gridRowStart = day.weekday + 1;
        const gridColumnStart = Math.floor(index / 7) + 1;

        return (
          <div
            key={day.date}
            title={`${day.date}: ${day.contributionCount} contributions`}
            className={`
              w-[10px] h-[10px] border rounded-[2px]
              transition-transform duration-200
              hover:scale-200
              ${getLevelClass(day.contributionCount)}
            `}
            style={{
              gridRowStart,
              gridColumnStart,
            }}
          />
        );
      })}
    </div>
  );
}
