import React from "react";
import { AlertCircle } from "lucide-react";

/**
 * Reusable Error Banner (SRP & LSP)
 */
export default function ErrorBanner({
  message,
  onRetry,
  retryText = "Retry",
  className = "",
}) {
  if (!message) return null;

  return (
    <div
      className={`p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${className}`}
      role="alert"
    >
      <div className="flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
        <span className="text-sm font-medium">{message}</span>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-1.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-xs font-bold text-rose-800 transition-colors shrink-0 cursor-pointer"
        >
          {retryText}
        </button>
      )}
    </div>
  );
}
