"use client";
import { WorkspacePackage } from "./types";
import { PACKAGES } from "./constants";

export default function PackageSelector({ onSelect }: { onSelect: (pkg: WorkspacePackage) => void }) {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-extrabold text-foreground">Choose a Package</h2>
        <p className="text-secondary mt-1">Select the workspace type that fits your needs</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {PACKAGES.map((pkg) => {
          const Icon = pkg.icon;
          const dotColor = { green: "bg-green-500", yellow: "bg-yellow-400", red: "bg-red-500" }[pkg.availStatus];
          return (
            <button
              key={pkg.id}
              onClick={() => onSelect(pkg)}
              className="group flex flex-col items-start bg-background border-2 border-secondary/20 hover:border-accent rounded-2xl p-4 sm:p-6 text-left transition-all hover:shadow-xl active:scale-[0.98] hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary transition-all">
                <Icon className="h-6 w-6 text-primary group-hover:text-background transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{pkg.name}</h3>
              <p className="text-secondary text-sm mt-1 mb-4 flex-1">{pkg.description}</p>
              <div className="flex items-center justify-between w-full">
                <span className="text-xl sm:text-2xl font-extrabold text-foreground">
                  {pkg.price} <span className="text-xs sm:text-sm font-normal text-secondary">{pkg.unit}</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                  <span className="text-xs text-secondary">
                    {pkg.availStatus === "red" ? "Waitlist" : `${pkg.availCount} avail.`}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
