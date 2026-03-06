const OPENWEATHER_BASE = "https://api.openweathermap.org";

function toQueryString(query) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });
  return params.toString();
}

function getApiKey() {
  return process.env.OPENWEATHER_API_KEY || "";
}

async function proxyOpenWeather(req, res, endpoint, allowedKeys) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return res.status(500).json({ message: "Server API key not configured." });
  }

  const filtered = {};
  allowedKeys.forEach((key) => {
    if (req.query[key] !== undefined) filtered[key] = req.query[key];
  });

  const queryString = toQueryString({ ...filtered, appid: apiKey });
  const url = `${OPENWEATHER_BASE}${endpoint}?${queryString}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(502).json({
      message: "Upstream weather service unreachable.",
      detail: String(error)
    });
  }
}

module.exports = {
  proxyOpenWeather
};

