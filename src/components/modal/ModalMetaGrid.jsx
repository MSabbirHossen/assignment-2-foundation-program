import React from "react";
import { Calendar, Clock, Tv, Globe } from "lucide-react";

export default function ModalMetaGrid({ show }) {
  const networkName = show.network?.name || show.webChannel?.name || "Various";
  const networkCountry =
    show.network?.country?.name || show.webChannel?.country?.name || "";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-xs">
      <div className="space-y-1">
        <span className="text-[11px] font-bold text-[#003459] uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#007ea7]" /> Release Date
        </span>
        <p className="text-sm font-bold text-[#00171f]">
          {show.premiered || "Unknown"} {show.ended ? `– ${show.ended}` : ""}
        </p>
      </div>

      <div className="space-y-1">
        <span className="text-[11px] font-bold text-[#003459] uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#007ea7]" /> Runtime
        </span>
        <p className="text-sm font-bold text-[#00171f]">
          {show.averageRuntime || show.runtime
            ? `${show.averageRuntime || show.runtime} mins / ep`
            : "Varies"}
        </p>
      </div>

      <div className="space-y-1">
        <span className="text-[11px] font-bold text-[#003459] uppercase tracking-wider flex items-center gap-1.5">
          <Tv className="w-3.5 h-3.5 text-[#007ea7]" /> Network / Channel
        </span>
        <p className="text-sm font-bold text-[#00171f] line-clamp-1">
          {networkName} {networkCountry ? `(${networkCountry})` : ""}
        </p>
      </div>

      <div className="space-y-1">
        <span className="text-[11px] font-bold text-[#003459] uppercase tracking-wider flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-[#007ea7]" /> Language
        </span>
        <p className="text-sm font-bold text-[#00171f]">
          {show.language || "English"}
        </p>
      </div>
    </div>
  );
}
