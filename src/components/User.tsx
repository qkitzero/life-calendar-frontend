import { useUser } from '@/context/UserContext';

export default function User() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center">
        <span className="text-secondary">Guest User</span>
        <span className="text-muted text-xs">xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-secondary">{user.displayName}</span>
      <span className="text-muted text-xs">{user.userId}</span>
    </div>
  );
}
