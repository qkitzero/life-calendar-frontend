type CellProps = {
  isLived: boolean;
  isCurrent: boolean;
};

export default function Cell({ isLived, isCurrent }: CellProps) {
  const cellColor = isLived
    ? "bg-gray-800"
    : isCurrent
    ? "bg-green-500 animate-bounce"
    : "bg-gray-300";

  return <div className={`w-[10px] h-[10px] transition ${cellColor}`} />;
}
