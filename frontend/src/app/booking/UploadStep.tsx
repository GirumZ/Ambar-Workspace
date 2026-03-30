"use client";
import { useRef, useState } from "react";
import { Upload, X, CheckCircle2, Loader2, ChevronLeft } from "lucide-react";
import { UploadStatus } from "./types";

export default function UploadStep({
  uploadStatus, onFileChange, onUpload, onBack, file,
}: {
  uploadStatus: UploadStatus;
  onFileChange: (f: File | null) => void;
  onUpload: () => void;
  onBack: () => void;
  file: File | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFileChange(dropped);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-accent/10 text-secondary hover:text-primary transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-foreground">Upload Payment Proof</h2>
          <p className="text-secondary text-sm">Attach a screenshot of your transaction receipt</p>
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all mb-5
          ${dragging ? "border-accent bg-accent/10" : file ? "border-primary/40 bg-primary/5" : "border-secondary/30 hover:border-accent/60 hover:bg-accent/5"}`}
      >
        <input ref={inputRef} type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => onFileChange(e.target.files?.[0] ?? null)} />
        {file ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 text-primary" />
            </div>
            <p className="font-semibold text-foreground">{file.name}</p>
            <p className="text-xs text-secondary">{(file.size / 1024).toFixed(1)} KB</p>
            <button onClick={(e) => { e.stopPropagation(); onFileChange(null); }}
              className="mt-1 flex items-center gap-1 text-xs text-secondary hover:text-red-500 transition-colors">
              <X className="h-3 w-3" /> Remove file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center">
              <Upload className="h-7 w-7 text-secondary" />
            </div>
            <p className="font-semibold text-foreground">Drop your receipt here</p>
            <p className="text-sm text-secondary">or click to browse — JPG, PNG, PDF accepted</p>
          </div>
        )}
      </div>

      {uploadStatus === "idle" && (
        <button onClick={onUpload} disabled={!file}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-foreground text-background font-semibold py-4 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed">
          <Upload className="h-4 w-4" /> Upload & Submit Booking
        </button>
      )}

      {uploadStatus === "uploading" && (
        <div className="flex flex-col items-center py-6 gap-3">
          <Loader2 className="h-8 w-8 text-accent animate-spin" />
          <p className="text-secondary text-sm">Uploading receipt &amp; submitting booking…</p>
        </div>
      )}

      {uploadStatus === "done" && (
        <div className="flex flex-col items-center py-6 gap-3">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
          <p className="text-secondary text-sm">Booking submitted! Redirecting…</p>
        </div>
      )}
    </div>
  );
}
