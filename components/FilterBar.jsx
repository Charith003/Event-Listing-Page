"use client";
import { Zap, Heart } from "lucide-react";

export default function FilterBar({ category, onCategory, categories, totalCount }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-hide">
        {categories.map((c) => {
          const active = category === c;
          const isTrending = c === "Trending";
          const isFavs = c === "Favourites";
          return (
            <button
              key={c}
              onClick={() => onCategory(c)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ocean-400/40
                ${active
                  ? isFavs
                    ? "text-ocean-950 border-transparent shadow-lg"
                    : isTrending
                      ? "text-ocean-950 border-transparent shadow-lg"
                      : "text-ocean-950 border-transparent shadow-lg"
                  : "text-ocean-400/80 hover:text-white hover:border-ocean-400/50"}`}
              style={active
                ? isFavs
                  ? { background:"linear-gradient(135deg,#9AEBA3,#DAFDBA)", boxShadow:"0 4px 14px rgba(154,235,163,0.35)" }
                  : isTrending
                    ? { background:"linear-gradient(135deg,#45C4B0,#9AEBA3)", boxShadow:"0 4px 14px rgba(69,196,176,0.35)" }
                    : { background:"linear-gradient(135deg,#13678A,#45C4B0)", boxShadow:"0 4px 14px rgba(69,196,176,0.3)" }
                : { background:"rgba(19,103,138,0.18)", border:"1px solid rgba(69,196,176,0.2)" }
              }
            >
              {isFavs && <Heart className="w-3.5 h-3.5" />}
              {isTrending && <Zap className="w-3.5 h-3.5" />}
              {c}
            </button>
          );
        })}
      </div>
      <span className="text-ocean-400/60 text-sm shrink-0 font-mono">
        {totalCount} event{totalCount !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
