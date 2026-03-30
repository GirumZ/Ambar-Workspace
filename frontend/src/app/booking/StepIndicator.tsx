"use client";
import { Check } from "lucide-react";

const STEP_LABELS = ["Package", "Slots", "Payment", "Upload", "Done"];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEP_LABELS.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all
                ${done ? "bg-primary text-background" : active ? "bg-accent text-foreground ring-4 ring-accent/20" : "bg-secondary/20 text-secondary"}`}>
                {done ? <Check className="w-3.5 h-3.5" /> : step}
              </div>
              <span className={`text-[10px] sm:text-xs mt-1 ${active ? "text-foreground font-medium" : "text-secondary hidden sm:block"}`}>
                {label}
              </span>
            </div>
            {step < 5 && (
            <div className={`w-6 sm:w-14 h-0.5 mb-4 mx-0.5 sm:mx-1 transition-all ${done ? "bg-primary" : "bg-secondary/20"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
