"use client";
import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";
import { events, categories } from "../data/events";
import { Radio, Tv, TrendingUp, Heart, Search } from "lucide-react";

export default function HomePage() {
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("All");
  const [selected, setSelected]   = useState(null);
  const [autoPlay, setAutoPlay]   = useState(false);
  const [saved, setSaved]         = useState(new Set());

  const handleOpen = (event, play = false) => {
    setSelected(event);
    setAutoPlay(play);
  };

  const handleClose = () => {
    setSelected(null);
    setAutoPlay(false);
  };

  const toggleSave = (id) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = events;
    if (category === "Favourites") {
      result = result.filter((e) => saved.has(e.id));
    } else if (category === "Trending") {
      result = result.filter((e) => e.isTrending);
    } else if (category !== "All") {
      result = result.filter((e) => e.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((e) => e.title.toLowerCase().includes(q));
    }
    return result;
  }, [search, category, saved]);

  const stats = [
    { label: "Live Now",       value: "3,240+", Icon: Radio,       color: "#45C4B0" },
    { label: "Viewers Today",  value: "1.2M+",  Icon: Tv,          color: "#9AEBA3" },
    { label: "Trending",       value: "48",     Icon: TrendingUp,  color: "#DAFDBA" },
    { label: "Saved",          value: saved.size, Icon: Heart,     color: "#9AEBA3" },
  ];

  const isEmpty = filtered.length === 0;

  return (
    <div className="min-h-screen" style={{ background:"#012030" }}>
      <Navbar
        search={search}
        onSearch={setSearch}
        category={category}
        onCategory={setCategory}
        categories={categories}
      />

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Hero ── */}
        <section className="mb-10">
          <div className="relative rounded-3xl overflow-hidden p-8 md:p-12"
            style={{
              background:"linear-gradient(135deg, rgba(19,103,138,0.35) 0%, rgba(69,196,176,0.1) 50%, rgba(1,32,48,0.8) 100%)",
              border:"1px solid rgba(69,196,176,0.2)",
              boxShadow:"inset 0 1px 0 rgba(69,196,176,0.1)"
            }}>
            {/* BG decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20"
                style={{ background:"radial-gradient(circle, #45C4B0, transparent 70%)" }} />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-15"
                style={{ background:"radial-gradient(circle, #9AEBA3, transparent 70%)" }} />
              {/* Dot grid */}
              <svg className="absolute inset-0 w-full h-full opacity-5" style={{ color:"#45C4B0" }}>
                <defs>
                  <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="currentColor"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background:"#9AEBA3" }} />
                  <span className="text-xs font-mono font-semibold tracking-widest uppercase" style={{ color:"#9AEBA3" }}>
                    Live Platform
                  </span>
                </div>
                <h1 className="font-display font-bold text-white text-3xl md:text-5xl leading-tight mb-4">
                  Watch the World<br />
                  <span className="text-gradient">Happen Live</span>
                </h1>
                <p className="text-sm md:text-base max-w-md leading-relaxed" style={{ color:"rgba(154,235,163,0.7)" }}>
                  Stream thousands of live events — tech summits, music festivals, sports, and masterclasses, all in one place.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 shrink-0">
                {stats.map(({ label, value, Icon, color }) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl p-3 sm:p-4"
                    style={{ background:"rgba(1,32,48,0.5)", border:"1px solid rgba(69,196,176,0.18)", backdropFilter:"blur(8px)" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background:"rgba(69,196,176,0.1)" }}>
                      <Icon className="w-4.5 h-4.5" style={{ color, width:18, height:18 }} />
                    </div>
                    <div>
                      <div className="font-display font-bold text-white text-lg leading-none">{value}</div>
                      <div className="text-xs mt-0.5" style={{ color:"rgba(154,235,163,0.5)" }}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Filters ── */}
        <FilterBar
          category={category}
          onCategory={setCategory}
          categories={categories}
          totalCount={filtered.length}
        />

        {/* ── Grid or empty state ── */}
        {!isEmpty ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((event, i) => (
              <div
                key={event.id}
                className="animate-slide-up"
                style={{ animationDelay:`${i * 45}ms`, animationFillMode:"both" }}
              >
                <EventCard
                  event={event}
                  onOpen={handleOpen}
                  isSaved={saved.has(event.id)}
                  onToggleSave={toggleSave}
                />
              </div>
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
              style={{ background:"rgba(19,103,138,0.3)", border:"1px solid rgba(69,196,176,0.2)" }}>
              {category === "Favourites"
                ? <Heart className="w-7 h-7" style={{ color:"#9AEBA3" }} />
                : <Search className="w-7 h-7" style={{ color:"#45C4B0" }} />
              }
            </div>
            <h2 className="font-display font-semibold text-white text-xl mb-2">
              {category === "Favourites" ? "No saved events yet" : "No events found"}
            </h2>
            <p className="text-sm max-w-xs" style={{ color:"rgba(154,235,163,0.5)" }}>
              {category === "Favourites"
                ? "Click the heart icon on any event to save it here."
                : "Try adjusting your search or selecting a different category."}
            </p>
            <button
              onClick={() => { setSearch(""); setCategory("All"); }}
              className="mt-6 btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="mt-20 py-10" style={{ borderTop:"1px solid rgba(69,196,176,0.12)" }}>
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
          style={{ color:"rgba(154,235,163,0.4)" }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background:"linear-gradient(135deg,#13678A,#45C4B0)" }}>
              <Radio className="w-3.5 h-3.5 text-ocean-950" style={{ color:"#012030" }} />
            </div>
            <span className="font-display font-semibold" style={{ color:"rgba(154,235,163,0.7)" }}>LiveStream</span>
          </div>
          <p>© 2025 LiveStream Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {["Privacy","Terms","Help"].map((l) => (
              <a key={l} href="#" className="hover:text-white transition" aria-label={l}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Modal ── */}
      {selected && (
        <EventModal
          event={selected}
          onClose={handleClose}
          isSaved={saved.has(selected.id)}
          onToggleSave={toggleSave}
          autoPlay={autoPlay}
        />
      )}
    </div>
  );
}
