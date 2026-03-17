const DEG = "°";
const API_BASE = "/api";
const UI = {
  topbar: document.querySelector(".topbar"),
  city: document.getElementById("city"),
  temp: document.getElementById("temp"),
  desc: document.getElementById("desc"),
  status: document.getElementById("status"),
  cardTemp: document.getElementById("cardTemp"),
  cardCity: document.getElementById("cardCity"),
  date: document.getElementById("date"),
  localTime: document.getElementById("localTime"),
  condition: document.getElementById("condition"),
  feels: document.getElementById("feels"),
  humidity: document.getElementById("humidity"),
  wind: document.getElementById("wind"),
  pressure: document.getElementById("pressure"),
  visibility: document.getElementById("visibility"),
  currentIcon: document.getElementById("currentIcon"),
  forecast: document.getElementById("forecast"),
  hourly: document.getElementById("hourly"),
  searchInput: document.getElementById("searchInput"),
  searchForm: document.getElementById("searchForm"),
  suggestions: document.getElementById("suggestions"),
  unitC: document.getElementById("unitC"),
  unitF: document.getElementById("unitF"),
  localeSelect: document.getElementById("localeSelect"),
  aqi: document.getElementById("aqi"),
  uv: document.getElementById("uv"),
  sunrise: document.getElementById("sunrise"),
  sunset: document.getElementById("sunset"),
  moonPhase: document.getElementById("moonPhase"),
  heatIndex: document.getElementById("heatIndex"),
  windChill: document.getElementById("windChill"),
  discomfort: document.getElementById("discomfort"),
  activities: document.getElementById("activities"),
  alerts: document.getElementById("alerts"),
  compareForm: document.getElementById("compareForm"),
  compareInput: document.getElementById("compareInput"),
  compareResult: document.getElementById("compareResult"),
  mapLayer: document.getElementById("mapLayer"),
  weatherMap: document.getElementById("weatherMap"),
  favorites: document.getElementById("favorites"),
  history: document.getElementById("history"),
  saveFavorite: document.getElementById("saveFavorite"),
  enableNotify: document.getElementById("enableNotify"),
  toggleDaily: document.getElementById("toggleDaily"),
  trendChart: document.getElementById("trendChart"),
  heroVideo: document.getElementById("heroVideo"),
  rain: document.querySelector(".rain"),
  flash: document.querySelector(".flash"),
  cloudLoader: document.getElementById("cloudLoader")
};

const STATE = {
  units: "metric",
  locale: "auto",
  currentCity: "Jakarta",
  coords: null,
  weather: null,
  forecast: null,
  lastCompareCity: null,
  favorites: JSON.parse(localStorage.getItem("atm_favorites") || "[]"),
  history: JSON.parse(localStorage.getItem("atm_history") || "[]"),
  dailyNotify: localStorage.getItem("atm_daily_notify") === "1",
  searchDebounce: null,
  localClockTimer: null,
  localTimezoneOffset: 0
};

const LOADING = {
  pending: 0,
  showTimer: null,
  hideTimer: null,
  shownAt: 0
};

