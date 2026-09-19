import React from "react";
import { Users } from "lucide-react";

export default function ModalCastList({ cast, loading }) {
  if (loading) {
    return (
      <div className="py-6 flex items-center justify-center gap-3 text-sm text-[#007ea7]">
        <div className="w-5 h-5 border-2 border-[#007ea7] border-t-transparent rounded-full animate-spin" />
        <span>Loading cast & crew info...</span>
      </div>
    );
  }

  if (!cast || cast.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-bold text-[#00171f] flex items-center gap-2">
        <Users className="w-5 h-5 text-[#007ea7]" />
        Key Cast & Characters
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {cast.slice(0, 8).map((item, idx) => (
          <div
            key={item.person?.id || idx}
            className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
              {item.person?.image?.medium ? (
                <img
                  src={item.person.image.medium}
                  alt={item.person.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#007ea7] text-xs font-bold">
                  {item.person?.name?.slice(0, 2) || "NA"}
                </div>
              )}
            </div>
            <div className="text-left overflow-hidden">
              <p className="text-xs font-bold text-[#00171f] truncate">
                {item.person?.name}
              </p>
              <p className="text-[11px] text-[#003459]/70 truncate">
                as {item.character?.name || "Cast"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
