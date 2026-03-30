"use client";

import { useState } from "react";
import Link from "next/link";
import { WorkspacePackage, PaymentMethod, AvailStatus, UploadStatus } from "./types";
import { formatDate } from "./constants";
import StepIndicator from "./StepIndicator";
import PackageSelector from "./PackageSelector";
import SlotSelector from "./SlotSelector";
import PaymentStep from "./PaymentStep";
import UploadStep from "./UploadStep";
import ConfirmationStep from "./ConfirmationStep";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<WorkspacePackage | null>(null);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [availStatus, setAvailStatus] = useState<AvailStatus>("idle");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("telebirr");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");

  const handlePackageSelect = (pkg: WorkspacePackage) => {
    setSelectedPackage(pkg);
    setSelectedDates([]);
    setSelectedHours([]);
    setAvailStatus("idle");
    setStep(2);
  };

  const handleToggleDate = (d: string) =>
    setSelectedDates((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);

  const handleMonthlySelect = (start: Date) => {
    const dates = Array.from({ length: 30 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return formatDate(d);
    });
    setSelectedDates(dates);
  };

  const handleToggleHour = (h: string) =>
    setSelectedHours((prev) => prev.includes(h) ? prev.filter((x) => x !== h) : [...prev, h]);

  // Inline availability check — stays on step 2, just updates availStatus
  const handleCheckAvailability = () => {
    setAvailStatus("checking");
    setTimeout(() => setAvailStatus("available"), 1800); // mock
  };

  // Upload → auto-submit → go to confirmation
  const handleUpload = () => {
    if (!uploadedFile) return;
    setUploadStatus("uploading");
    setTimeout(() => {
      setUploadStatus("done");
      setTimeout(() => setStep(5), 800); // brief "Submitted!" flash then move on
    }, 2000);
  };

  const calculateTotal = () => {
    if (!selectedPackage) return "0 Br";
    if (selectedPackage.id === "meeting-room") return `${selectedHours.length * selectedPackage.priceNum * 26} Br`;
    if (selectedPackage.id === "hot-desk") return `${selectedDates.length * selectedPackage.priceNum * 26} Br`;
    return selectedPackage.price;
  };

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      {/* Decorative blobs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative">
        {/* Brand header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block font-bold text-2xl tracking-tighter text-foreground">
            Ambar<span className="text-accent">Workspace</span>
          </Link>
          <h1 className="text-3xl font-extrabold text-foreground mt-1">Book Your Space</h1>
          <p className="text-secondary mt-1 text-sm">Secure your workspace in a few simple steps</p>
        </div>

        <StepIndicator current={step} />

        {/* Step 1 — Package Selection */}
        {step === 1 && (
          <PackageSelector onSelect={handlePackageSelect} />
        )}

        {/* Step 2 — Slot Selection (with inline availability check) */}
        {step === 2 && selectedPackage && (
          <SlotSelector
            pkg={selectedPackage}
            selectedDates={selectedDates}
            selectedHours={selectedHours}
            onToggleDate={handleToggleDate}
            onMonthlySelect={handleMonthlySelect}
            onToggleHour={handleToggleHour}
            availStatus={availStatus}
            onCheck={handleCheckAvailability}
            onBack={() => { setStep(1); setAvailStatus("idle"); }}
            onNext={() => setStep(3)}
          />
        )}

        {/* Step 3 — Payment */}
        {step === 3 && selectedPackage && (
          <PaymentStep
            pkg={selectedPackage}
            selectedDates={selectedDates}
            selectedHours={selectedHours}
            total={calculateTotal()}
            paymentMethod={paymentMethod}
            onMethodChange={setPaymentMethod}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        )}

        {/* Step 4 — Upload (auto-submits on success) */}
        {step === 4 && (
          <UploadStep
            file={uploadedFile}
            uploadStatus={uploadStatus}
            onFileChange={(f) => { setUploadedFile(f); setUploadStatus("idle"); }}
            onUpload={handleUpload}
            onBack={() => setStep(3)}
          />
        )}

        {/* Step 5 — Confirmation */}
        {step === 5 && selectedPackage && (
          <ConfirmationStep pkg={selectedPackage} total={calculateTotal()} />
        )}
      </div>
    </main>
  );
}
