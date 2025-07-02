import Header from "@/components/Header";
import Calendar from "@/features/Calendar";

export default function Home() {
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <div className="text-center text-2xl font-bold mb-8">Life Calendar</div>
      <Calendar />
    </div>
  );
}
