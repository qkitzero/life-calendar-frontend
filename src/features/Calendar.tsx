export default function Calendar() {
  const years = 80;
  const weeks = Array.from({ length: years * 52 });

  return (
    <div className="grid grid-cols-52 gap-1">
      {weeks.map((value, index) => (
        <div
          key={index}
          className="w-4 h-4 rounded-sm bg-gray-300 hover:bg-black transition"
        />
      ))}
    </div>
  );
}
