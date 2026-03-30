"use client";
import { Calendar, CheckCircle2, AlertTriangle, Loader2, CreditCard, ChevronLeft } from "lucide-react";
import { WorkspacePackage, AvailStatus } from "./types";

export default function AvailabilityStep({
  pkg, selectedDates, selectedHours, status, total,
  onCheck, onBack, onNext, onAdjust,
}: {
  pkg: WorkspacePackage;
  selectedDates: string[];
  selectedHours: string[];
  status: AvailStatus;
  total: string;
  onCheck: () => void;
  onBack: () => void;
  onNext: () => void;
  onAdjust: () => void;
}) {
  const slotLabel = pkg.id === "meeting-room"
    ? `${selectedHours.length} hour slot(s)`
    : `${selectedDates.length} day(s)`;

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-accent/10 text-secondary hover:text-primary transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold text-foreground">Availability Check</h2>
      </div>

      <div className="bg-background border border-secondary/20 rounded-2xl p-5 mb-5">
        <h4 className="font-semibold text-foreground mb-3">Your Selection</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary">Package</span>
            <span className="font-medium text-foreground">{pkg.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Slots</span>
            <span className="font-medium text-foreground">{slotLabel}</span>
          </div>
          {pkg.id === "meeting-room" && (
            <div className="flex justify-between">
              <span className="text-secondary">Date</span>
              <span className="font-medium text-foreground">{selectedDates[0]}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-secondary/10 pt-2">
            <span className="text-secondary font-medium">Total</span>
            <span className="font-extrabold text-primary text-base">{total}</span>
          </div>
        </div>
      </div>

      {status === "idle" && (
        <button onClick={onCheck}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-foreground text-background font-semibold py-4 rounded-xl transition-all shadow-md text-lg">
          <Calendar className="h-5 w-5" /> Check Availability
        </button>
      )}

      {status === "checking" && (
        <div className="flex flex-col items-center py-10 gap-3">
          <Loader2 className="h-10 w-10 text-accent animate-spin" />
          <p className="text-secondary">Checking slot availability...</p>
        </div>
      )}

      {status === "available" && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
            <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">All slots are available!</p>
              <p className="text-sm text-green-700 mt-0.5">Your selected slots are free. Proceed to secure them with payment.</p>
            </div>
          </div>
          <button onClick={onNext}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-foreground text-background font-semibold py-4 rounded-xl transition-all">
            <CreditCard className="h-5 w-5" /> Proceed to Payment
          </button>
        </div>
      )}

      {status === "conflict" && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
            <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0 text-red-600" />
            <div>
              <p className="font-semibold text-red-800">Some slots are unavailable</p>
              <p className="text-sm text-red-700 mt-1">The slot on <strong>2026-03-30</strong> is already fully booked. Please adjust your selection.</p>
            </div>
          </div>
          <button onClick={onAdjust}
            className="w-full border border-secondary/30 text-foreground hover:bg-accent/5 font-semibold py-3 rounded-xl transition-all">
            Adjust Selection
          </button>
        </div>
      )}
    </div>
  );
}
