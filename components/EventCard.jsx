"use client";
import { useState } from "react";
import { Heart, Share2, Eye, CalendarDays, Clock, Zap, Star, Users } from "lucide-react";

const categoryStyle = {
  Tech:      { bg:"rgba(19,103,138,0.5)",  text:"#DAFDBA", border:"rgba(69,196,176,0.4)" },
  Music:     { bg:"rgba(154,235,163,0.2)", text:"#9AEBA3", border:"rgba(154,235,163,0.4)" },
  Sports:    { bg:"rgba(69,196,176,0.2)",  text:"#45C4B0", border:"rgba(69,196,176,0.4)" },
  Business:  { bg:"rgba(218,253,186,0.15)",text:"#DAFDBA", border:"rgba(218,253,186,0.35)" },
  Education: { bg:"rgba(19,103,138,0.35)", text:"#9AEBA3", border:"rgba(154,235,163,0.3)" },
};

export default function EventCard({ event, onOpen, isSaved, onToggleSave }) {
  const [shared, setShared] = useState(false);
  const st = categoryStyle[event.category] || categoryStyle.Tech;

  const handleShare = (e) => {
    e.stopPropagation();
    setShared(true);
    setTimeout(() => setShared(false), 1500);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    onToggleSave(event.id);
  };

  return (
    <article
      className="group relative flex flex-col rounded-2xl overflow-hidden card-hover cursor-pointer"
      style={{ background:"rgba(19,103,138,0.12)", border:"1px solid rgba(69,196,176,0.18)" }}
      onClick={() => onOpen(event)}
      tabIndex={0}
      role="button"
      aria-label={`Open details for ${event.title}`}
      onKeyDown={(e) => e.key === "Enter" && onOpen(event)}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <img
          src={event.image}
          alt={`${event.title} banner`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/90 via-ocean-950/20 to-transparent" />

        {/* Play hint on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background:"rgba(69,196,176,0.85)", backdropFilter:"blur(4px)" }}>
            <svg className="w-6 h-6 text-ocean-950 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm"
            style={{ background:st.bg, color:st.text, border:`1px solid ${st.border}` }}>
            {event.category}
          </span>
          {event.isTrending && (
            <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm"
              style={{ background:"rgba(69,196,176,0.25)", color:"#45C4B0", border:"1px solid rgba(69,196,176,0.4)" }}>
              <Zap className="w-3 h-3" /> Hot
            </span>
          )}
        </div>

        {/* Viewers */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full px-2.5 py-1"
          style={{ background:"rgba(1,32,48,0.65)", backdropFilter:"blur(8px)", border:"1px solid rgba(69,196,176,0.2)" }}>
          <Users className="w-3 h-3 text-ocean-200" />
          <span className="text-white text-xs font-mono">{event.viewers}</span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full px-2.5 py-1"
          style={{ background:"rgba(1,32,48,0.65)", backdropFilter:"blur(8px)", border:"1px solid rgba(69,196,176,0.2)" }}>
          <Star className="w-3 h-3 text-ocean-50 fill-ocean-50" style={{fill:"#DAFDBA",color:"#DAFDBA"}} />
          <span className="text-white text-xs font-mono">{event.rating}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="font-display font-semibold text-white text-sm leading-snug line-clamp-2 group-hover:text-ocean-200 transition-colors">
          {event.title}
        </h3>

        <div className="flex flex-col gap-1 text-xs" style={{ color:"rgba(154,235,163,0.6)" }}>
          <div className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 shrink-0 text-ocean-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0 text-ocean-400" />
            <span>{event.time}</span>
            <span className="mx-1 opacity-40">·</span>
            <span>{event.duration}</span>
          </div>
        </div>

        <p className="text-xs" style={{ color:"rgba(154,235,163,0.45)" }}>
          By <span style={{ color:"rgba(154,235,163,0.75)" }}>{event.host}</span>
        </p>

        <div className="h-px mt-auto" style={{ background:"rgba(69,196,176,0.15)" }} />

        {/* Actions */}
        <div className="flex items-center gap-2 pt-0.5">
          {/* Save/Heart */}
          <button
            onClick={handleSave}
            aria-label={isSaved ? "Remove from favourites" : "Save to favourites"}
            className="p-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2"
            style={isSaved
              ? { background:"rgba(154,235,163,0.15)", color:"#9AEBA3", focusRingColor:"rgba(154,235,163,0.4)" }
              : { background:"rgba(19,103,138,0.3)", color:"rgba(69,196,176,0.6)" }
            }
          >
            <Heart
              className="w-4 h-4 transition-all duration-200"
              style={isSaved ? { fill:"#9AEBA3", transform:"scale(1.15)" } : {}}
            />
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            aria-label="Share event"
            className="p-2 rounded-xl transition-all duration-200 focus:outline-none"
            style={shared
              ? { background:"rgba(69,196,176,0.2)", color:"#45C4B0" }
              : { background:"rgba(19,103,138,0.3)", color:"rgba(69,196,176,0.6)" }
            }
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Watch button */}
          <button
            onClick={(e) => { e.stopPropagation(); onOpen(event, true); }}
            aria-label="Watch event"
            className="ml-auto btn-primary flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            Watch
          </button>
        </div>
      </div>
    </article>
  );
}
