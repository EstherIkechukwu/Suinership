import { cn } from "@/lib/utils"
import { CheckCircle, Clock, AlertTriangle, XCircle } from "lucide-react"

export type StatusType = "verified" | "pending" | "unverified" | "fraud-alert"

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

const statusConfig = {
  verified: {
    label: "Verified",
    icon: CheckCircle,
    className: "bg-accent text-accent-foreground",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-warning text-warning-foreground",
  },
  unverified: {
    label: "Unverified",
    icon: AlertTriangle,
    className: "bg-muted text-muted-foreground",
  },
  "fraud-alert": {
    label: "Fraud Alert",
    icon: XCircle,
    className: "bg-destructive text-destructive-foreground",
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
        config.className,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </div>
  )
}
