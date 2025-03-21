/// <reference types="vite/client" />

declare module '@/lib/utils' {
  import { type ClassValue } from "clsx";
  export function cn(...inputs: ClassValue[]): string;
  export function formatDate(date: Date | string): string;
  export function getStatusColor(status: string): string;
  export function getStatusBorderColor(status: string): string;
}