const TRANSLATIONS = {
  en: {
    "hero.current_weather": "Current Weather",
    "status.detecting_location": "Detecting location...",
    "status.loading": "Loading...",
    "status.no_items": "No items yet.",
    "status.no_comparison": "No comparison yet.",
    "status.location_denied_default": "Location denied. Showing default city.",
    "status.loading_weather": "Loading weather...",
    "status.loading_slow": "Loading weather data...",
    "status.could_not_load": "Could not load weather data.",
    "status.updated_for": "Updated for {city}.",
    "status.failed": "Failed: {message}",
    "status.notification_permission": "Notification permission: {permission}",
    "status.browser_no_notification": "Browser does not support notifications.",
    "label.feels_like": "Feels like",
    "label.humidity": "Humidity",
    "label.wind": "Wind",
    "label.pressure": "Pressure",
    "label.visibility": "Visibility",
    "label.local_time": "Local time",
    "label.aqi": "AQI",
    "label.uv_index": "UV Index",
    "label.sunrise": "Sunrise",
    "label.sunset": "Sunset",
    "label.moon_phase": "Moon phase",
    "label.heat_index": "Heat index",
    "label.wind_chill": "Wind chill",
    "label.discomfort": "Discomfort",
    "label.layer": "Layer",
    "panel.weather_alerts": "Weather Alerts",
    "panel.air_uv": "Air & UV",
    "panel.sun_moon": "Sun & Moon",
    "panel.comfort": "Comfort",
    "panel.activity_tips": "Activity Tips",
    "panel.hourly_forecast_24h": "Hourly Forecast (24h)",
    "panel.five_day_forecast": "5-Day Forecast",
    "panel.temperature_trend": "Temperature Trend",
    "panel.compare_cities": "Compare Cities",
    "panel.radar_map": "Radar Map",
    "panel.saved_cities": "Saved Cities",
    "panel.recent_searches": "Recent Searches",
    "panel.pwa_notifications": "PWA & Notifications",
    "button.compare": "Compare",
    "button.save_current_city": "Save current city",
    "button.remove_city": "Remove {city}",
    "button.enable_notifications": "Enable notifications",
    "button.daily_reminder": "Daily reminder: {state}",
    "button.daily_on": "On",
    "button.daily_off": "Off",
    "placeholder.search_city": "Search city...",
    "placeholder.compare_city": "Compare with city...",
    "hint.install_pwa": "Install this app from browser menu for app-like experience and offline shell.",
    "layer.rain": "Rain",
    "layer.clouds": "Clouds",
    "layer.wind": "Wind",
    "locale.auto": "Auto",
    "locale.en_us": "English (US)",
    "locale.id_id": "Indonesia",
    "alerts.thunder_now": "Thunderstorm currently active.",
    "alerts.rain_expected": "Rain expected. Carry umbrella.",
    "alerts.high_heat": "High heat. Stay hydrated.",
    "alerts.severe_24h": "Potential severe weather in next 24h.",
    "alerts.none": "No severe weather detected for now.",
    "error.network": "Network error",
    "error.api_request_failed": "API request failed",
    "aqi.label_1": "Good",
    "aqi.label_2": "Fair",
    "aqi.label_3": "Moderate",
    "aqi.label_4": "Poor",
    "aqi.label_5": "Very Poor",
    "moon.new": "New Moon",
    "moon.waxing_crescent": "Waxing Crescent",
    "moon.first_quarter": "First Quarter",
    "moon.waxing_gibbous": "Waxing Gibbous",
    "moon.full": "Full Moon",
    "moon.waning_gibbous": "Waning Gibbous",
    "moon.last_quarter": "Last Quarter",
    "moon.waning_crescent": "Waning Crescent",
    "comfort.comfortable": "Comfortable",
    "comfort.bit_humid": "A bit humid",
    "comfort.very_humid": "Very humid / uncomfortable",
    "activity.run_bad": "Outdoor run: Not ideal due to rain.",
    "activity.run_good": "Outdoor run: Good conditions.",
    "activity.uv_high": "UV is high. Use sunscreen and hat.",
    "activity.uv_ok": "UV level is manageable for short trips.",
    "activity.hot": "Hydrate frequently in hot weather.",
    "activity.normal": "Good day for commuting and walking.",
    "activity.laundry_slow": "Laundry drying may be slower.",
    "activity.laundry_ok": "Laundry drying conditions look okay.",
    "day.today": "Today",
    "compare.result": "{city}: {temp} ({diff}{deg} vs {base}), wind diff {windDiff}.",
    "compare.error": "Compare failed: {message}",
    "notify.title": "Weather in {city}"
  },
  id: {
    "hero.current_weather": "Cuaca Saat Ini",
    "status.detecting_location": "Mendeteksi lokasi...",
    "status.loading": "Memuat...",
    "status.no_items": "Belum ada data.",
    "status.no_comparison": "Belum ada perbandingan.",
    "status.location_denied_default": "Izin lokasi ditolak. Menampilkan kota default.",
    "status.loading_weather": "Memuat data cuaca...",
    "status.loading_slow": "Sedang memuat data cuaca...",
    "status.could_not_load": "Data cuaca tidak dapat dimuat.",
    "status.updated_for": "Diperbarui untuk {city}.",
    "status.failed": "Gagal: {message}",
    "status.notification_permission": "Izin notifikasi: {permission}",
    "status.browser_no_notification": "Browser tidak mendukung notifikasi.",
    "label.feels_like": "Terasa seperti",
    "label.humidity": "Kelembapan",
    "label.wind": "Angin",
    "label.pressure": "Tekanan",
    "label.visibility": "Jarak pandang",
    "label.local_time": "Waktu setempat",
    "label.aqi": "AQI",
    "label.uv_index": "Indeks UV",
    "label.sunrise": "Matahari terbit",
    "label.sunset": "Matahari terbenam",
    "label.moon_phase": "Fase bulan",
    "label.heat_index": "Indeks panas",
    "label.wind_chill": "Wind chill",
    "label.discomfort": "Kenyamanan",
    "label.layer": "Layer",
    "panel.weather_alerts": "Peringatan Cuaca",
    "panel.air_uv": "Udara & UV",
    "panel.sun_moon": "Matahari & Bulan",
    "panel.comfort": "Kenyamanan",
    "panel.activity_tips": "Saran Aktivitas",
    "panel.hourly_forecast_24h": "Prakiraan Per Jam (24j)",
    "panel.five_day_forecast": "Prakiraan 5 Hari",
    "panel.temperature_trend": "Tren Suhu",
    "panel.compare_cities": "Bandingkan Kota",
    "panel.radar_map": "Peta Radar",
    "panel.saved_cities": "Kota Tersimpan",
    "panel.recent_searches": "Pencarian Terakhir",
    "panel.pwa_notifications": "PWA & Notifikasi",
    "button.compare": "Bandingkan",
    "button.save_current_city": "Simpan kota saat ini",
    "button.remove_city": "Hapus {city}",
    "button.enable_notifications": "Aktifkan notifikasi",
    "button.daily_reminder": "Pengingat harian: {state}",
    "button.daily_on": "Aktif",
    "button.daily_off": "Nonaktif",
    "placeholder.search_city": "Cari kota...",
    "placeholder.compare_city": "Bandingkan dengan kota...",
    "hint.install_pwa": "Install app ini dari menu browser untuk pengalaman seperti aplikasi dan mode offline.",
    "layer.rain": "Hujan",
    "layer.clouds": "Awan",
    "layer.wind": "Angin",
    "locale.auto": "Otomatis",
    "locale.en_us": "Inggris (US)",
    "locale.id_id": "Indonesia",
    "alerts.thunder_now": "Badai petir sedang terjadi.",
    "alerts.rain_expected": "Diperkirakan hujan. Siapkan payung.",
    "alerts.high_heat": "Suhu tinggi. Tetap terhidrasi.",
    "alerts.severe_24h": "Potensi cuaca ekstrem dalam 24 jam ke depan.",
    "alerts.none": "Belum ada cuaca ekstrem terdeteksi.",
    "error.network": "Kesalahan jaringan",
    "error.api_request_failed": "Permintaan API gagal",
    "aqi.label_1": "Baik",
    "aqi.label_2": "Cukup",
    "aqi.label_3": "Sedang",
    "aqi.label_4": "Buruk",
    "aqi.label_5": "Sangat Buruk",
    "moon.new": "Bulan Baru",
    "moon.waxing_crescent": "Sabit Muda",
    "moon.first_quarter": "Perbani Awal",
    "moon.waxing_gibbous": "Cembung Awal",
    "moon.full": "Purnama",
    "moon.waning_gibbous": "Cembung Akhir",
    "moon.last_quarter": "Perbani Akhir",
    "moon.waning_crescent": "Sabit Tua",
    "comfort.comfortable": "Nyaman",
    "comfort.bit_humid": "Sedikit lembap",
    "comfort.very_humid": "Sangat lembap / tidak nyaman",
    "activity.run_bad": "Lari outdoor: kurang ideal karena hujan.",
    "activity.run_good": "Lari outdoor: kondisi cukup baik.",
    "activity.uv_high": "UV tinggi. Gunakan sunscreen dan topi.",
    "activity.uv_ok": "UV masih aman untuk aktivitas singkat.",
    "activity.hot": "Banyak minum saat cuaca panas.",
    "activity.normal": "Hari yang baik untuk komuter dan berjalan kaki.",
    "activity.laundry_slow": "Pakaian mungkin lebih lama kering.",
    "activity.laundry_ok": "Kondisi pengeringan pakaian cukup baik.",
    "day.today": "Hari ini",
    "compare.result": "{city}: {temp} ({diff}{deg} vs {base}), selisih angin {windDiff}.",
    "compare.error": "Gagal membandingkan: {message}",
    "notify.title": "Cuaca di {city}"
  }
};

class WeatherApiError extends Error {
  constructor(message, details = {}) {
    super(message);
    this.name = "WeatherApiError";
    this.details = details;
  }
}

function status(message, isError = false) {
  UI.status.textContent = message;
  UI.status.style.color = isError ? "#ffb4b4" : "rgba(224, 233, 255, 0.76)";
}

function ensureCloudLoader() {
  if (UI.cloudLoader) return;
  const el = document.createElement("div");
  el.id = "cloudLoader";
  el.className = "cloud-loader";
  el.setAttribute("aria-live", "polite");
  el.setAttribute("aria-busy", "true");
  el.innerHTML = `
    <div class="cloud-outline-wrap" aria-hidden="true">
      <svg class="cloud-outline-svg" viewBox="0 0 150 90" role="presentation">
        <path d="M20 48 C20 36 30 28 42 30 C47 20 58 14 70 18 C80 10 96 12 104 24 C118 23 130 33 130 46 C130 58 120 66 106 66 H40 C28 66 20 58 20 48 Z"></path>
      </svg>
      <span class="cloud-orbit-dot"></span>
    </div>
    <p data-i18n="status.loading_slow">${t("status.loading_slow")}</p>
  `;
  document.body.appendChild(el);
  UI.cloudLoader = el;
}

function startCloudLoader() {
  ensureCloudLoader();
  if (!UI.cloudLoader) return;
  LOADING.pending += 1;
  if (LOADING.pending > 1) return;

  clearTimeout(LOADING.hideTimer);
  clearTimeout(LOADING.showTimer);
  const showDelay = 0;

  LOADING.showTimer = setTimeout(() => {
    LOADING.shownAt = Date.now();
    UI.cloudLoader.classList.add("show");
  }, showDelay);
}

