# 🎬 LiveStream v2 — Live Event Streaming Platform

Built with **Next.js 14 + Tailwind CSS**. Ocean-teal dark theme.

## 🚀 Quick Start

```bash
npm install
npm run dev
# → http://localhost:3000
```

## ✨ New in v2

| Feature | Detail |
|---|---|
| **Event Detail Modal** | Click any card → full-screen popup with description, meta, tags, host |
| **Embedded Video Player** | Click "Watch" / play button → YouTube embed auto-loads |
| **Favourites Tab** | Save events with ♥ → "Favourites" filter shows saved events |
| **Star Ratings** | Per-event rating displayed in card + modal |
| **Registered Count** | Attendance figures shown in modal meta grid |
| **Tag chips** | Searchable topic tags in modal |
| **Share → Clipboard** | Share button copies URL + shows "Copied!" flash |
| **Mobile bottom sheet** | Modal slides up from bottom on mobile |
| **ESC to close** | Keyboard-accessible modal |
| **Ocean palette** | `#012030` · `#13678A` · `#45C4B0` · `#9AEBA3` · `#DAFDBA` |

## 📁 Structure

```
app/
  globals.css     ← Ocean palette CSS vars + utilities
  layout.jsx      ← SEO metadata
  page.jsx        ← Main page, all state
components/
  Navbar.jsx
  FilterBar.jsx
  EventCard.jsx   ← click → modal, save toggle
  EventModal.jsx  ← detail popup + video embed
data/
  events.js       ← 15 events with videoId, tags, rating, description
```

## 🎨 Palette

| Swatch | Hex | Usage |
|---|---|---|
| Deep Navy | `#012030` | Background |
| Teal Blue | `#13678A` | Cards, glass |
| Aqua | `#45C4B0` | Primary accent, CTAs |
| Mint Green | `#9AEBA3` | Secondary, save/heart |
| Lime | `#DAFDBA` | Highlights, badges |
