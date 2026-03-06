const path = require("path");
const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const apiWeather = require("./api/weather");
const apiForecast = require("./api/forecast");
const apiAirPollution = require("./api/air_pollution");
const apiGeoDirect = require("./api/geo/direct");
const apiUvMoon = require("./api/uv_moon");
const apiHealth = require("./api/health");

if (!process.env.OPENWEATHER_API_KEY) {
  console.warn("[server] OPENWEATHER_API_KEY is not set in .env");
}

app.use(express.static(path.join(__dirname)));

// Keep local Express routes aligned with Vercel serverless handlers.
app.get("/api/weather", apiWeather);
app.get("/api/forecast", apiForecast);
app.get("/api/air_pollution", apiAirPollution);
app.get("/api/geo/direct", apiGeoDirect);
app.get("/api/uv_moon", apiUvMoon);
app.get("/api/health", apiHealth);

app.listen(PORT, () => {
  console.log(`[server] running on http://localhost:${PORT}`);
});
