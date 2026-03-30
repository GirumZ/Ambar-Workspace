"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Calendar, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { WorkspacePackage } from "./types";
import { DAYS_SHORT, MONTHS_LONG, MEETING_HOURS, formatDate } from "./constants";
import { gregToEthiopian, getEthiopianHeader, gregTimeToEthiopian } from "@/lib/ethiopianCalendar";
import { AvailStatus } from "./types";

const TODAY = new Date(2026, 2, 28); // March 28, 2026

function DualCalendar({
  mode, selectedDates, onToggleDate, onMonthlySelect,
}: {
  mode: "multi" | "monthly";
  selectedDates: string[];
  onToggleDate: (d: string) => void;
  onMonthlySelect: (start: Date) => void;
}) {
  const [view, setView] = useState(new Date(2026, 2, 1));
  const year = view.getFullYear(), month = view.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const etHeader = getEthiopianHeader(year, month);

  const windowDates = (): string[] => {
    if (mode !== "monthly" || !selectedDates[0]) return [];
    const start = new Date(selectedDates[0]);
    return Array.from({ length: 30 }, (_, i) => {
      const d = new Date(start); d.setDate(d.getDate() + i); return formatDate(d);
    });
  };
  const window30 = windowDates();

  const handleClick = (day: number) => {
    const date = new Date(year, month, day);
    if (date < TODAY && formatDate(date) !== formatDate(TODAY)) return;
    if (mode === "monthly") onMonthlySelect(date);
    else onToggleDate(formatDate(date));
  };

  return (
    <div className="bg-background border border-secondary/20 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setView(new Date(year, month - 1, 1))} className="p-2 rounded-full hover:bg-accent/10 text-secondary hover:text-primary transition-colors">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-center">
          <p className="font-bold text-foreground">{MONTHS_LONG[month]} {year}</p>
          <p className="text-xs text-accent font-medium">{etHeader}</p>
        </div>
        <button onClick={() => setView(new Date(year, month + 1, 1))} className="p-2 rounded-full hover:bg-accent/10 text-secondary hover:text-primary transition-colors">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS_SHORT.map((d) => <div key={d} className="text-center text-xs font-semibold text-secondary py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: firstDay }, (_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const date = new Date(year, month, day);
          const ds = formatDate(date);
          const isPast = date < TODAY && ds !== formatDate(TODAY);
          const isSelected = selectedDates[0] === ds || selectedDates.includes(ds);
          const inWindow = window30.includes(ds);
          const isWindowStart = window30[0] === ds;
          const et = gregToEthiopian(date);
          const etBase = gregToEthiopian(new Date(year, month, 1));
          const showMonth = et.etMonth !== etBase.etMonth;
          return (
            <button key={day} onClick={() => !isPast && handleClick(day)} disabled={isPast}
              className={`flex flex-col items-center justify-center rounded-xl py-1.5 min-h-[44px] transition-all text-sm
                ${isPast ? "opacity-25 cursor-not-allowed"
                  : isSelected || isWindowStart ? "bg-primary text-background font-bold"
                    : inWindow ? "bg-accent/20 text-foreground"
                      : "hover:bg-accent/10 active:bg-accent/20 text-foreground"}`}>
              <span className="font-semibold text-sm leading-none">{day}</span>
              <span className={`text-[9px] leading-none mt-0.5 ${isSelected || isWindowStart ? "text-background/70" : "text-secondary"}`}>
                {et.etDay}{showMonth ? ` ${et.etMonthName.slice(0, 3)}` : ""}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-secondary mt-3 pt-3 border-t border-secondary/10">
        Each cell shows <span className="text-foreground font-medium">Gregorian</span> (large) and <span className="text-accent font-medium">Ethiopian</span> (small) date
      </p>
    </div>
  );
}

function HourPicker({
  selectedHours, onToggle, useEt, onToggleFormat,
}: {
  selectedHours: string[]; onToggle: (h: string) => void; useEt: boolean; onToggleFormat: () => void;
}) {
  return (
    <div className="bg-background border border-secondary/20 rounded-2xl p-5 shadow-sm mt-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-foreground text-sm">Select Time Slots</h4>
        <button onClick={onToggleFormat} className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-all
          ${useEt ? "bg-primary text-background border-primary" : "border-secondary/30 text-secondary hover:border-accent"}`}>
          {useEt ? "🕐 Ethiopian" : "🕐 Gregorian"}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {MEETING_HOURS.map((h) => {
          const key = `${h}:00`;
          const active = selectedHours.includes(key);
          const greg = `${h > 12 ? h - 12 : h === 0 ? 12 : h}:00 ${h < 12 ? "AM" : "PM"}`;
          const et = gregTimeToEthiopian(h, 0);
          return (
            <button key={h} onClick={() => onToggle(key)}
              className={`flex flex-col items-center py-2.5 rounded-xl border transition-all
                ${active ? "bg-primary border-primary text-background" : "border-secondary/20 hover:border-accent/50 hover:bg-accent/5 text-foreground"}`}>
              <span className="font-semibold text-xs">{useEt ? et : greg}</span>
              <span className={`text-[10px] mt-0.5 ${active ? "text-background/60" : "text-secondary"}`}>{useEt ? greg : et}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SlotSelector({
  pkg, selectedDates, selectedHours, onToggleDate, onMonthlySelect, onToggleHour, onBack, onNext,
  availStatus, onCheck,
}: {
  pkg: WorkspacePackage;
  selectedDates: string[];
  selectedHours: string[];
  onToggleDate: (d: string) => void;
  onMonthlySelect: (start: Date) => void;
  onToggleHour: (h: string) => void;
  onBack: () => void;
  onNext: () => void;
  availStatus: AvailStatus;
  onCheck: () => void;
}) {
  const [useEt, setUseEt] = useState(false);
  const isMonthly = pkg.id === "designated-desk" || pkg.id === "private-office";
  const isMeeting = pkg.id === "meeting-room";
  const hasSlots = isMeeting ? selectedHours.length > 0 : selectedDates.length > 0;

  const total = () => {
    if (isMeeting) return `${selectedHours.length * pkg.priceNum} Br`;
    if (pkg.id === "hot-desk") return `${selectedDates.length * pkg.priceNum} Br`;
    return pkg.price;
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-accent/10 text-secondary hover:text-primary transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-foreground">{pkg.name}</h2>
          <p className="text-secondary text-sm">
            {pkg.id === "hot-desk" && "Select one or more days"}
            {isMonthly && "Select a start date — 30 days locked automatically"}
            {isMeeting && "Select a date, then pick time slots"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
        <div className="md:col-span-3">
          <DualCalendar
            mode={isMonthly ? "monthly" : "multi"}
            selectedDates={isMeeting ? selectedDates.slice(0, 1) : selectedDates}
            onToggleDate={onToggleDate}
            onMonthlySelect={onMonthlySelect}
          />
          {isMeeting && selectedDates.length > 0 && (
            <HourPicker selectedHours={selectedHours} onToggle={onToggleHour} useEt={useEt} onToggleFormat={() => setUseEt(!useEt)} />
          )}
        </div>
        <div className="md:col-span-2">
          <div className="bg-accent/5 border border-accent/20 rounded-2xl p-4 sm:p-5 md:sticky md:top-4">
            <h4 className="font-bold text-foreground mb-3">Selection Summary</h4>
            {isMeeting ? (
              <>
                <p className="text-xs text-secondary mb-1">Date</p>
                <p className="text-sm font-medium text-foreground mb-3">{selectedDates[0] || "—"}</p>
                <p className="text-xs text-secondary mb-1">Hours ({selectedHours.length})</p>
                <div className="flex flex-wrap gap-1 mb-3 min-h-[24px]">
                  {selectedHours.sort().map((h) => (
                    <span key={h} className="bg-primary text-background text-xs px-2 py-0.5 rounded-full">{h}</span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-xs text-secondary mb-1">{isMonthly ? "Period (30 days from)" : `Days (${selectedDates.length})`}</p>
                <div className="flex flex-wrap gap-1 mb-3 min-h-[24px]">
                  {(isMonthly ? selectedDates.slice(0, 1) : selectedDates).map((d) => (
                    <span key={d} className="bg-primary text-background text-xs px-2 py-0.5 rounded-full">{d}</span>
                  ))}
                  {isMonthly && selectedDates.length > 1 && (
                    <span className="bg-secondary/20 text-secondary text-xs px-2 py-0.5 rounded-full">+29 days locked</span>
                  )}
                </div>
              </>
            )}
            <div className="border-t border-accent/20 pt-3 flex justify-between items-center mb-4">
              <span className="text-sm text-secondary">Estimated Total</span>
              <span className="text-xl font-extrabold text-primary">{total()}</span>
            </div>

            {/* Inline availability feedback */}
            {availStatus === "conflict" && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3 mb-3">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-700"><strong>Conflict:</strong> 2026-03-30 is fully booked. Adjust your selection.</p>
              </div>
            )}
            {availStatus === "available" && (
              <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl p-3 mb-3">
                <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-green-700">All slots are available!</p>
              </div>
            )}

            {availStatus === "available" ? (
              <button onClick={onNext}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-foreground text-background font-semibold py-3 rounded-xl transition-all">
                Proceed to Payment <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={onCheck} disabled={!hasSlots || availStatus === "checking"}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-foreground text-background font-semibold py-3 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                {availStatus === "checking" ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Checking…</>
                ) : (
                  <><Calendar className="h-4 w-4" /> Check Availability</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
