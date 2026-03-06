const { proxyOpenWeather } = require("../_helpers");

module.exports = async (req, res) => {
  return proxyOpenWeather(req, res, "/geo/1.0/direct", ["q", "limit"]);
};

