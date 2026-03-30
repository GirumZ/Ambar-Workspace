"use client";
import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";
import { WorkspacePackage } from "./types";

export default function ConfirmationStep({ pkg, total }: { pkg: WorkspacePackage; total: string }) {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
      </div>

      <h2 className="text-2xl font-extrabold text-foreground mb-2">Booking Submitted!</h2>
      <p className="text-secondary mb-6">
        Your booking request for <span className="font-semibold text-foreground">{pkg.name}</span> has been received and is awaiting admin approval.
      </p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 mb-6 flex items-start gap-3 text-left">
        <Clock className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-semibold text-yellow-800">Waiting for Admin Approval</p>
          <p className="text-sm text-yellow-700 mt-1">
            Our team will verify your payment and approve your booking within 24 hours. A confirmation email will be sent to you.
          </p>
        </div>
      </div>

      <div className="bg-background border border-secondary/20 rounded-2xl p-5 mb-6 text-left space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-secondary">Package</span>
          <span className="font-medium text-foreground">{pkg.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary">Amount Paid</span>
          <span className="font-bold text-primary">{total}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-secondary">Status</span>
          <span className="flex items-center gap-1.5 font-semibold text-yellow-700">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Pending
          </span>
        </div>
      </div>

      <p className="text-xs text-secondary mb-4">
        ⚠ Bookings are <strong>immutable</strong> once payment proof is submitted. No modifications or cancellations are allowed at this stage.
      </p>

      <Link href="/dashboard"
        className="inline-flex items-center justify-center bg-primary hover:bg-foreground text-background font-semibold px-8 py-3.5 rounded-xl transition-all shadow-md w-full">
        Go to My Dashboard →
      </Link>
    </div>
  );
}
