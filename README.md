# If Love Was a Movie

Interactive React + Tailwind + Framer Motion experience with:
- Landing page + live Valentine countdown (February 14, 2026)
- Prologue envelope reveal
- 5-scene quiz with linear score algorithm
- Personalized movie result poster reveal
- Persistent progress via `localStorage`
- Image fallback handling

## Run

1. Install Node.js (LTS).
2. In this folder:
```bash
npm install
npm run dev
```

## Important Asset Mapping

Movie posters are mapped in `src/App.jsx` inside the `MOVIES` array (`poster` field).

BGM auto-play is also configured there (`audio` field).  
Set each `audio` to your file name (for example: `"audio/96-theme.mp3"`), then place files in project root or update `assetUrl` usage as needed.

## Persisted State

Quiz progress is saved at `localStorage` key:
`if-love-was-a-movie-progress-v1`
