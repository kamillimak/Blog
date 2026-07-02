import React from "react";

interface IllustrationProps {
  imageKey: string;
  className?: string;
}

export function ArticleIllustration({ imageKey, className = "" }: IllustrationProps) {
  // Common container classes with stable ratio (e.g., 16:9)
  const baseClass = `relative w-full aspect-video rounded-lg overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center select-none ${className}`;

  switch (imageKey) {
    case "codex_hero":
      return (
        <div className={baseClass}>
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-25" />
          
          {/* Codex Vector Illustration */}
          <svg className="w-full h-full p-6 text-indigo-500" viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Repo / Code tree */}
            <rect x="30" y="40" width="100" height="145" rx="4" fill="#0f172a" stroke="#4338ca" strokeWidth="2" />
            <path d="M45 60h40M45 75h70M45 90h50" stroke="#312e81" strokeWidth="2" strokeLinecap="round" />
            <path d="M45 115h60M45 130h40M45 145h55" stroke="#312e81" strokeWidth="2" strokeLinecap="round" />
            
            {/* Folder structures */}
            <circle cx="50" cy="60" r="2" fill="#818cf8" />
            <circle cx="50" cy="75" r="2" fill="#818cf8" />
            <circle cx="50" cy="90" r="2" fill="#818cf8" />

            {/* AI Agent analyzing */}
            <g transform="translate(190, 45)">
              <circle cx="60" cy="60" r="45" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />
              <rect x="35" y="45" width="50" height="30" rx="4" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
              {/* Pulsing light */}
              <circle cx="60" cy="60" r="6" fill="#818cf8" className="animate-pulse" />
              <path d="M45 55h30M45 65h20" stroke="#e0e7ff" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Connecting contextual lines */}
            <path d="M130 90 L 195 75" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M130 130 L 195 125" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Output File being updated */}
            <rect x="270" y="70" width="100" height="115" rx="4" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
            <path d="M285 90h50M285 105h70" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
            <path d="M285 120h40" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            <path d="M285 135h60" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
            <path d="M285 150h30" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );

    case "trae_hero":
      return (
        <div className={baseClass}>
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b_1px,transparent_1px),linear-gradient(to_bottom,#064e3b_1px,transparent_1px)] bg-[size:24px_24px] opacity-10" />
          
          {/* Trae Code Editor Diff Illustration */}
          <svg className="w-full h-full p-6 text-emerald-500" viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Split Screen Container */}
            <rect x="20" y="30" width="360" height="165" rx="6" fill="#022c22" stroke="#047857" strokeWidth="2" />
            
            {/* Left Pane (Original Code) */}
            <rect x="35" y="55" width="155" height="125" rx="3" fill="#022c22" stroke="#065f46" strokeWidth="1.5" />
            <path d="M45 75h50M45 90h85M45 105h70" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
            {/* Deleted line marker */}
            <rect x="42" y="117" width="140" height="16" fill="#991b1b" fillOpacity="0.4" rx="2" />
            <path d="M45 125h100" stroke="#f87171" strokeWidth="2" strokeLinecap="round" />
            <path d="M45 145h60M45 160h45" stroke="#059669" strokeWidth="2" strokeLinecap="round" />

            {/* Split Divider */}
            <line x1="200" y1="30" x2="200" y2="195" stroke="#047857" strokeWidth="1.5" />

            {/* Right Pane (Modified Code with AI Suggestions) */}
            <rect x="210" y="55" width="155" height="125" rx="3" fill="#022c22" stroke="#065f46" strokeWidth="1.5" />
            <path d="M220 75h50M220 90h85M220 105h70" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
            {/* Added line marker */}
            <rect x="217" y="117" width="140" height="32" fill="#065f46" fillOpacity="0.5" rx="2" stroke="#10b981" strokeWidth="1" />
            <path d="M220 125h110M220 137h90" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
            <path d="M220 160h45" stroke="#059669" strokeWidth="2" strokeLinecap="round" />

            {/* Accept / Reject Buttons in Trae */}
            <g transform="translate(135, 12)">
              <rect x="0" y="0" width="130" height="24" rx="4" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="65" y="16" fill="#34d399" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">AI EDIT: ACTIVE</text>
            </g>
          </svg>
        </div>
      );

    case "claude_hero":
      return (
        <div className={baseClass}>
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#451a03_1px,transparent_1px),linear-gradient(to_bottom,#451a03_1px,transparent_1px)] bg-[size:24px_24px] opacity-15" />
          
          {/* Claude Architecture Layers */}
          <svg className="w-full h-full p-6 text-amber-500" viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Layer 1: Client/UI */}
            <g transform="translate(40, 40)">
              <rect x="0" y="0" width="320" height="35" rx="4" fill="#78350f" fillOpacity="0.4" stroke="#d97706" strokeWidth="1.5" />
              <text x="160" y="22" fill="#f59e0b" fontSize="11" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">WARSTWA PREZENTACJI (React Components)</text>
            </g>

            {/* Connectors */}
            <line x1="120" y1="75" x2="120" y2="100" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="280" y1="75" x2="280" y2="100" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" />

            {/* Layer 2: Business Logic / State */}
            <g transform="translate(40, 100)">
              <rect x="0" y="0" width="320" height="35" rx="4" fill="#78350f" fillOpacity="0.6" stroke="#f59e0b" strokeWidth="2" />
              <text x="160" y="22" fill="#fbbf24" fontSize="11" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">LOGIKA I ZARZĄDZANIE STANEM (Zustand / Context)</text>
            </g>

            {/* Connectors */}
            <line x1="200" y1="135" x2="200" y2="160" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />

            {/* Layer 3: Abstract Services / API */}
            <g transform="translate(40, 160)">
              <rect x="0" y="0" width="320" height="35" rx="4" fill="#78350f" fillOpacity="0.8" stroke="#fbbf24" strokeWidth="2" />
              <text x="160" y="22" fill="#fef08a" fontSize="11" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">STRUKTURY DANYCH & API SERVICES</text>
            </g>
          </svg>
        </div>
      );

    case "aistudio_hero":
      return (
        <div className={baseClass}>
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#082f49_1px,transparent_1px),linear-gradient(to_bottom,#082f49_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
          
          {/* AI Studio Context Window Illustration */}
          <svg className="w-full h-full p-6 text-sky-500" viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* The giant context ring */}
            <circle cx="200" cy="112" r="85" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 8" />
            <circle cx="200" cy="112" r="75" stroke="#0284c7" strokeWidth="2" />
            
            {/* Glowing core */}
            <circle cx="200" cy="112" r="25" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
            <text x="200" y="116" fill="#e0f2fe" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">GEMINI</text>

            {/* Multi-file connections representing 1M+ tokens */}
            <g transform="translate(50, 45)">
              <rect x="0" y="0" width="45" height="35" rx="3" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="22" y="22" fill="#e0f2fe" fontSize="8" fontFamily="monospace" textAnchor="middle">src/</text>
            </g>
            <path d="M95 62 L 140 90" stroke="#38bdf8" strokeWidth="1.5" />

            <g transform="translate(300, 45)">
              <rect x="0" y="0" width="45" height="35" rx="3" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="22" y="22" fill="#e0f2fe" fontSize="8" fontFamily="monospace" textAnchor="middle">docs/</text>
            </g>
            <path d="M300 62 L 255 90" stroke="#38bdf8" strokeWidth="1.5" />

            <g transform="translate(50, 145)">
              <rect x="0" y="0" width="45" height="35" rx="3" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="22" y="22" fill="#e0f2fe" fontSize="8" fontFamily="monospace" textAnchor="middle">tests/</text>
            </g>
            <path d="M95 162 L 140 135" stroke="#38bdf8" strokeWidth="1.5" />

            <g transform="translate(300, 145)">
              <rect x="0" y="0" width="45" height="35" rx="3" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="22" y="22" fill="#e0f2fe" fontSize="8" fontFamily="monospace" textAnchor="middle">config</text>
            </g>
            <path d="M300 162 L 255 135" stroke="#38bdf8" strokeWidth="1.5" />

            {/* Context capacity bar */}
            <g transform="translate(110, 200)">
              <rect x="0" y="0" width="180" height="12" rx="6" fill="#082f49" stroke="#0284c7" strokeWidth="1" />
              <rect x="2" y="2" width="140" height="8" rx="4" fill="#38bdf8" />
              <text x="90" y="9" fill="#082f49" fontSize="7" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">CONTEXT WINDOW: 78%</text>
            </g>
          </svg>
        </div>
      );

    case "workflow_hero":
    default:
      return (
        <div className={baseClass}>
          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b_1px,transparent_1px)] bg-[size:24px_24px] opacity-25" />
          
          {/* Synchronized Loop - AI Studio -> Claude -> Codex -> Trae */}
          <svg className="w-full h-full p-6 text-violet-500" viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* The infinite loop/flow path */}
            <path d="M60,112 C60,50 340,50 340,112 C340,174 60,174 60,112 Z" stroke="#4c1d95" strokeWidth="3" fill="none" />
            <path d="M60,112 C60,50 340,50 340,112 C340,174 60,174 60,112 Z" stroke="#a78bfa" strokeWidth="2" strokeDasharray="10 15" fill="none" className="animate-[dash_20s_linear_infinite]" />

            {/* Node 1: AI Studio */}
            <g transform="translate(170, 20)">
              <rect x="0" y="0" width="60" height="25" rx="4" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="30" y="16" fill="#e0f2fe" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">AI STUDIO</text>
            </g>

            {/* Node 2: Claude */}
            <g transform="translate(290, 100)">
              <rect x="0" y="0" width="60" height="25" rx="4" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
              <text x="30" y="16" fill="#fef08a" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CLAUDE</text>
            </g>

            {/* Node 3: Codex */}
            <g transform="translate(170, 180)">
              <rect x="0" y="0" width="60" height="25" rx="4" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="30" y="16" fill="#e0e7ff" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">CODEX</text>
            </g>

            {/* Node 4: Trae */}
            <g transform="translate(50, 100)">
              <rect x="0" y="0" width="60" height="25" rx="4" fill="#022c22" stroke="#34d399" strokeWidth="1.5" />
              <text x="30" y="16" fill="#ecfdf5" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">TRAE</text>
            </g>

            {/* Center title */}
            <rect x="130" y="92" width="140" height="40" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
            <text x="200" y="112" fill="#f8fafc" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">SYNERGIA AI</text>
            <text x="200" y="125" fill="#94a3b8" fontSize="8" fontFamily="sans-serif" textAnchor="middle">CIĄGŁY WORKFLOW</text>
          </svg>
        </div>
      );
  }
}