function stopCloudLoader() {
  if (!UI.cloudLoader) return;
  LOADING.pending = Math.max(0, LOADING.pending - 1);
  if (LOADING.pending > 0) return;

  clearTimeout(LOADING.showTimer);

  if (!UI.cloudLoader.classList.contains("show")) return;
  const elapsed = Date.now() - LOADING.shownAt;
  const hasRenderedData = Boolean(
    STATE.weather &&
      UI.cardCity &&
      UI.cardCity.textContent &&
      UI.cardCity.textContent.trim() &&
      UI.cardCity.textContent.trim() !== "--"
  );
  const minVisible = hasRenderedData ? 320 : 1800;
  const wait = Math.max(0, minVisible - elapsed);

  clearTimeout(LOADING.hideTimer);
  LOADING.hideTimer = setTimeout(() => {
    UI.cloudLoader.classList.remove("show");
  }, wait);
}

function uiLang() {
  const locale = activeLocale().toLowerCase();
  return locale.startsWith("id") ? "id" : "en";
}

function weatherLang() {
  return uiLang();
}

function t(key, vars = {}) {
  const lang = uiLang();
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const template = dict[key] || TRANSLATIONS.en[key] || key;
  return template.replace(/\{(\w+)\}/g, (_, token) => (vars[token] !== undefined ? String(vars[token]) : ""));
}

function applyI18nToDom() {
  document.documentElement.lang = uiLang() === "id" ? "id" : "en";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key));
  });

  if (!STATE.weather) {
    UI.city.textContent = t("status.detecting_location");
    UI.desc.textContent = t("status.loading");
  }

  setCustomSelectValue(UI.localeSelect, getCustomSelectValue(UI.localeSelect) || "auto");
  setCustomSelectValue(UI.mapLayer, getCustomSelectValue(UI.mapLayer) || "rain");
}

function refreshDailyToggleText() {
  UI.toggleDaily.textContent = t("button.daily_reminder", {
    state: STATE.dailyNotify ? t("button.daily_on") : t("button.daily_off")
  });
}

function getCustomSelectValue(root) {
  if (!root) return "";
  if (root.dataset.value) return root.dataset.value;
  const selected = root.querySelector(".custom-select-option.selected");
  return selected ? selected.getAttribute("data-value") : "";
}

function setCustomSelectValue(root, value) {
  if (!root) return;
  const options = root.querySelectorAll(".custom-select-option");
  let selectedOption = null;

  options.forEach((opt) => {
    const isSelected = opt.getAttribute("data-value") === value;
    opt.classList.toggle("selected", isSelected);
    if (isSelected) selectedOption = opt;
  });

  if (!selectedOption && options.length) {
    selectedOption = options[0];
    selectedOption.classList.add("selected");
    value = selectedOption.getAttribute("data-value");
  }

  root.dataset.value = value || "";
  const trigger = root.querySelector(".custom-select-trigger");
  if (trigger && selectedOption) {
    trigger.textContent = selectedOption.textContent.trim();
  }
}

function closeAllCustomSelects() {
  document.querySelectorAll(".custom-select.open").forEach((el) => el.classList.remove("open"));
}

function initCustomSelect(root, onChange) {
  if (!root) return;
  const trigger = root.querySelector(".custom-select-trigger");
  const options = root.querySelectorAll(".custom-select-option");
  const initialValue = getCustomSelectValue(root);
  setCustomSelectValue(root, initialValue);

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const willOpen = !root.classList.contains("open");
    closeAllCustomSelects();
    root.classList.toggle("open", willOpen);
  });

  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      const newValue = opt.getAttribute("data-value");
      const oldValue = getCustomSelectValue(root);
      setCustomSelectValue(root, newValue);
      root.classList.remove("open");
      if (onChange && newValue !== oldValue) onChange(newValue);
    });
  });
}

function setSuggestionsOpen(isOpen) {
  UI.suggestions.classList.toggle("show", isOpen);
  UI.topbar.classList.toggle("suggestions-open", isOpen);
}

function unitLabel() {
  return STATE.units === "metric" ? "C" : "F";
}

function temp(value) {
  return `${Math.round(value)}${DEG}`;
}

function windText(speed) {
  if (STATE.units === "metric") return `${(speed * 3.6).toFixed(1)} km/h`;
  return `${speed.toFixed(1)} mph`;
}

function visText(meters) {
  if (typeof meters !== "number") return "--";
  return STATE.units === "metric" ? `${(meters / 1000).toFixed(1)} km` : `${(meters / 1609).toFixed(1)} mi`;
}

function weatherIconUrl(code) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

function moonPhaseLabel(value) {
  if (value === 0 || value === 1) return t("moon.new");
  if (value < 0.25) return t("moon.waxing_crescent");
  if (value === 0.25) return t("moon.first_quarter");
  if (value < 0.5) return t("moon.waxing_gibbous");
  if (value === 0.5) return t("moon.full");
  if (value < 0.75) return t("moon.waning_gibbous");
  if (value === 0.75) return t("moon.last_quarter");
  return t("moon.waning_crescent");
}

function formatDate(ts, mode = "date", timezoneOffset = null) {
  const locale = STATE.locale === "auto" ? navigator.language : STATE.locale;
  const hasTimezone = typeof timezoneOffset === "number";
  const d = new Date((hasTimezone ? ts + timezoneOffset : ts) * 1000);
  const common = hasTimezone ? { timeZone: "UTC" } : {};
  if (mode === "time") {
    return d.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", ...common });
  }
  return d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric", ...common });
}

function formatUtcOffset(offsetSeconds) {
  const totalMinutes = Math.floor(Math.abs(Number(offsetSeconds || 0)) / 60);
  const sign = Number(offsetSeconds || 0) >= 0 ? "+" : "-";
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const minutes = String(totalMinutes % 60).padStart(2, "0");
  return `UTC${sign}${hours}:${minutes}`;
}

function renderLocalTime() {
  if (!UI.localTime) return;
  const nowUtc = Math.floor(Date.now() / 1000);
  const timeText = formatDate(nowUtc, "time", STATE.localTimezoneOffset);
  UI.localTime.textContent = `${t("label.local_time")}: ${timeText} (${formatUtcOffset(STATE.localTimezoneOffset)})`;
}

function startLocalClock(timezoneOffset) {
  STATE.localTimezoneOffset = Number(timezoneOffset || 0);
  if (STATE.localClockTimer) clearInterval(STATE.localClockTimer);
  renderLocalTime();
  STATE.localClockTimer = setInterval(renderLocalTime, 30000);
}

function activeLocale() {
  return STATE.locale === "auto" ? navigator.language : STATE.locale;
}

function updateUnitButtons() {
  UI.unitC.classList.toggle("active", STATE.units === "metric");
  UI.unitF.classList.toggle("active", STATE.units === "imperial");
}

function saveLists() {
  localStorage.setItem("atm_favorites", JSON.stringify(STATE.favorites));
  localStorage.setItem("atm_history", JSON.stringify(STATE.history));
}

function pushHistory(city) {
  STATE.history = [city, ...STATE.history.filter((c) => c.toLowerCase() !== city.toLowerCase())].slice(0, 10);
  saveLists();
  renderHistory();
}

