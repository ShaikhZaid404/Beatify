# 🎵 Beatify

A sleek, minimalist, dark-mode web music streaming application with server-synced custom playlists, Spotify link resolver, synced lyrics, and lockscreen playback controls.

---

## ✨ Features

- 🎧 **Sleek Monochrome Aesthetic:** Pure dark-mode interface with zero CSS bloat.
- 🔗 **Universal Link Importer:** Paste Spotify tracks, albums, or playlists directly into the search bar.
- 📁 **Custom Playlists:** Create, view, play, and delete personal playlists synced with your Node.js backend.
- 💖 **Server-Synced Liked Songs & History:** Real-time persistence across devices.
- 🎙️ **Synchronized Lyrics:** Live, dynamic lyrics powered by LRCLIB.
- 📱 **Lockscreen / Media Session API:** Native play/pause/skip and artwork notifications on mobile and desktop.
- 📥 **Direct MP3 Download:** One-click audio download from any track's 3-dot context menu.

---

## 🚀 Deployment

### Deploying Frontend to Vercel

1. Import this repository into [Vercel](https://vercel.com).
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `client/www`
5. Add Environment Variable:
   - `VITE_API_URL` = `http://uk-02.rrhosting.eu:7919` (or your backend server address)
6. Click **Deploy**!

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run Vite dev server
npm run dev

# Production Build
npm run build
```

---

## 📜 Credits

Based on the original Monochrome player UI by [Ayle](https://github.com/ayliee/Monochrome). Enhanced into **Beatify** by Shaikh Zaid.
