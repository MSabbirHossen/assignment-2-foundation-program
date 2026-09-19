import React from "react";

/**
 * Reusable Empty State Component (SRP & LSP)
 */
export default function EmptyState({
  icon,
  title,
  description,
  action,
  children,
  className = "",
}) {
  return (
    <div
      className={`py-16 sm:py-20 text-center max-w-lg mx-auto space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm ${className}`}
    >
      {icon && (
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#007ea7] shadow-inner">
          {icon}
        </div>
      )}

      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-[#00171f]">{title}</h3>
        {description && (
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {action && <div className="pt-2">{action}</div>}
      {children}
    </div>
  );
}
