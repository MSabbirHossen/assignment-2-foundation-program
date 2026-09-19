import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  Mail,
  Send,
  MessageCircle,
  Check,
  Copy,
  GraduationCap,
  Building2,
  Sparkles,
  ArrowRight,
  Code2,
} from "lucide-react";

export const SOCIAL_CHANNELS = [
  // Direct Contacts
  {
    name: "WhatsApp",
    handle: "+8801773511874",
    subHandle: "Direct Chat",
    category: "Direct Contact",
    role: "Instant Messaging & Voice",
    description:
      "Direct WhatsApp connection for quick project inquiries, instant messaging, and consultations.",
    link: "https://wa.me/+8801773511874",
    color: "#25D366",
    actionLabel: "Chat on WhatsApp",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.34 1 2.5c.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.29s-1.44-.71-1.66-.82c-.22-.11-.38-.16-.54.16s-.63.82-.77.98c-.14.16-.28.18-.53.06s-1.05-.39-2-1.23c-.74-.66-1.24-1.47-1.38-1.72s-.01-.38.11-.5c.11-.11.25-.29.37-.43.12-.14.16-.24.25-.4.08-.16.04-.31-.02-.43s-.54-1.3-.74-1.78c-.2-.47-.4-.41-.55-.42z" />
      </svg>
    ),
  },
  {
    name: "Telegram",
    handle: "@sabb1rhossen",
    subHandle: "Direct Chat",
    category: "Direct Contact",
    role: "Instant Messaging & Community",
    description:
      "Connect directly on Telegram for real-time discussions, dev updates, and community chats.",
    link: "https://t.me/sabb1rhossen",
    color: "#229ED9",
    actionLabel: "Open Telegram",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
      </svg>
    ),
  },
  {
    name: "Email",
    handle: "mshossen724@gmail.com",
    subHandle: "Official Mail",
    category: "Direct Contact",
    role: "Official & Business Mail",
    description:
      "Direct email channel for business proposals, technical consulting, and formal collaboration.",
    link: "mailto:mshossen724@gmail.com",
    color: "#EA4335",
    actionLabel: "Send Email",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },

  // Platforms
  {
    name: "Portfolio",
    handle: "msabbirhossen.github.io",
    subHandle: "Personal Showcase",
    category: "Platforms",
    role: "Live Projects & Bio",
    description:
      "Explore live web apps, system design architectures, and personal engineering journey.",
    link: "https://msabbirhossen.github.io/",
    color: "#00a8e8",
    actionLabel: "Visit Portfolio",
    icon: <Globe className="w-5 h-5" />,
  },
  {
    name: "LinkedIn",
    handle: "@sabb1rhossen",
    subHandle: "Professional Network",
    category: "Platforms",
    role: "Professional Network & Career",
    description:
      "Connect for collaborations, technical discussions, and professional networking.",
    link: "https://www.linkedin.com/in/sabb1rhossen/",
    color: "#0A66C2",
    actionLabel: "Connect on LinkedIn",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    handle: "@MSabbirHossen",
    subHandle: "Source Repositories",
    category: "Platforms",
    role: "Open Source & Codebases",
    description:
      "Explore active repositories, stars, and full-stack personal systems codebases.",
    link: "https://github.com/MSabbirHossen",
    color: "#00171f",
    actionLabel: "View GitHub",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "@sabb1rhossen",
    subHandle: "Tech Documentations",
    category: "Platforms",
    role: "Tech Content & Code Teardowns",
    description:
      "Programming walkthroughs, modern stack architectures, and real-world dev projects.",
    link: "https://www.youtube.com/@sabb1rhossen",
    color: "#FF0000",
    actionLabel: "Visit YouTube",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    handle: "@sabb1rhossen",
    subHandle: "Community & Discussion",
    category: "Platforms",
    role: "Community Updates & Insights",
    description:
      "Community interactions, quick programming notes, and project launch updates.",
    link: "https://www.facebook.com/sabb1rhossen/",
    color: "#1877F2",
    actionLabel: "Follow on Facebook",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    handle: "@parttimecoder",
    subHandle: "Visual Stories & Work",
    category: "Platforms",
    role: "Creative Highlights & BTS",
    description:
      "Behind the scenes, developer workspace snapshots, and daily tech reflections.",
    link: "https://www.instagram.com/parttimecoder/",
    color: "#E4405F",
    actionLabel: "Follow on Instagram",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },

  // Ventures
  {
    name: "Exploratory Training Academy",
    handle: "Educational Institute",
    subHandle: "Educational Institute",
    category: "Ventures",
    role: "Tech Training & Mentorship",
    description:
      "Empowering students and aspiring software engineers with hands-on training, real projects, and modern technical skills.",
    link: null,
    isUpcoming: true,
    statusText: "Soon to be added",
    color: "#007ea7",
    actionLabel: "Coming Soon",
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    name: "Part-time Coder",
    handle: "Tech Studio",
    subHandle: "Tech Company",
    category: "Ventures",
    role: "Software Studio & Products",
    description:
      "Engineering scalable software systems, personal productivity suites, and bespoke digital solutions.",
    link: null,
    isUpcoming: true,
    statusText: "Soon to be added",
    color: "#003459",
    actionLabel: "Coming Soon",
    icon: <Building2 className="w-5 h-5" />,
  },
];

