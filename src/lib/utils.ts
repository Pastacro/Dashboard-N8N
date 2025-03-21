import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
}

export function formatRelativeTime(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'text-green-500';
    case 'inactive':
      return 'text-gray-500';
    case 'error':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
}
