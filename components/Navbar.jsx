"use client";
import { useState } from "react";
import { Radio, Menu, X, Search } from "lucide-react";

export default function Navbar({ search, onSearch, category, onCategory, categories }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-dark border-b border-ocean-400/20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#13678A,#45C4B0)" }}>
              <Radio className="w-4.5 h-4.5 text-ocean-950" style={{width:18,height:18}} />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-ocean-200 rounded-full border-2 border-ocean-950 animate-pulse-dot" />
            </div>
            <span className="font-display font-bold text-white text-lg tracking-tight hidden sm:block">
              Live<span className="text-gradient">Stream</span>
            </span>
          </div>

          {/* Desktop search + filter */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-xl">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search events…"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full rounded-xl px-4 py-2 pl-10 text-sm text-white placeholder-ocean-400/60 focus:outline-none focus:ring-2 focus:ring-ocean-400/40 transition"
                style={{ background:"rgba(19,103,138,0.25)", border:"1px solid rgba(69,196,176,0.25)" }}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ocean-400/60" />
              {search && (
                <button onClick={() => onSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-ocean-400/60 hover:text-white transition">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <select
              value={category}
              onChange={(e) => onCategory(e.target.value)}
              className="rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-ocean-400/40 transition cursor-pointer"
              style={{ background:"rgba(19,103,138,0.3)", border:"1px solid rgba(69,196,176,0.25)" }}
            >
              {categories.map((c) => <option key={c} value={c} style={{background:"#012030"}}>{c}</option>)}
            </select>
          </div>

          {/* Live badge */}
          <div className="hidden md:flex items-center gap-1.5 rounded-full px-3 py-1.5"
            style={{ background:"rgba(154,235,163,0.12)", border:"1px solid rgba(154,235,163,0.3)" }}>
            <span className="w-2 h-2 bg-ocean-200 rounded-full animate-pulse-dot" />
            <span className="text-ocean-200 text-xs font-mono font-semibold">LIVE</span>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg text-ocean-400 hover:text-white hover:bg-ocean-700/40 transition">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 flex flex-col gap-3 animate-slide-up">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events…"
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-ocean-400/60 focus:outline-none focus:ring-2 focus:ring-ocean-400/40"
                style={{ background:"rgba(19,103,138,0.3)", border:"1px solid rgba(69,196,176,0.25)" }}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ocean-400/60" />
            </div>
            <select
              value={category}
              onChange={(e) => onCategory(e.target.value)}
              className="w-full rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none"
              style={{ background:"rgba(19,103,138,0.3)", border:"1px solid rgba(69,196,176,0.25)" }}
            >
              {categories.map((c) => <option key={c} value={c} style={{background:"#012030"}}>{c}</option>)}
            </select>
          </div>
        )}
      </div>
    </header>
  );
}