export default function DeveloperPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const handleCopyEmail = (email = "mshossen724@gmail.com") => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = message.trim();
    const url = text
      ? `https://wa.me/+8801773511874?text=${encodeURIComponent(text)}`
      : "https://wa.me/+8801773511874";
    window.open(url, "_blank", "noopener,noreferrer");
    setMessageSent(true);
    setTimeout(() => {
      setMessage("");
      setMessageSent(false);
    }, 3000);
  };

  const categories = ["All", "Direct Contact", "Platforms", "Ventures"];
  const filteredChannels =
    activeCategory === "All"
      ? SOCIAL_CHANNELS
      : SOCIAL_CHANNELS.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#007ea7]/10 border border-[#007ea7]/25 text-xs font-bold text-[#007ea7]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CREATOR & COMMUNITY HUB</span>
        </div>
        <h1 className="font-almendra text-4xl sm:text-5xl md:text-6xl font-bold text-[#00171f] tracking-wide">
          Meet the Developer
        </h1>
        <p className="font-architects text-base sm:text-lg text-[#003459]/80 leading-relaxed">
          Connect with MS Hossen (Part-Time Coder), the engineer behind
          MovieExplorer. Reach out via WhatsApp, Telegram, Email, or explore the
          creative portfolio.
        </p>
      </div>

      {/* Main Developer Showcase Hero Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-slate-200 shadow-xl space-y-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Avatar & Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#003459] via-[#007ea7] to-[#00a8e8] p-1.5 shadow-xl shadow-[#007ea7]/20 flex items-center justify-center">
                <div className="w-full h-full bg-[#00171f] rounded-2xl flex items-center justify-center text-white font-black text-3xl sm:text-4xl tracking-wider">
                  MS
                </div>
              </div>
              <span
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-md animate-pulse"
                title="Active Developer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="font-almendra text-3xl sm:text-4xl font-bold text-[#00171f] tracking-wide">
                  MS Hossen
                </h2>
                <span className="px-3 py-1 rounded-xl text-xs font-bold bg-[#007ea7]/10 text-[#007ea7] border border-[#007ea7]">
                  Part-Time Coder
                </span>
                <span className="px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300">
                  Available for Collabs
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-[#007ea7]">
                Full-Stack Software Engineer • Creator & Maintainer
              </p>
              <p className="font-architects text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed">
                Designing cohesive, human-centered systems and high-performance
                web applications that bring structure and joy to daily life.
                Crafted with React 19, Next.js, Node.js, and aesthetic UI
                design.
              </p>
            </div>
          </div>

          {/* Direct CTA Buttons */}
          <div className="flex flex-wrap sm:flex-col gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => handleCopyEmail()}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-slate-100 text-[#003459] border-2 border-slate-300 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#007ea7]" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href="https://msabbirhossen.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#007ea7] hover:bg-[#003459] text-white border-2 border-[#003459] flex items-center justify-center gap-2 transition-all text-center shadow-md cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>Visit Portfolio</span>
            </a>
          </div>
        </div>

        {/* Toolkit Strip */}
        <div className="pt-6 border-t-2 border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#003459] uppercase tracking-wider mr-2">
            Core Toolkit:
          </span>
          {[
            "React 19",
            "Next.js",
            "Node.js",
            "Tailwind CSS v4",
            "REST APIs",
            "SOLID Architecture",
            "System Design",
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 text-[#003459] border border-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Direct WhatsApp Messaging & Quick Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Instant Message Card */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-slate-50 border-2 border-slate-200 shadow-md flex flex-col justify-between space-y-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#25D366] text-xs font-bold uppercase tracking-wider">
              <MessageCircle className="w-4 h-4" />
              <span>Instant WhatsApp Inquiry</span>
            </div>
            <h3 className="font-almendra text-2xl font-bold text-[#00171f]">
              Send a Direct Message
            </h3>
            <p className="font-architects text-sm text-[#003459]/70 leading-relaxed">
              Have a project question, collaboration idea, or feature request?
              Send a quick message straight to my WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSendMessage} className="space-y-3">
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi MS Hossen, I checked out MovieExplorer and would like to connect regarding..."
              className="w-full p-3.5 rounded-2xl bg-white border-2 border-slate-300 focus:border-[#007ea7] text-[#00171f] placeholder-slate-400 text-sm focus:outline-none shadow-xs transition-colors"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              {messageSent ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Opening WhatsApp...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send via WhatsApp (+8801773511874)</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Quick Email / Telegram Banner */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#00171f] text-white border-2 border-[#003459] shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007ea7]/20 border border-[#007ea7] text-xs font-bold text-[#3fcfff]">
              <Code2 className="w-3.5 h-3.5" />
              <span>Direct Communication</span>
            </div>
            <h3 className="font-almendra text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Let’s Build Something Great
            </h3>
            <p className="font-architects text-sm text-slate-300 leading-relaxed">
              Always open to open-source contributions, high-impact product
              engineering, and technical mentorship.
            </p>
          </div>

          <div className="space-y-2.5">
            <a
              href="mailto:mshossen724@gmail.com"
              className="w-full p-3 rounded-xl bg-[#003459]/70 hover:bg-[#007ea7] border border-[#007ea7]/40 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold flex items-center gap-3 transition-colors"
            >
              <Mail className="w-4 h-4 text-[#EA4335] shrink-0" />
              <span className="truncate">Email: mshossen724@gmail.com</span>
            </a>
            <a
              href="https://t.me/sabb1rhossen"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-3 rounded-xl bg-[#003459]/70 hover:bg-[#007ea7] border border-[#007ea7]/40 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold flex items-center gap-3 transition-colors"
            >
              <Send className="w-4 h-4 text-[#229ED9] shrink-0" />
              <span>Telegram: @sabb1rhossen</span>
            </a>
          </div>
        </div>
      </div>

      {/* Social & Professional Channels Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-200">
          <div>
            <h2 className="font-almendra text-3xl font-bold text-[#00171f] tracking-wide">
              Official Channels & Ventures
            </h2>
            <p className="font-architects text-sm text-[#003459]/70 mt-1">
              Explore source repositories, professional platforms, and
              educational initiatives
            </p>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border-2 ${
                  activeCategory === cat
                    ? "bg-[#007ea7] text-white border-[#003459] shadow-xs"
                    : "bg-white text-[#003459] hover:bg-slate-100 border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChannels.map((channel) => (
            <div
              key={channel.name}
              className="p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-[#007ea7] transition-all flex flex-col justify-between gap-4 shadow-sm hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-[#003459] border border-slate-200 shrink-0">
                      {channel.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-[#00171f]">
                        {channel.name}
                      </h4>
                      <p className="text-xs text-[#007ea7] font-semibold">
                        {channel.handle}
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-[#003459] border border-slate-300">
                    {channel.category}
                  </span>
                </div>

                <p className="font-architects text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {channel.description}
                </p>
              </div>

              {channel.link ? (
                <a
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#003459] hover:bg-[#007ea7] text-white text-xs font-bold transition-all text-center block shadow-xs"
                >
                  {channel.actionLabel}
                </a>
              ) : (
                <div className="w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-400 text-xs font-semibold text-center border border-slate-200">
                  {channel.actionLabel}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
