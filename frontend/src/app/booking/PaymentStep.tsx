"use client";
import { useEffect, useState } from "react";
import { Lock, ChevronLeft } from "lucide-react";
import { WorkspacePackage, PaymentMethod } from "./types";
import { PAYMENT_METHODS } from "./constants";

function CountdownTimer({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setRemaining((p) => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const pct = (remaining / seconds) * 100;
  const urgent = remaining < 120;
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="2.5" stroke="currentColor" className="text-secondary/20" />
          <circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="2.5" stroke="currentColor"
            strokeDasharray={`${pct} 100`} className={urgent ? "text-red-500" : "text-accent"} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Lock className="w-3.5 h-3.5 text-primary" />
        </div>
      </div>
      <div>
        <p className="text-xs text-secondary">Locked for</p>
        <p className={`text-2xl font-mono font-bold ${urgent ? "text-red-500" : "text-foreground"}`}>
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}

export default function PaymentStep({
  pkg, selectedDates, selectedHours, total, paymentMethod, onMethodChange, onBack, onNext,
}: {
  pkg: WorkspacePackage;
  selectedDates: string[];
  selectedHours: string[];
  total: string;
  paymentMethod: PaymentMethod;
  onMethodChange: (m: PaymentMethod) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const info = PAYMENT_METHODS.find((m) => m.id === paymentMethod)!;
  const slotCount = pkg.id === "meeting-room" ? selectedHours.length : selectedDates.length;
  const slotUnit = pkg.id === "meeting-room" ? "hour(s)" : "day(s)";

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-accent/10 text-secondary hover:text-primary transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold text-foreground">Payment</h2>
      </div>

      {/* Lock timer */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="font-semibold text-foreground text-sm">Your slots are locked</p>
          <p className="text-secondary text-xs mt-0.5">Upload payment proof before the timer expires</p>
        </div>
        <CountdownTimer seconds={900} />
      </div>

      {/* Order summary */}
      <div className="bg-background border border-secondary/20 rounded-2xl p-5 mb-5">
        <h4 className="font-semibold text-foreground mb-3">Order Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary">Package</span>
            <span className="text-foreground">{pkg.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Slots</span>
            <span className="text-foreground">{slotCount} {slotUnit}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Rate</span>
            <span className="text-foreground">{pkg.price} {pkg.unit}</span>
          </div>
          <div className="flex justify-between border-t border-secondary/10 pt-2 font-bold">
            <span className="text-foreground">Total Due</span>
            <span className="text-primary text-lg">{total}</span>
          </div>
        </div>
      </div>

      {/* Payment method tabs */}
      <div className="bg-background border border-secondary/20 rounded-2xl p-5 mb-5">
        <h4 className="font-semibold text-foreground mb-3">Payment Method</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {PAYMENT_METHODS.map((m) => (
            <button key={m.id} onClick={() => onMethodChange(m.id)}
              className={`py-2 rounded-xl text-sm font-semibold border transition-all
                ${paymentMethod === m.id ? "bg-primary text-background border-primary" : "border-secondary/20 text-secondary hover:border-accent/50"}`}>
              {m.name}
            </button>
          ))}
        </div>
        <div className="bg-accent/5 rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary">Account Name</span>
            <span className="font-medium text-foreground text-right break-words">{info.holder}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Account Number</span>
            <span className="font-mono font-bold text-primary break-all">{info.account}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Amount</span>
            <span className="font-bold text-foreground">{total}</span>
          </div>
          <p className="text-xs text-secondary pt-1 border-t border-secondary/10">
            Transfer the exact amount and keep your receipt. You'll upload a screenshot in the next step.
          </p>
        </div>
      </div>

      <button onClick={onNext}
        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-foreground text-background font-semibold py-4 rounded-xl transition-all shadow-md">
        I've Transferred the Amount →
      </button>
    </div>
  );
}
