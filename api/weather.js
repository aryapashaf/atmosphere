const { proxyOpenWeather } = require("./_helpers");

module.exports = async (req, res) => {
  return proxyOpenWeather(req, res, "/data/2.5/weather", ["q", "lat", "lon", "units", "lang"]);
};

