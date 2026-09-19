import React from "react";
import { Link } from "react-router-dom";
import { Globe, Mail, MessageCircle, Send } from "lucide-react";

/**
 * Compact Developer Footer Spotlight (SRP)
 * Displays essential developer summary and links to the full /developer route.
 */
export default function DeveloperFooterInfo() {
  return (
    <div className="border-b border-[#003459] pb-8 mb-10">
      <div className="p-5 sm:p-6 rounded-2xl bg-[#00171f] border-2 border-[#003459] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        {/* Creator Info */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#003459] via-[#007ea7] to-[#00a8e8] p-0.5 shadow-md shrink-0 flex items-center justify-center">
            <div className="w-full h-full bg-[#00171f] rounded-[14px] flex items-center justify-center text-white font-black text-lg">
              MS
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-almendra text-xl font-bold text-white tracking-wide">
                MS Hossen
              </h4>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#007ea7]/20 text-[#3fcfff] border border-[#007ea7]/50">
                Part-Time Coder
              </span>
            </div>
            <p className="font-architects text-xs sm:text-sm text-slate-300 mt-0.5">
              Full-Stack Software Engineer • Architect of MovieExplorer
            </p>
          </div>
        </div>

        {/* Quick Channels & Link to Dedicated Page */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Quick Direct Icons */}
          <div className="flex items-center gap-2">
            <a
              href="mailto:mshossen724@gmail.com"
              title="Email MS Hossen"
              className="p-2.5 rounded-xl bg-[#003459] hover:bg-[#007ea7] text-white border border-[#007ea7]/30 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#EA4335]" />
            </a>
            <a
              href="https://wa.me/+8801773511874"
              target="_blank"
              rel="noopener noreferrer"
              title="Chat on WhatsApp"
              className="p-2.5 rounded-xl bg-[#003459] hover:bg-[#007ea7] text-white border border-[#007ea7]/30 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
            </a>
            <a
              href="https://t.me/sabb1rhossen"
              target="_blank"
              rel="noopener noreferrer"
              title="Connect on Telegram"
              className="p-2.5 rounded-xl bg-[#003459] hover:bg-[#007ea7] text-white border border-[#007ea7]/30 transition-colors"
            >
              <Send className="w-4 h-4 text-[#229ED9]" />
            </a>
            <a
              href="https://msabbirhossen.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit Portfolio"
              className="p-2.5 rounded-xl bg-[#003459] hover:bg-[#007ea7] text-white border border-[#007ea7]/30 transition-colors"
            >
              <Globe className="w-4 h-4 text-[#00a8e8]" />
            </a>
          </div>

          {/* Prominent Link to /developer Route */}
          <Link
            to="/developer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#007ea7] hover:bg-[#003459] text-white border border-[#00a8e8] shadow-md transition-all text-center flex-1 md:flex-none"
          >
            Meet the Developer &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
