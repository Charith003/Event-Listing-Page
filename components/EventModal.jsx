"use client";
import { useEffect, useState } from "react";
import { X, Heart, Share2, CalendarDays, Clock, Users, Star, Zap, Tag, Play, ExternalLink } from "lucide-react";

const categoryStyle = {
  Tech:      { text:"#DAFDBA", border:"rgba(69,196,176,0.4)", bg:"rgba(19,103,138,0.4)" },
  Music:     { text:"#9AEBA3", border:"rgba(154,235,163,0.4)", bg:"rgba(154,235,163,0.15)" },
  Sports:    { text:"#45C4B0", border:"rgba(69,196,176,0.4)", bg:"rgba(69,196,176,0.15)" },
  Business:  { text:"#DAFDBA", border:"rgba(218,253,186,0.35)", bg:"rgba(218,253,186,0.1)" },
  Education: { text:"#9AEBA3", border:"rgba(154,235,163,0.3)", bg:"rgba(19,103,138,0.3)" },
};

export default function EventModal({ event, onClose, isSaved, onToggleSave, autoPlay = false }) {
  const [watching, setWatching] = useState(autoPlay);
  const [shared, setShared] = useState(false);
  const st = categoryStyle[event.category] || categoryStyle.Tech;

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // ESC key close
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleShare = () => {
    setShared(true);
    if (navigator.clipboard) navigator.clipboard.writeText(window.location.href).catch(() => {});
    setTimeout(() => setShared(false), 2000);
  };

  // Star display
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(event.rating));

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background:"rgba(1,32,48,0.85)", backdropFilter:"blur(12px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-2xl max-h-[95vh] overflow-y-auto modal-scroll rounded-t-3xl sm:rounded-3xl animate-modal-in"
        style={{
          background:"linear-gradient(160deg, #0d3347 0%, #012030 60%, #011824 100%)",
          border:"1px solid rgba(69,196,176,0.25)",
          boxShadow:"0 40px 80px rgba(1,32,48,0.8), 0 0 0 1px rgba(69,196,176,0.1)"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle for mobile */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full" style={{ background:"rgba(69,196,176,0.3)" }} />
        </div>

        {/* Media section */}
        <div className="relative">
          {watching ? (
            <div className="aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${event.videoId}?autoplay=1&rel=0`}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                className="w-full h-full"
                title={event.title}
              />
            </div>
          ) : (
            <div className="relative aspect-video overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ background:"rgba(1,32,48,0.55)", backdropFilter:"blur(2px)" }}>
                <button
                  onClick={() => setWatching(true)}
                  aria-label="Play video"
                  className="group/play flex flex-col items-center gap-3 focus:outline-none"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover/play:scale-110 glow-teal"
                    style={{ background:"linear-gradient(135deg,#13678A,#45C4B0)" }}>
                    <Play className="w-8 h-8 text-ocean-950 ml-1" fill="#012030" />
                  </div>
                  <span className="text-white font-semibold text-sm tracking-wide">Watch Now</span>
                </button>
              </div>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus:outline-none"
            style={{ background:"rgba(1,32,48,0.75)", backdropFilter:"blur(8px)", border:"1px solid rgba(69,196,176,0.3)" }}
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col gap-5">
          {/* Header */}
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display font-bold text-white text-xl leading-snug flex-1">
                {event.title}
              </h2>
              <div className="flex items-center gap-1.5 shrink-0">
                {stars.map((filled, i) => (
                  <Star key={i} className="w-4 h-4" style={filled ? { fill:"#DAFDBA", color:"#DAFDBA" } : { color:"rgba(218,253,186,0.25)" }} />
                ))}
                <span className="text-sm font-mono ml-1" style={{ color:"#DAFDBA" }}>{event.rating}</span>
              </div>
            </div>

            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background:st.bg, color:st.text, border:`1px solid ${st.border}` }}>
                {event.category}
              </span>
              {event.isTrending && (
                <span className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background:"rgba(69,196,176,0.15)", color:"#45C4B0", border:"1px solid rgba(69,196,176,0.35)" }}>
                  <Zap className="w-3 h-3" /> Trending
                </span>
              )}
              <span className="flex items-center gap-1 text-xs rounded-full px-3 py-1"
                style={{ background:"rgba(154,235,163,0.1)", color:"#9AEBA3", border:"1px solid rgba(154,235,163,0.2)" }}>
                <Users className="w-3 h-3" /> {event.viewers} viewers
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color:"rgba(154,235,163,0.75)" }}>
            {event.description}
          </p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: CalendarDays, label:"Date", value: event.date },
              { icon: Clock, label:"Time", value: event.time },
              { icon: Clock, label:"Duration", value: event.duration },
              { icon: Users, label:"Registered", value: event.registered.toLocaleString() },
            ].map(({ icon:Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl p-3"
                style={{ background:"rgba(19,103,138,0.2)", border:"1px solid rgba(69,196,176,0.15)" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background:"rgba(69,196,176,0.15)" }}>
                  <Icon className="w-4 h-4 text-ocean-400" style={{ color:"#45C4B0" }} />
                </div>
                <div>
                  <div className="text-xs" style={{ color:"rgba(154,235,163,0.5)" }}>{label}</div>
                  <div className="text-sm font-semibold text-white">{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Host */}
          <div className="flex items-center gap-3 rounded-xl p-3"
            style={{ background:"rgba(19,103,138,0.2)", border:"1px solid rgba(69,196,176,0.15)" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm"
              style={{ background:"linear-gradient(135deg,#13678A,#45C4B0)", color:"#012030" }}>
              {event.host[0]}
            </div>
            <div>
              <div className="text-xs" style={{ color:"rgba(154,235,163,0.5)" }}>Hosted by</div>
              <div className="text-sm font-semibold text-white">{event.host}</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-3.5 h-3.5 shrink-0" style={{ color:"rgba(69,196,176,0.5)" }} />
            {event.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full"
                style={{ background:"rgba(69,196,176,0.1)", color:"rgba(154,235,163,0.8)", border:"1px solid rgba(69,196,176,0.2)" }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-1 border-t" style={{ borderColor:"rgba(69,196,176,0.15)" }}>
            <button
              onClick={() => onToggleSave(event.id)}
              aria-label={isSaved ? "Remove from favourites" : "Save to favourites"}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none"
              style={isSaved
                ? { background:"rgba(154,235,163,0.2)", color:"#9AEBA3", border:"1px solid rgba(154,235,163,0.35)" }
                : { background:"rgba(19,103,138,0.3)", color:"rgba(154,235,163,0.7)", border:"1px solid rgba(69,196,176,0.2)" }
              }
            >
              <Heart className="w-4 h-4" style={isSaved ? { fill:"#9AEBA3" } : {}} />
              {isSaved ? "Saved" : "Save"}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none"
              style={shared
                ? { background:"rgba(69,196,176,0.2)", color:"#45C4B0", border:"1px solid rgba(69,196,176,0.4)" }
                : { background:"rgba(19,103,138,0.3)", color:"rgba(69,196,176,0.7)", border:"1px solid rgba(69,196,176,0.2)" }
              }
            >
              <Share2 className="w-4 h-4" />
              {shared ? "Copied!" : "Share"}
            </button>

            <button
              onClick={() => setWatching(true)}
              aria-label="Watch event"
              className="ml-auto btn-primary flex items-center gap-2"
            >
              <Play className="w-4 h-4" fill="#012030" />
              Watch Live
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
