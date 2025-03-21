import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { UserProfile } from "@/contexts/user-context"

interface UserAvatarProps {
  user: UserProfile | null
  className?: string
  size?: "sm" | "md" | "lg"
}

export function UserAvatar({ user, className = "", size = "md" }: UserAvatarProps) {
  if (!user) {
    return null
  }

  // Get initials from name
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)

  // Determine size class
  const sizeClass = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  }[size]

  return (
    <Avatar className={`${sizeClass} ${className}`}>
      {user.avatar ? (
        <AvatarImage src={user.avatar} alt={user.name} />
      ) : (
        <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
      )}
    </Avatar>
  )
}

