import { useUser } from '@/context/UserContext';

export default function User() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center">
        <span className="text-slate-200">Guest User</span>
        <span className="text-slate-500 text-xs">xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-slate-200">{user.displayName}</span>
      <span className="text-slate-500 text-xs">{user.userId}</span>
    </div>
  );
}
