type Event = {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  color: string;
};

type WeekCellProps = {
  isLived: boolean;
  isCurrent: boolean;
  events: Event[];
  weekStartDate: Date;
  weekEndDate: Date;
};

export default function WeekCell({
  isLived,
  isCurrent,
  events,
  weekStartDate,
  weekEndDate,
}: WeekCellProps) {
  let color = "bg-gray-300";
  if (events.length > 0) {
    color = events[0].color;
  } else if (isCurrent) {
    color = "bg-gray-800 animate-bounce";
  } else if (isLived) {
    color = "bg-gray-800";
  }

  let tooltipText = `Week: ${weekStartDate.toLocaleDateString()} ~ ${weekEndDate.toLocaleDateString()}`;
  if (events.length > 0) {
    const eventTitles = events.map((e) => e.title).join(", ");
    tooltipText += `\nEvents: ${eventTitles}`;
  }

  return (
    <div
      className={`w-[10px] h-[10px] transition ${color}`}
      title={tooltipText}
    />
  );
}
