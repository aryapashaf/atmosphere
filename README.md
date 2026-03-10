# Atmosphere

Weather-focused single-page app with a full-screen hero video and scroll-driven video playback. The UI includes search, unit toggle, locale selection, current conditions, comparisons, and supporting panels.

## Features
- Full-screen hero video (edge-to-edge)
- Scroll-driven video playback (locks scroll until video ends)
- City search with suggestions
- Metric/imperial unit toggle
- Locale selection
- Current weather, forecast, AQI, UV, alerts, and more

## Setup
1. Install dependencies
   - `npm install`
2. Configure environment
   - Create `.env` based on your API keys (see `.env.example` if present)
3. Run locally
   - `npm start`

## Notes
- The hero video source is in `assets/city.mp4`.
- Scroll interaction advances/rewinds the hero video in 1-second steps.

## License
MIT
