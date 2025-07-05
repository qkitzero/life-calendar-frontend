import { useUser } from "@/context/UserContext";

export default function User() {
  const user = useUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center">
        <span className="text-gray-700">Guest User</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-700">{user.displayName}</span>
      <span className="text-gray-500 text-xs">{user.userId}</span>
    </div>
  );
}
