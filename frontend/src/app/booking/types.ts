import { ElementType } from "react";

export type PackageId = "hot-desk" | "designated-desk" | "private-office" | "meeting-room";
export type PaymentMethod = "telebirr" | "cbe" | "awash" | "dashen";
export type AvailStatus = "idle" | "checking" | "available" | "conflict";
export type UploadStatus = "idle" | "uploading" | "done";

export interface WorkspacePackage {
  id: PackageId;
  name: string;
  price: string;
  priceNum: number;
  unit: string;
  description: string;
  icon: ElementType;
  availCount: number;
  availStatus: "green" | "yellow" | "red";
}

export interface BookingState {
  selectedPackage: WorkspacePackage | null;
  selectedDates: string[];
  selectedHours: string[];
  availStatus: AvailStatus;
  paymentMethod: PaymentMethod;
  uploadedFile: File | null;
  uploadStatus: UploadStatus;
}
