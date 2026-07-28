import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Play, Pause, Volume2, VolumeX, Cpu, Radio, 
  Activity, Layers, Sparkles, ArrowRight, ChevronRight, 
  Newspaper, Users, BriefcaseBusiness
} from "lucide-react";
import { shouldReduceMotion } from "../../utils/motion";

interface VideoReel {
  id: string;
  title: string;
  subtitle: string;
  videoPath: string;
  tag: string;
}

const REELS: VideoReel[] = [
  {
    id: "reel-1",
    title: "Agentic Orchestration",
    subtitle: "Orkiestracja Codex + Trae + Claude w akcji",
    videoPath: "news/backgrounds/tech-news-01.mp4",
    tag: "WORKFLOW"
  },
  {
    id: "reel-2",
    title: "Threat Intelligence",
    subtitle: "Analiza przestępczości AI & eKYC bypass",
    videoPath: "news/backgrounds/tech-news-06.mp4",
    tag: "AI CRIME"
  },
  {
    id: "reel-3",
    title: "Context-as-a-Service",
    subtitle: "Monetyzacja i wektorowe bazy pamięci agentów",
    videoPath: "news/backgrounds/tech-news-11.mp4",
    tag: "BUSINESS"
  },
  {
    id: "reel-4",
    title: "Automation Engine",
    subtitle: "Budowa bloga w 100% z pomocą agentów AI",
    videoPath: "news/backgrounds/tech-news-16.mp4",
    tag: "ARCHITEKTURA"
  }
];

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export function CinematicHero() {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Telemetry state simulation
  const [telemetry, setTelemetry] = useState({
    cpuLoad: 28,
    memoryUsage: 4.2,
    activeAgents: 3,
    pingMs: 45
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setReducedMotion(shouldReduceMotion());
  }, []);

  // Telemetry simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        cpuLoad: Math.floor(20 + Math.random() * 25),
        memoryUsage: parseFloat((4.0 + Math.random() * 0.5).toFixed(2)),
        activeAgents: Math.random() > 0.85 ? (Math.random() > 0.5 ? 2 : 4) : 3,
        pingMs: Math.floor(38 + Math.random() * 15)
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const activeReel = REELS[activeReelIndex];

  // Track video progress
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleReelChange = (index: number) => {
    if (index === activeReelIndex) return;
    setFade(true);
    setTimeout(() => {
      setActiveReelIndex(index);
      setProgress(0);
      setFade(false);
    }, 400000 / 1000); // 400ms transition time
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      void videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full h-[650px] sm:h-[700px] bg-black overflow-hidden border-b border-zinc-900 select-none">
      
      {/* 1. CINEMATIC VIDEO BACKGROUND */}
      <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${fade ? "opacity-20" : "opacity-70"}`}>
        <video
          ref={videoRef}
          key={activeReel.id}
          src={assetUrl(activeReel.videoPath)}
          autoPlay={!reducedMotion}
          muted={isMuted}
          loop
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="absolute inset-0 w-full h-full object-cover filter contrast-[1.1] brightness-[0.7]"
        />
      </div>

      {/* 2. GRADIENT OVERLAYS (Cinematic Frame) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

      {/* 3. GRID LINES (Cyber Aesthetics) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* 4. MAIN INTERACTIVE CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-10">
        
        {/* TOP ROW: Live Telemetry HUD */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          
          {/* Telemetry Widgets */}
          <div className="flex items-center gap-4 bg-zinc-950/80 border border-zinc-800/80 p-3 backdrop-blur-md rounded-none">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </div>
            
            <div className="flex gap-4 font-mono text-[9px] text-zinc-400 uppercase tracking-widest divide-x divide-zinc-800">
              <div className="flex items-center gap-1.5 pl-2 first:pl-0">
                <Cpu size={12} className="text-orange-500" />
                <span>CPU: <strong className="text-white">{telemetry.cpuLoad}%</strong></span>
              </div>
              <div className="flex items-center gap-1.5 pl-4">
                <Activity size={12} className="text-orange-500" />
                <span>LATENCY: <strong className="text-white">{telemetry.pingMs}ms</strong></span>
              </div>
              <div className="flex items-center gap-1.5 pl-4">
                <Layers size={12} className="text-orange-500" />
                <span>MEM: <strong className="text-white">{telemetry.memoryUsage}GB</strong></span>
              </div>
            </div>
          </div>

          {/* Node Status widgets */}
          <div className="hidden sm:flex items-center gap-2 bg-zinc-950/80 border border-zinc-800/80 p-2 backdrop-blur-md font-mono text-[9px]">
            <span className="text-zinc-500 uppercase mr-1">Nodes:</span>
            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5">
              <span className="w-1 h-1 rounded-full bg-amber-500 animate-pulse"></span>
              <span>CODEX</span>
            </div>
            <div className="flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5">
              <span className="w-1 h-1 rounded-full bg-blue-500"></span>
              <span>TRAE</span>
            </div>
            <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>CLAUDE</span>
            </div>
          </div>

        </div>

        {/* MIDDLE ROW: Editorial Branding & Custom Reel Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
          
          {/* LEFT: Branding Heading & Description */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-3 py-1 bg-orange-600 text-black text-[9px] font-black uppercase tracking-widest">
              AI-NATIVE ORCHESTRATION & CODE CONTEXT
            </span>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-[68px] font-black leading-[0.85] tracking-tighter text-white uppercase font-sans">
                Dziennik <br />
                budowy <span className="text-orange-500">AI</span>
              </h1>
              <p className="text-zinc-500 text-xs font-mono uppercase tracking-[0.2em]">
                Od strony Project Managera
              </p>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-lg font-sans">
              Testuję agentów AI, automatyzacje i AI coding w prawdziwej pracy. Pokazuję co działa, co jest przereklamowane i jak to wdrożyć w produkcji bez chaosu.
            </p>

            {/* Micro CTA Badge */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/articles"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-orange-600 hover:bg-orange-700 text-black hover:text-black text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer"
              >
                <span>Biblioteka artykułów</span>
                <ArrowRight size={13} className="ml-2" />
              </Link>
              
              <a
                href="#news-section"
                className="inline-flex items-center justify-center px-6 py-3.5 border border-zinc-700 bg-zinc-950/40 text-zinc-300 hover:text-white hover:border-zinc-500 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
              >
                <span>Przejdź do newsroomu</span>
              </a>
            </div>
          </div>

          {/* RIGHT: Dynamic Cinematic Reel Switcher (The Theater Control Panel) */}
          <div className="lg:col-span-5 lg:justify-self-end w-full max-w-sm">
            <div className="bg-zinc-950/90 border border-zinc-800/80 p-5 backdrop-blur-md rounded-none shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1.5">
                  <Radio size={12} className="text-orange-500 animate-pulse" />
                  <span>Cinematic Reels</span>
                </span>
                <span className="text-[9px] font-mono text-orange-500/80 font-bold uppercase bg-orange-500/10 px-2 py-0.5 border border-orange-500/20">
                  REEL SELECTION
                </span>
              </div>

              {/* Reels List */}
              <div className="space-y-2">
                {REELS.map((reel, index) => {
                  const isActive = index === activeReelIndex;
                  return (
                    <button
                      key={reel.id}
                      onClick={() => handleReelChange(index)}
                      className={`w-full text-left p-3 border transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer ${
                        isActive 
                          ? "bg-zinc-900 border-orange-500/60 shadow-[0_0_15px_rgba(249,115,22,0.05)]" 
                          : "bg-zinc-950 border-zinc-900/60 hover:bg-zinc-900 hover:border-zinc-800"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 ${
                            isActive ? "bg-orange-500 text-black" : "bg-zinc-800 text-zinc-400"
                          }`}>
                            {reel.tag}
                          </span>
                          <span className={`text-xs font-black uppercase tracking-tight transition-colors ${
                            isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                          }`}>
                            {reel.title}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500 leading-none">
                          {reel.subtitle}
                        </p>
                      </div>
                      <ChevronRight size={14} className={`transition-transform duration-300 ${
                        isActive ? "text-orange-500 translate-x-0.5" : "text-zinc-600"
                      }`} />
                    </button>
                  );
                })}
              </div>

              {/* Active Slide Timeline / Status */}
              <div className="border-t border-zinc-900 pt-3 flex items-center justify-between gap-4 font-mono text-[9px] text-zinc-500">
                <span>ACTIVE: <strong className="text-zinc-300">0{activeReelIndex + 1}</strong></span>
                <span>STATUS: <strong className="text-emerald-500 animate-pulse">STREAMING</strong></span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: Custom Player HUD & Progress Bar */}
        <div className="w-full space-y-4">
          
          {/* Progress timeline bar */}
          <div className="relative w-full h-1 bg-zinc-900/80 rounded-none overflow-hidden cursor-pointer group">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-300 ease-out shadow-[0_0_8px_rgba(249,115,22,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Player Controls */}
            <div className="flex items-center gap-2.5">
              
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="flex h-8 w-8 items-center justify-center border border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                aria-label={isPlaying ? "Wstrzymaj odtwarzanie" : "Odtwarzaj"}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} className="text-orange-500 ml-0.5" />}
              </button>

              {/* Mute / Unmute */}
              <button
                onClick={toggleMute}
                className="flex h-8 w-8 items-center justify-center border border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                aria-label={isMuted ? "Wyłącz wyciszenie" : "Wycisz"}
              >
                {isMuted ? <VolumeX size={13} className="text-zinc-500" /> : <Volume2 size={13} className="text-orange-500" />}
              </button>

              <span className="hidden sm:inline font-mono text-[9px] text-zinc-500 uppercase tracking-widest pl-1.5">
                VIDEO AUDIO IS {isMuted ? "MUTED BY DEFAULT" : "PLAYING"}
              </span>

            </div>

            {/* Right: Author signature or watermark */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                BLOG AUTHOR WORKFLOW REEL v2.0
              </span>
              <div className="h-5 w-px bg-zinc-900" />
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[9px] text-zinc-400">HOST_ONLINE</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