function renderTagList(el, list, clickHandler, removeHandler = null) {
  el.innerHTML = "";
  if (!list.length) {
    el.innerHTML = `<span class="hint">${t("status.no_items")}</span>`;
    return;
  }
  list.forEach((name) => {
    const wrap = document.createElement("div");
    wrap.className = "tag-item";

    const b = document.createElement("button");
    b.type = "button";
    b.className = "tag";
    b.textContent = name;
    b.addEventListener("click", () => clickHandler(name));
    wrap.appendChild(b);

    if (removeHandler) {
      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "tag-remove";
      removeBtn.textContent = "×";
      removeBtn.setAttribute("aria-label", t("button.remove_city", { city: name }));
      removeBtn.title = t("button.remove_city", { city: name });
      removeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        removeHandler(name);
      });
      wrap.appendChild(removeBtn);
    }

    el.appendChild(wrap);
  });
}

function renderFavorites() {
  renderTagList(
    UI.favorites,
    STATE.favorites,
    (city) => loadByCity(city),
    (city) => {
      STATE.favorites = STATE.favorites.filter((c) => c.toLowerCase() !== city.toLowerCase());
      saveLists();
      renderFavorites();
    }
  );
}

function renderHistory() {
  renderTagList(UI.history, STATE.history, (city) => loadByCity(city));
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function suggestionScore(item, query) {
  const q = normalizeText(query);
  const name = normalizeText(item.name);
  const state = normalizeText(item.state);
  const country = normalizeText(item.country);
  const label = normalizeText(formatGeoLabel(item));
  const full = normalizeText(`${item.name} ${item.state || ""} ${item.country || ""}`);
  const qCompact = q.replace(/,\s*/g, " ");

  if (!q) return 0;
  if (name === q) return 1000;
  if (label === q) return 995;
  if (full === q) return 980;
  if (full === qCompact) return 975;
  if (label.startsWith(q)) return 950;
  if (name.startsWith(q)) return 920;
  if (state && state.startsWith(q)) return 900;
  if (full.startsWith(q)) return 860;
  if (label.includes(q)) return 830;
  if (name.includes(q)) return 760;
  if (state && state.includes(q)) return 730;
  if (country && country.startsWith(q)) return 700;
  if (full.includes(q)) return 620;
  return 0;
}

function formatGeoLabel(item) {
  const parts = [item.name];
  if (item.state) parts.push(item.state);
  if (item.country) parts.push(item.country);
  return parts.join(", ");
}

function rankGeoResults(data, query, limit = 8) {
  return (Array.isArray(data) ? data : [])
    .map((item) => ({ item, score: suggestionScore(item, query) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item)
    .slice(0, limit);
}

async function loadBySearchQuery(query) {
  const value = String(query || "").trim();
  if (!value) return;

  try {
    startCloudLoader();
    const geo = await fetchJson(`${API_BASE}/geo/direct?q=${encodeURIComponent(value)}&limit=12`);
    const ranked = rankGeoResults(geo, value, 1);
    if (ranked.length && typeof ranked[0].lat === "number" && typeof ranked[0].lon === "number") {
      const target = ranked[0];
      await loadByCoords(target.lat, target.lon, target.name, null, false);
      pushHistory(target.name);
      return;
    }
  } catch {
    // Fall back to city-name weather lookup below.
  } finally {
    stopCloudLoader();
  }

  await loadByCity(value);
}

async function fetchJson(url) {
  const res = await fetch(url);
  
  if (!res.ok) {
    const text = await res.text();
    throw new WeatherApiError(text || `HTTP ${res.status}`, { url, status: res.status });
  }

  try {
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("JSON parse error for:", url, e);
    throw new WeatherApiError("Invalid JSON response from server", { url });
  }
}

function deriveAlerts(weather, forecast) {
  const result = [];
  const current = weather.weather[0].main.toLowerCase();

  if (current.includes("thunder")) result.push({ level: "danger", text: t("alerts.thunder_now") });
  if (current.includes("rain") || current.includes("drizzle")) result.push({ level: "warn", text: t("alerts.rain_expected") });
  if (weather.main.temp >= 35) result.push({ level: "warn", text: t("alerts.high_heat") });

  const severe = forecast.list.find((item) => {
    const thunder = item.weather[0].main.toLowerCase().includes("thunder");
    const heavyRain = item.rain && (item.rain["3h"] || 0) >= 8;
    const strongWind = item.wind.speed >= (STATE.units === "metric" ? 10 : 22);
    return thunder || heavyRain || strongWind;
  });

  if (severe) {
    result.push({ level: "danger", text: t("alerts.severe_24h") });
  }

  if (!result.length) {
    result.push({ level: "ok", text: t("alerts.none") });
  }

  UI.alerts.innerHTML = "";
  result.forEach((a) => {
    const li = document.createElement("li");
    li.className = a.level;
    li.textContent = a.text;
    UI.alerts.appendChild(li);
  });
}

function removeThemeTransitionLayer() {
  const old = document.querySelector(".theme-transition-layer");
  if (old && old.parentNode) old.parentNode.removeChild(old);
}

function safeRemoveNode(node) {
  if (!node || !node.parentNode) return;
  node.parentNode.removeChild(node);
}

function captureThemeSnapshotLayer() {
  const base = document.querySelector(".bg-base");
  const stars = document.querySelector(".bg-stars");
  const nebula = document.querySelector(".bg-nebula");
  const rain = document.querySelector(".rain");
  const flash = document.querySelector(".flash");
  if (!base || !stars || !nebula) return null;

  const baseStyle = getComputedStyle(base);
  const starsStyle = getComputedStyle(stars);
  const nebulaStyle = getComputedStyle(nebula);
  const overlayStyle = getComputedStyle(document.body, "::before");

  const layer = document.createElement("div");
  layer.className = "theme-transition-layer";
  layer.innerHTML = `
    <div class="ttl-base"></div>
    <div class="ttl-stars"></div>
    <div class="ttl-nebula"></div>
    <div class="ttl-overlay"></div>
    <div class="ttl-rain"></div>
    <div class="ttl-flash"></div>
  `;

  const ttlBase = layer.querySelector(".ttl-base");
  const ttlStars = layer.querySelector(".ttl-stars");
  const ttlNebula = layer.querySelector(".ttl-nebula");
  const ttlOverlay = layer.querySelector(".ttl-overlay");
  const ttlRain = layer.querySelector(".ttl-rain");
  const ttlFlash = layer.querySelector(".ttl-flash");

  ttlBase.style.background = baseStyle.backgroundImage;
  ttlBase.style.opacity = baseStyle.opacity;

  ttlStars.style.backgroundImage = starsStyle.backgroundImage;
  ttlStars.style.backgroundSize = starsStyle.backgroundSize;
  ttlStars.style.backgroundPosition = starsStyle.backgroundPosition;
  ttlStars.style.opacity = starsStyle.opacity;

  ttlNebula.style.background = nebulaStyle.backgroundImage;
  ttlNebula.style.opacity = nebulaStyle.opacity;
  ttlNebula.style.mixBlendMode = nebulaStyle.mixBlendMode;

  ttlOverlay.style.background = overlayStyle.backgroundImage;
  ttlOverlay.style.opacity = overlayStyle.opacity;

  if (rain && ttlRain) {
    const rainStyle = getComputedStyle(rain);
    ttlRain.style.backgroundImage = rainStyle.backgroundImage;
    ttlRain.style.backgroundSize = rainStyle.backgroundSize;
    ttlRain.style.backgroundPosition = rainStyle.backgroundPosition;
    ttlRain.style.opacity = rainStyle.opacity;
  }

  if (flash && ttlFlash) {
    const flashStyle = getComputedStyle(flash);
    ttlFlash.style.background = flashStyle.backgroundColor;
    ttlFlash.style.opacity = flashStyle.opacity;
  }

  return layer;
}

function resolveTimeClass(weather, icon) {
  const timezone = Number(weather?.timezone || 0);
  const now = Number(weather?.dt || Math.floor(Date.now() / 1000));
  const localHour = new Date((now + timezone) * 1000).getUTCHours();
  const sunrise = Number(weather?.sys?.sunrise || 0);
  const sunset = Number(weather?.sys?.sunset || 0);

  if (sunrise && sunset && (now < sunrise || now >= sunset)) {
    return "time-night";
  }
  if (localHour >= 5 && localHour < 11) return "time-morning";
  if (localHour >= 11 && localHour < 16) return "time-day";
  if (localHour >= 16 && localHour < 19) return "time-evening";

  return icon && icon.endsWith("n") ? "time-night" : "time-day";
}

function setTheme(main, icon, weather) {
  const key = main.toLowerCase();
  let theme = "theme-clear";
  if (key.includes("cloud")) theme = "theme-clouds";
  if (key.includes("rain")) theme = "theme-rain";
  if (key.includes("drizzle")) theme = "theme-drizzle";
  if (key.includes("thunder")) theme = "theme-thunderstorm";
  if (key.includes("snow")) theme = "theme-snow";
  if (["mist", "haze", "fog", "smoke"].includes(key)) theme = `theme-${key}`;

  const timeClass = resolveTimeClass(weather, icon);
  const themeClasses = [
    "theme-clear",
    "theme-clouds",
    "theme-rain",
    "theme-drizzle",
    "theme-thunderstorm",
    "theme-snow",
    "theme-mist",
    "theme-haze",
    "theme-fog",
    "theme-smoke"
  ];
  const timeClasses = ["time-morning", "time-day", "time-evening", "time-night"];
  const rainVariantClasses = ["rain-soft", "rain-heavy"];
  const nextSignature = `${theme} ${timeClass}`;
  const currentSignature = document.body.dataset.themeSignature || "";

  try {
    if (currentSignature !== nextSignature) {
      removeThemeTransitionLayer();
      const snapshot = captureThemeSnapshotLayer();
      if (snapshot) {
        document.body.appendChild(snapshot);
        requestAnimationFrame(() => {
          snapshot.classList.add("fade-out");
        });
        setTimeout(() => safeRemoveNode(snapshot), 1450);
      }
    }
  } catch (error) {
    console.warn("theme transition skipped:", error);
  }

  document.body.classList.remove(...themeClasses, ...timeClasses, ...rainVariantClasses);
  document.body.classList.add(theme, timeClass);
  document.body.dataset.themeSignature = nextSignature;

  const wet = ["theme-rain", "theme-drizzle", "theme-thunderstorm"].includes(theme);
  UI.rain.style.opacity = wet ? "0.42" : "0";
  if (theme === "theme-drizzle") {
    document.body.classList.add("rain-soft");
  } else if (theme === "theme-thunderstorm") {
    document.body.classList.add("rain-heavy");
  } else if (theme === "theme-rain") {
    const rainVolume = Number((weather && weather.rain && (weather.rain["1h"] || weather.rain["3h"])) || 0);
    if (rainVolume >= 2.5) document.body.classList.add("rain-heavy");
  }

  if (theme === "theme-thunderstorm") {
    UI.flash.style.opacity = "0.14";
    setTimeout(() => {
      UI.flash.style.opacity = "0";
    }, 220);
  }
}

function summarizeDaily(list) {
  const byDay = {};
  list.forEach((item) => {
    const day = item.dt_txt.split(" ")[0];
    byDay[day] = byDay[day] || [];
    byDay[day].push(item);
  });

  return Object.keys(byDay).slice(0, 5).map((day, index) => {
    const items = byDay[day];
    const temps = items.map((x) => x.main.temp);
    const repr = items.reduce((best, cur) => {
      const bh = Math.abs(Number(best.dt_txt.slice(11, 13)) - 12);
      const ch = Math.abs(Number(cur.dt_txt.slice(11, 13)) - 12);
      return ch < bh ? cur : best;
    }, items[0]);

    return {
      dayLabel: index === 0 ? t("day.today") : new Date(day).toLocaleDateString(activeLocale(), { weekday: "short" }),
      icon: repr.weather[0].icon,
      tmax: Math.max(...temps),
      tmin: Math.min(...temps)
    };
  });
}

function renderHourly(list) {
  UI.hourly.innerHTML = "";
  list.slice(0, 8).forEach((item) => {
    const el = document.createElement("article");
    el.className = "hourly-item";
    el.innerHTML = `
      <p>${formatDate(item.dt, "time")}</p>
      <img src="${weatherIconUrl(item.weather[0].icon)}" alt="hourly icon">
      <p>${temp(item.main.temp)}</p>
    `;
    UI.hourly.appendChild(el);
  });
}

function renderForecast(list) {
  const days = summarizeDaily(list);
  UI.forecast.innerHTML = "";
  days.forEach((day) => {
    const el = document.createElement("article");
    el.className = "forecast-item";
    el.innerHTML = `
      <p>${day.dayLabel}</p>
      <img src="${weatherIconUrl(day.icon)}" alt="forecast icon">
      <p><span class="tmax">${temp(day.tmax)}</span> <span class="tmin">${temp(day.tmin)}</span></p>
    `;
    UI.forecast.appendChild(el);
  });
}

function calculateComfort(weather) {
  const tempNow = weather.main.temp;
  const h = weather.main.humidity;
  const wKmh = STATE.units === "metric" ? weather.wind.speed * 3.6 : weather.wind.speed * 1.609;

  const heatIndex = tempNow + 0.1 * h;
  const windChill =
    tempNow <= 10
      ? 13.12 + 0.6215 * tempNow - 11.37 * (wKmh ** 0.16) + 0.3965 * tempNow * (wKmh ** 0.16)
      : tempNow;
  const discomfortIndex = tempNow - (0.55 - 0.0055 * h) * (tempNow - 14.5);

  UI.heatIndex.textContent = `${heatIndex.toFixed(1)}${DEG}`;
  UI.windChill.textContent = `${windChill.toFixed(1)}${DEG}`;

  let comfort = "Comfortable";
  if (discomfortIndex >= 28) comfort = t("comfort.very_humid");
  else if (discomfortIndex >= 24) comfort = t("comfort.bit_humid");
  else comfort = t("comfort.comfortable");
  UI.discomfort.textContent = comfort;
}

function renderActivities(weather, uv) {
  const tempNow = weather.main.temp;
  const rain = weather.weather[0].main.toLowerCase().includes("rain") || weather.weather[0].main.toLowerCase().includes("thunder");
  const items = [];

  items.push(rain ? t("activity.run_bad") : t("activity.run_good"));
  items.push(uv >= 7 ? t("activity.uv_high") : t("activity.uv_ok"));
  items.push(tempNow > 32 ? t("activity.hot") : t("activity.normal"));
  items.push(weather.main.humidity > 80 ? t("activity.laundry_slow") : t("activity.laundry_ok"));

  UI.activities.innerHTML = "";
  items.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    UI.activities.appendChild(li);
  });
}

function drawTrend(list) {
  const canvas = UI.trendChart;
  const ctx = canvas.getContext("2d");
  const points = list.slice(0, 12).map((x) => ({
    t: x.main.temp,
    label: formatDate(x.dt, "time")
  }));

  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(188,209,255,0.2)";
  ctx.strokeRect(0, 0, width, height);

  const temps = points.map((p) => p.t);
  const min = Math.min(...temps);
  const max = Math.max(...temps);
  const range = Math.max(1, max - min);

  ctx.beginPath();
  points.forEach((p, i) => {
    const x = 28 + (i * (width - 56)) / (points.length - 1);
    const y = height - 26 - ((p.t - min) / range) * (height - 62);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = "#9bcbff";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#d7e9ff";
  ctx.font = "12px Plus Jakarta Sans";
  points.forEach((p, i) => {
    const x = 28 + (i * (width - 56)) / (points.length - 1);
    const y = height - 26 - ((p.t - min) / range) * (height - 62);
    ctx.beginPath();
    ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    ctx.fill();
    if (i % 2 === 0) {
      ctx.fillText(p.label, x - 16, height - 8);
    }
  });
}

function updateMap(lat, lon) {
  const overlay = getCustomSelectValue(UI.mapLayer) || "rain";
  UI.weatherMap.src = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=380&zoom=7&level=surface&overlay=${overlay}&product=ecmwf&marker=true`;
}

async function fetchAQI(lat, lon) {
  const data = await fetchJson(`${API_BASE}/air_pollution?lat=${lat}&lon=${lon}`);
  const value = data.list?.[0]?.main?.aqi ?? null;
  const label = [
    "N/A",
    t("aqi.label_1"),
    t("aqi.label_2"),
    t("aqi.label_3"),
    t("aqi.label_4"),
    t("aqi.label_5")
  ];
  UI.aqi.textContent = value ? `${value} (${label[value]})` : "--";
}

async function fetchUvMoon(lat, lon) {
  const data = await fetchJson(`${API_BASE}/uv_moon?lat=${lat}&lon=${lon}`);
  const uv = data?.daily?.uv_index_max?.[0];
  const moon = data?.daily?.moon_phase?.[0];
  UI.uv.textContent = typeof uv === "number" ? uv.toFixed(1) : "--";
  UI.moonPhase.textContent = typeof moon === "number" ? moonPhaseLabel(moon) : "--";
  return typeof uv === "number" ? uv : 0;
}

async function fetchSuggestions(query) {
  if (!query || query.length < 2) {
    setSuggestionsOpen(false);
    UI.suggestions.innerHTML = "";
    return;
  }

  try {
    const data = await fetchJson(`${API_BASE}/geo/direct?q=${encodeURIComponent(query)}&limit=12`);
    const ranked = rankGeoResults(data, query, 8);

    UI.suggestions.innerHTML = "";
    if (!ranked.length) {
      setSuggestionsOpen(false);
      return;
    }

    ranked.forEach((item) => {
      const li = document.createElement("li");
      const label = formatGeoLabel(item);
      li.textContent = label;
      li.addEventListener("click", async () => {
        UI.searchInput.value = label;
        setSuggestionsOpen(false);
        if (typeof item.lat === "number" && typeof item.lon === "number") {
          await loadByCoords(item.lat, item.lon, item.name);
          pushHistory(item.name);
        } else {
          await loadByCity(item.name);
        }
      });
      UI.suggestions.appendChild(li);
    });
    setSuggestionsOpen(true);
  } catch {
    setSuggestionsOpen(false);
  }
}

function updateCardCityTextSize(cityName) {
  if (!UI.cardCity) return;
  const length = String(cityName || "").trim().length;
  UI.cardCity.classList.toggle("is-long", length >= 18 && length < 28);
  UI.cardCity.classList.toggle("is-very-long", length >= 28);
}

function renderCurrent(weather, cityLabel = null, timezoneOffset = 0) {
  const displayCity = String(cityLabel || weather.name || "").trim();
  UI.city.textContent = displayCity;
  UI.temp.textContent = temp(weather.main.temp);
  UI.desc.textContent = weather.weather[0].description;
  UI.cardTemp.textContent = temp(weather.main.temp);
  UI.cardCity.textContent = displayCity;
  updateCardCityTextSize(displayCity);
  UI.date.textContent = formatDate(weather.dt, "date", timezoneOffset);
  startLocalClock(timezoneOffset);
  UI.condition.textContent = weather.weather[0].description;
  UI.feels.textContent = `${temp(weather.main.feels_like)}${unitLabel()}`;
  UI.humidity.textContent = `${weather.main.humidity}%`;
  UI.wind.textContent = windText(weather.wind.speed);
  UI.pressure.textContent = `${weather.main.pressure} hPa`;
  UI.visibility.textContent = visText(weather.visibility);
  UI.currentIcon.src = weatherIconUrl(weather.weather[0].icon);
  UI.currentIcon.alt = weather.weather[0].description;
  UI.sunrise.textContent = formatDate(weather.sys.sunrise, "time", timezoneOffset);
  UI.sunset.textContent = formatDate(weather.sys.sunset, "time", timezoneOffset);

  setTheme(weather.weather[0].main, weather.weather[0].icon, weather);
  calculateComfort(weather);
}

async function loadByCity(city) {
  if (!city) return;
  status(t("status.loading_weather"));

  try {
    startCloudLoader();
    const weather = await fetchJson(`${API_BASE}/weather?q=${encodeURIComponent(city)}&units=${STATE.units}&lang=${weatherLang()}`);
    await loadByCoords(weather.coord.lat, weather.coord.lon, weather.name, weather, false);
    pushHistory(weather.name);
  } catch (error) {
    console.error("loadByCity", error);
    status(t("status.failed", { message: error.message }), true);
    UI.desc.textContent = t("status.could_not_load");
  } finally {
    stopCloudLoader();
  }
}

async function loadByCoords(lat, lon, forcedCity = null, weatherPrefetch = null, withLoader = true) {
  try {
    if (withLoader) startCloudLoader();
    const weather = weatherPrefetch || (await fetchJson(`${API_BASE}/weather?lat=${lat}&lon=${lon}&units=${STATE.units}&lang=${weatherLang()}`));
    const forecast = await fetchJson(`${API_BASE}/forecast?lat=${lat}&lon=${lon}&units=${STATE.units}&lang=${weatherLang()}`);
    const displayCity = forcedCity || weather.name;

    STATE.weather = weather;
    STATE.forecast = forecast;
    STATE.coords = weather.coord;
    STATE.currentCity = displayCity;

    renderCurrent(weather, displayCity, Number(weather.timezone || 0));
    renderHourly(forecast.list);
    renderForecast(forecast.list);
    try {
      drawTrend(forecast.list);
    } catch (error) {
      console.warn("drawTrend failed:", error);
    }
    try {
      deriveAlerts(weather, forecast);
    } catch (error) {
      console.warn("deriveAlerts failed:", error);
    }
    try {
      updateMap(weather.coord.lat, weather.coord.lon);
    } catch (error) {
      console.warn("updateMap failed:", error);
    }

    let uv = 0;
    try {
      uv = await fetchUvMoon(weather.coord.lat, weather.coord.lon);
    } catch (error) {
      console.warn("fetchUvMoon failed:", error);
    }
    try {
      await fetchAQI(weather.coord.lat, weather.coord.lon);
    } catch (error) {
      console.warn("fetchAQI failed:", error);
      UI.aqi.textContent = "--";
    }
    try {
      renderActivities(weather, uv);
    } catch (error) {
      console.warn("renderActivities failed:", error);
    }

    try {
      maybeSendDailyNotification();
    } catch (error) {
      console.warn("maybeSendDailyNotification failed:", error);
    }
    status(t("status.updated_for", { city: STATE.currentCity }));
  } catch (error) {
    console.error("loadByCoords", error);
    status(t("status.failed", { message: error.message }), true);
    UI.desc.textContent = t("status.could_not_load");
  } finally {
    if (withLoader) stopCloudLoader();
  }
}

async function compareCity(cityB) {
  if (!STATE.weather) return;
  STATE.lastCompareCity = cityB;

  try {
    startCloudLoader();
    const other = await fetchJson(`${API_BASE}/weather?q=${encodeURIComponent(cityB)}&units=${STATE.units}&lang=${weatherLang()}`);
    const tempDiff = (other.main.temp - STATE.weather.main.temp).toFixed(1);
    const windDiff = (other.wind.speed - STATE.weather.wind.speed).toFixed(1);
    UI.compareResult.textContent = t("compare.result", {
      city: other.name,
      temp: temp(other.main.temp),
      diff: tempDiff > 0 ? `+${tempDiff}` : tempDiff,
      deg: DEG,
      base: STATE.weather.name,
      windDiff
    });
  } catch (error) {
    UI.compareResult.textContent = t("compare.error", { message: error.message });
  } finally {
    stopCloudLoader();
  }
}

function maybeSendDailyNotification() {
  if (!STATE.dailyNotify || Notification.permission !== "granted" || !STATE.weather) return;
  const today = new Date().toISOString().slice(0, 10);
  const last = localStorage.getItem("atm_last_notify");
  if (last === today) return;

  new Notification(t("notify.title", { city: STATE.weather.name }), {
    body: `${temp(STATE.weather.main.temp)} • ${STATE.weather.weather[0].description}`
  });
  localStorage.setItem("atm_last_notify", today);
}

function wireEvents() {
  UI.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loadBySearchQuery(UI.searchInput.value.trim());
    setSuggestionsOpen(false);
  });

  UI.searchInput.addEventListener("input", () => {
    clearTimeout(STATE.searchDebounce);
    STATE.searchDebounce = setTimeout(() => {
      fetchSuggestions(UI.searchInput.value.trim());
    }, 280);
  });

  document.addEventListener("click", (e) => {
    closeAllCustomSelects();
    if (!UI.searchForm.contains(e.target)) {
      setSuggestionsOpen(false);
    }
  });

  UI.unitC.addEventListener("click", async () => {
    if (STATE.units === "metric") return;
    STATE.units = "metric";
    updateUnitButtons();
    if (STATE.coords) await loadByCoords(STATE.coords.lat, STATE.coords.lon, STATE.currentCity);
  });

  UI.unitF.addEventListener("click", async () => {
    if (STATE.units === "imperial") return;
    STATE.units = "imperial";
    updateUnitButtons();
    if (STATE.coords) await loadByCoords(STATE.coords.lat, STATE.coords.lon, STATE.currentCity);
  });

  initCustomSelect(UI.localeSelect, async (value) => {
    STATE.locale = value;
    applyI18nToDom();
    refreshDailyToggleText();
    renderFavorites();
    renderHistory();
    if (!STATE.weather) {
      UI.compareResult.textContent = t("status.no_comparison");
    } else if (STATE.lastCompareCity) {
      await compareCity(STATE.lastCompareCity);
    }
    if (STATE.coords) await loadByCoords(STATE.coords.lat, STATE.coords.lon, STATE.currentCity);
  });

  UI.compareForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = UI.compareInput.value.trim();
    if (!city) return;
    compareCity(city);
  });

  initCustomSelect(UI.mapLayer, () => {
    if (STATE.coords) updateMap(STATE.coords.lat, STATE.coords.lon);
  });

  UI.saveFavorite.addEventListener("click", () => {
    const city = STATE.currentCity;
    if (!city) return;
    STATE.favorites = [city, ...STATE.favorites.filter((c) => c.toLowerCase() !== city.toLowerCase())].slice(0, 8);
    saveLists();
    renderFavorites();
  });

  UI.enableNotify.addEventListener("click", async () => {
    if (!("Notification" in window)) {
      status(t("status.browser_no_notification"), true);
      return;
    }
    const permission = await Notification.requestPermission();
    status(t("status.notification_permission", { permission }));
    if (permission === "granted" && STATE.weather) {
      new Notification(t("notify.title", { city: STATE.weather.name }), {
        body: `${temp(STATE.weather.main.temp)} • ${STATE.weather.weather[0].description}`
      });
    }
  });

  UI.toggleDaily.addEventListener("click", () => {
    STATE.dailyNotify = !STATE.dailyNotify;
    localStorage.setItem("atm_daily_notify", STATE.dailyNotify ? "1" : "0");
    refreshDailyToggleText();
    maybeSendDailyNotification();
  });

  window.addEventListener("resize", () => {
    if (STATE.forecast) drawTrend(STATE.forecast.list);
  });
}

function observeReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function initParallax() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const bgLayers = [
    { el: document.querySelector(".bg-base"), move: 10, scroll: 12 },
    { el: document.querySelector(".bg-stars"), move: 20, scroll: 24 },
    { el: document.querySelector(".bg-nebula"), move: 30, scroll: 36 },
    { el: document.querySelector(".rain"), move: 14, scroll: 18 }
  ].filter((item) => item.el);

  const uiLayers = [
    { el: document.querySelector(".hero"), move: 12, scroll: 8 },
    { el: document.querySelector(".main-card"), move: 7, scroll: 5 }
  ].filter((item) => item.el);

  if (!bgLayers.length && !uiLayers.length) return;

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let targetScroll = 0;
  let currentScroll = 0;
  let rafId = 0;

  const animate = () => {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    currentScroll += (targetScroll - currentScroll) * 0.08;

    bgLayers.forEach((layer) => {
      const x = currentX * layer.move;
      const y = currentY * layer.move + currentScroll * layer.scroll;
      layer.el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    });

    uiLayers.forEach((layer) => {
      const x = currentX * layer.move;
      const y = currentY * layer.move - currentScroll * layer.scroll;
      layer.el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    });

    rafId = requestAnimationFrame(animate);
  };

  const updatePointerTarget = (clientX, clientY) => {
    const nx = clientX / window.innerWidth - 0.5;
    const ny = clientY / window.innerHeight - 0.5;
    targetX = Math.max(-1, Math.min(1, nx * 2));
    targetY = Math.max(-1, Math.min(1, ny * 2));
  };

  const onPointerMove = (event) => {
    updatePointerTarget(event.clientX, event.clientY);
  };

  const onPointerLeave = () => {
    targetX = 0;
    targetY = 0;
  };

  const onTouchMove = (event) => {
    if (!event.touches || !event.touches[0]) return;
    updatePointerTarget(event.touches[0].clientX, event.touches[0].clientY);
  };

  const onScroll = () => {
    targetScroll = Math.min(1, window.scrollY / 900);
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerleave", onPointerLeave, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener(
    "blur",
    () => {
      targetX = 0;
      targetY = 0;
    },
    { passive: true }
  );

  onScroll();
  if (!rafId) rafId = requestAnimationFrame(animate);
}

function initRainParticles() {
  const layer = UI.rain;
  if (!layer || layer.dataset.ready === "1") return;

  const dropsCount = 130;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < dropsCount; i += 1) {
    const drop = document.createElement("span");
    drop.className = "rain-drop";
    drop.style.left = `${Math.random() * 100}%`;
    drop.style.setProperty("--drop-delay", `${(Math.random() * 1.6).toFixed(2)}s`);
    drop.style.setProperty("--drop-duration", `${(0.75 + Math.random() * 0.75).toFixed(2)}s`);
    drop.style.setProperty("--drop-length", `${Math.floor(14 + Math.random() * 18)}px`);
    drop.style.setProperty("--drop-drift", `${(-3 + Math.random() * 6).toFixed(2)}px`);
    fragment.appendChild(drop);
  }

  layer.appendChild(fragment);
  layer.dataset.ready = "1";
}

function initScrollDrivenHeroVideo() {
  const video = UI.heroVideo;
  if (!video) return;

  const STEP_SECONDS = 1;
  const INPUT_STEP_DELTA = 100;
  const EPSILON = 0.08;
  let accumulatedWheel = 0;
  let accumulatedTouch = 0;
  let touchStartY = 0;
  let isScrollUnlocked = false;
  let rafId = 0;
  let fallbackPauseTimer = 0;

  const getDuration = () => Number(video.duration);
  const hasDuration = () => Number.isFinite(getDuration()) && getDuration() > 0;
  const atVideoEnd = () => hasDuration() && video.currentTime >= getDuration() - EPSILON;

  const stopPlayback = () => {
    if (rafId) cancelAnimationFrame(rafId);
    if (fallbackPauseTimer) clearTimeout(fallbackPauseTimer);
    rafId = 0;
    fallbackPauseTimer = 0;
    video.pause();
  };

  const unlockScrollIfEnded = () => {
    if (!isScrollUnlocked && atVideoEnd()) {
      isScrollUnlocked = true;
      stopPlayback();
    }
  };

  const seekBackwardStep = () => {
    if (isScrollUnlocked) return;
    stopPlayback();
    const next = Math.max(0, video.currentTime - STEP_SECONDS);
    video.currentTime = next;
  };

  const playForwardStep = () => {
    if (isScrollUnlocked) return;
    stopPlayback();

    const duration = getDuration();
    if (!Number.isFinite(duration) || duration <= 0) {
      const started = video.play();
      if (started && typeof started.then === "function") {
        started.catch(() => null);
      }
      fallbackPauseTimer = setTimeout(() => {
        video.pause();
      }, STEP_SECONDS * 1000);
      return;
    }

    const maxTime = Math.max(0, duration - 0.04);
    const target = Math.min(video.currentTime + STEP_SECONDS, maxTime);
    if (target <= video.currentTime + 0.01) {
      unlockScrollIfEnded();
      return;
    }

    const tick = () => {
      if (video.currentTime >= target - 0.02 || video.ended) {
        video.pause();
        rafId = 0;
        unlockScrollIfEnded();
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    const started = video.play();
    if (started && typeof started.then === "function") {
      started
        .then(() => {
          rafId = requestAnimationFrame(tick);
        })
        .catch(() => {
          video.currentTime = target;
          unlockScrollIfEnded();
        });
    } else {
      rafId = requestAnimationFrame(tick);
    }
  };

  video.pause();
  video.removeAttribute("autoplay");
  video.removeAttribute("loop");
  video.currentTime = 0;

  const shouldIntercept = (delta = 0) => {
    if (!isScrollUnlocked) {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
      return true;
    }

    // If user is back at the top and scrolls up, re-enter video control mode to rewind.
    if (delta < 0 && window.scrollY <= 2 && video.currentTime > EPSILON) {
      isScrollUnlocked = false;
      return true;
    }

    return false;
  };

  const applyInputDelta = (delta) => {
    if (!delta) return;
    if (delta > 0) playForwardStep();
    else seekBackwardStep();
  };

  window.addEventListener(
    "wheel",
    (event) => {
      if (!shouldIntercept(event.deltaY)) return;
      event.preventDefault();

      accumulatedWheel += event.deltaY;
      while (Math.abs(accumulatedWheel) >= INPUT_STEP_DELTA) {
        const direction = accumulatedWheel > 0 ? 1 : -1;
        applyInputDelta(direction);
        accumulatedWheel -= direction * INPUT_STEP_DELTA;
      }
    },
    { passive: false }
  );

  window.addEventListener(
    "scroll",
    () => {
      if (!isScrollUnlocked && window.scrollY !== 0) window.scrollTo(0, 0);
    },
    { passive: true }
  );

  window.addEventListener("touchstart", (event) => {
    if (!event.touches || !event.touches[0]) return;
    touchStartY = event.touches[0].clientY;
  });

  window.addEventListener(
    "touchmove",
    (event) => {
      if (!event.touches || !event.touches[0]) return;
      const currentY = event.touches[0].clientY;
      const delta = touchStartY - currentY;
      touchStartY = currentY;
      if (!shouldIntercept(delta)) return;
      event.preventDefault();
      accumulatedTouch += delta;

      while (Math.abs(accumulatedTouch) >= INPUT_STEP_DELTA) {
        const direction = accumulatedTouch > 0 ? 1 : -1;
        applyInputDelta(direction);
        accumulatedTouch -= direction * INPUT_STEP_DELTA;
      }
    },
    { passive: false }
  );

  window.addEventListener("keydown", (event) => {
    const tag = event.target && event.target.tagName ? event.target.tagName.toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || tag === "select" || tag === "button") return;
    if (event.target && event.target.isContentEditable) return;

    const forwardKeys = ["ArrowDown", "PageDown", " "];
    const backwardKeys = ["ArrowUp", "PageUp"];
    if (!forwardKeys.includes(event.key) && !backwardKeys.includes(event.key)) return;
    const intent = forwardKeys.includes(event.key) ? 1 : -1;
    if (!shouldIntercept(intent)) return;

    event.preventDefault();
    if (forwardKeys.includes(event.key)) applyInputDelta(1);
    if (backwardKeys.includes(event.key)) applyInputDelta(-1);
  });

  video.addEventListener("ended", () => {
    isScrollUnlocked = true;
    stopPlayback();
  });

  video.addEventListener("timeupdate", unlockScrollIfEnded);
  video.addEventListener("loadedmetadata", () => {
    if (!isScrollUnlocked && window.scrollY !== 0) window.scrollTo(0, 0);
  });
}

async function bootstrap() {
  localStorage.removeItem("atm_last_snapshot");

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((reg) => reg.unregister());
    });
  }
  if ("caches" in window) {
    caches.keys().then((keys) => {
      keys.forEach((key) => caches.delete(key));
    });
  }

  applyI18nToDom();
  updateUnitButtons();
  renderFavorites();
  renderHistory();
  refreshDailyToggleText();
  wireEvents();
  observeReveal();
  initRainParticles();
  initScrollDrivenHeroVideo();
  
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => loadByCoords(pos.coords.latitude, pos.coords.longitude),
      () => {
        status(t("status.location_denied_default"));
        loadByCity(STATE.currentCity);
      },
      { timeout: 7000 }
    );
  } else {
    loadByCity(STATE.currentCity);
  }
}

bootstrap();


