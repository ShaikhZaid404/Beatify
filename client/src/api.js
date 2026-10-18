export const API_BASE = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

export function coverUrl(url) {
  if (!url) return "";
  if (url.startsWith("http") && !url.includes("spotifycdn")) return url;
  return `${API_BASE}/api/cover?u=${encodeURIComponent(url)}`;
}

export function streamUrl(track) {
  const p = new URLSearchParams();
  p.set("id", track.id || "");
  p.set("src", track.source || "youtube");
  if (track.title) p.set("title", track.title);
  if (track.author) p.set("author", track.author);
  if (track.duration) p.set("duration", String(Math.round(track.duration / 1000)));
  return `${API_BASE}/api/stream?${p.toString()}`;
}

export async function apiGet(path) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = new Error("request_failed");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export async function apiPost(path, body) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error("post_failed");
  return res.json();
}

export async function apiDelete(path) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("delete_failed");
  return res.json();
}

export const searchCatalog = (q) => apiGet(`/api/search?q=${encodeURIComponent(q)}`);
export const browseHome = () => apiGet("/api/browse");
export const loadCollection = (url) => apiGet(`/api/collection?url=${encodeURIComponent(url)}`);
export const loadGenres = () => apiGet("/api/genres");
export const loadGenre = (id) => apiGet(`/api/genre?id=${encodeURIComponent(id)}`);
export const loadGenreMeta = (id) => apiGet(`/api/genre-meta?id=${encodeURIComponent(id)}`);

// Playlists API
export const fetchServerPlaylists = () => apiGet("/api/playlists");
export const createServerPlaylist = (name, description = "") => apiPost("/api/playlists", { name, description });
export const fetchServerPlaylist = (id) => apiGet(`/api/playlists/${encodeURIComponent(id)}`);
export const addTrackToServerPlaylist = (playlistId, track) => apiPost(`/api/playlists/${encodeURIComponent(playlistId)}/tracks`, track);
export const removeTrackFromServerPlaylist = (playlistId, trackId) => apiDelete(`/api/playlists/${encodeURIComponent(playlistId)}/tracks/${encodeURIComponent(trackId)}`);
export const deleteServerPlaylist = (playlistId) => apiDelete(`/api/playlists/${encodeURIComponent(playlistId)}`);

// Liked Tracks API
export const fetchServerLiked = () => apiGet("/api/liked");
export const toggleServerLiked = (track) => apiPost("/api/liked", track);

// History API
export const fetchServerHistory = () => apiGet("/api/history");
export const recordServerHistory = (track) => apiPost("/api/history", track);

export async function fetchLyrics(track) {
  const p = new URLSearchParams({
    title: track.title || "",
    artist: track.author || "",
  });
  if (track.album) p.set("album", track.album);
  if (track.duration) p.set("duration", String(Math.round(track.duration / 1000)));
  const res = await fetch(`${API_BASE}/api/lyrics?${p}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("lyrics");
  return res.json();
}

export function prefetch(track) {
  // Optional prefetch stub
}

export function formatTime(msOrSec, isMs = false) {
  let sec = isMs ? Math.floor(msOrSec / 1000) : Math.floor(msOrSec);
  if (!Number.isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function parseLrc(text) {
  if (!text) return [];
  const lines = [];
  for (const raw of text.split("\n")) {
    const matches = [...raw.matchAll(/\[(\d+):(\d+(?:\.\d+)?)\]/g)];
    if (!matches.length) continue;
    const content = raw.replace(/\[\d+:\d+(?:\.\d+)?\]/g, "").trim();
    for (const m of matches) {
      lines.push({ t: Number(m[1]) * 60 + Number(m[2]), text: content });
    }
  }
  lines.sort((a, b) => a.t - b.t);
  return lines;
}

export function trackKey(t) {
  return `${t.source || ""}:${t.id || t.title}`;
}
