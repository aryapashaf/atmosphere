const { proxyOpenWeather } = require("./_helpers");

module.exports = async (req, res) => {
  return proxyOpenWeather(req, res, "/data/2.5/air_pollution", ["lat", "lon"]);
};

