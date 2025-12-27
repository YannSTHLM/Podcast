# Yann's Podcast Library

A single-page web app that bundles Yann's favourite macro and investing shows into an offline-friendly experience. The player ships with a pre-curated catalogue, local waveform previews, search and filtering, and OPML import/export tooling for sharing the feed list.

## ✨ Highlights

- **Full library baked in** – `data/podcasts.json` contains nine podcasts and 50+ recent episodes ready to browse instantly. No remote RSS fetches means zero CORS surprises on GitHub Pages.
- **Smart filtering** – Narrow results by show or use the live search box to match episode titles and summaries.
- **Resilient playback** – HTML5 audio player with automatic fallback tone when an enclosure is missing, plus one-click downloads that use the File System Access API when available.
- **Standards friendly** – Export the active feed list as an OPML file or import third-party OPML snapshots to review new shows you may want to add to the local dataset.

## 🗂 Project Structure

```
index.html           # Main application
podcast.html         # Legacy redirect for old bookmarks
assets/audio/        # Embedded preview audio (5 waveforms reused across episodes)
data/podcasts.json   # Curated feed + episode metadata
README.md            # This guide
```

## 🚀 Getting Started

1. Start a local server (required for fetching the JSON catalogue):
   ```bash
   python3 -m http.server 8080
   ```
2. Open the app at [http://localhost:8080/index.html](http://localhost:8080/index.html).
3. Use the search box or show filter to browse episodes, then click **Play**.
4. Hit **Download** to save the audio locally – the app auto-selects the safest filename.

## 🛠 Customising the Library

- Edit `data/podcasts.json` to add, remove, or reorder podcasts and episodes. Each episode supports `id`, `title`, `summary`, `pubDate`, `duration`, and `audioUrl`.
- Add more preview tones by dropping `.wav` or `.mp3` files into `assets/audio/` and pointing episodes to them.
- Update the `feedUrl` field for each podcast so exported OPML files include the correct RSS endpoints.

## 🔄 OPML Support

- **Export** – Click **Export OPML** to download a snapshot of every podcast listed in `data/podcasts.json`.
- **Import** – Click **Import OPML** and choose an OPML/XML file; the app will confirm how many feed URLs were detected so you can merge them into the JSON library.

## 🎧 Playback & Download Notes

- The player calls `audio.play()` and gracefully handles autoplay restrictions (Safari, Chrome) by showing a banner if the browser blocks playback.
- When an audio file fails to load, the app switches to a short in-app tone and suggests trying another episode.
- Downloads use the File System Access API on Chromium browsers; all others fall back to a standard `Blob` download.

## 📱 Responsive & Accessible

- Layout adapts from desktop to small screens with fully touch-friendly controls.
- Status banners announce filter actions, downloads, and errors using `aria-live` so screen readers stay informed.

## ✅ Local Smoke Test

```
python3 -m http.server 8080
open http://localhost:8080/index.html
```

No additional build step is required – everything runs in the browser.
