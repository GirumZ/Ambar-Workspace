import { Armchair, Monitor, Building2, Users } from "lucide-react";
import { WorkspacePackage, PaymentMethod } from "./types";

export const PACKAGES: WorkspacePackage[] = [
  {
    id: "hot-desk",
    name: "Hot Desk",
    price: "400 Br",
    priceNum: 400,
    unit: "/ day",
    description: "Flexible daily access to our open workspace.",
    icon: Armchair,
    availCount: 8,
    availStatus: "green",
  },
  {
    id: "designated-desk",
    name: "Designated Desk",
    price: "8,000 Br",
    priceNum: 8000,
    unit: "/ month",
    description: "Your own permanent desk with 24/7 access.",
    icon: Monitor,
    availCount: 2,
    availStatus: "yellow",
  },
  {
    id: "private-office",
    name: "Private Office",
    price: "18,630 Br",
    priceNum: 18630,
    unit: "/ month",
    description: "A fully furnished private office for your team.",
    icon: Building2,
    availCount: 0,
    availStatus: "red",
  },
  {
    id: "meeting-room",
    name: "Meeting Room",
    price: "400 Br",
    priceNum: 400,
    unit: "/ hour",
    description: "Professional meeting space for clients and teams.",
    icon: Users,
    availCount: 4,
    availStatus: "green",
  },
];

export const PAYMENT_METHODS: { id: PaymentMethod; name: string; account: string; holder: string }[] = [
  { id: "telebirr", name: "Telebirr", account: "0911 234 567", holder: "Ambar Workspace PLC" },
  { id: "cbe", name: "CBE", account: "1000 4823 5671 234", holder: "Ambar Workspace PLC" },
  { id: "awash", name: "Awash Bank", account: "0123 4567 89", holder: "Ambar Workspace PLC" },
  { id: "dashen", name: "Dashen Bank", account: "9876 5432 10", holder: "Ambar Workspace PLC" },
];

export const MEETING_HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
export const DAYS_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
export const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}
