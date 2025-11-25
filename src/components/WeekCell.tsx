import { Event } from '@/types/event';

type WeekCellProps = {
  isLived: boolean;
  isCurrent: boolean;
  events: Event[];
  weekStartTime: Date;
  weekEndTime: Date;
};

const averageColors = (colors: string[]): string => {
  if (colors.length === 0) {
    return '';
  }

  const colorComponents = colors.map((color) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
  });

  const avgComponents = colorComponents.reduce(
    (acc, c) => {
      acc.r += c.r;
      acc.g += c.g;
      acc.b += c.b;
      return acc;
    },
    { r: 0, g: 0, b: 0 },
  );

  avgComponents.r = Math.round(avgComponents.r / colors.length);
  avgComponents.g = Math.round(avgComponents.g / colors.length);
  avgComponents.b = Math.round(avgComponents.b / colors.length);

  const toHex = (c: number) => ('0' + c.toString(16)).slice(-2);

  return `#${toHex(avgComponents.r)}${toHex(avgComponents.g)}${toHex(avgComponents.b)}`;
};

export default function WeekCell({
  isLived,
  isCurrent,
  events,
  weekStartTime,
  weekEndTime,
}: WeekCellProps) {
  let style = {};
  let className = 'w-[10px] h-[10px] transition';

  if (isCurrent) {
    className += ' border-1 border-gray-800 bg-green-500 animate-bounce';
  } else if (events.length > 0) {
    const avgColor = averageColors(events.map((e) => e.color));
    style = { backgroundColor: avgColor };
    if (isLived) {
      className += ' border-1 border-gray-800';
    }
  } else if (isLived) {
    className += ' bg-gray-800';
  } else {
    className += ' bg-gray-300';
  }

  let tooltipText = `Week: ${weekStartTime.toISOString().split('T')[0]} ~ ${
    weekEndTime.toISOString().split('T')[0]
  }`;
  if (events.length > 0) {
    const eventTitles = events.map((e) => e.title).join(', ');
    tooltipText += `\nEvents: ${eventTitles}`;
  }

  return <div className={className} style={style} title={tooltipText} />;
}
