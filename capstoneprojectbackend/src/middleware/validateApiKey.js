const apiKey = process.env.API_KEY;

const validateApiKey = (req, res, next) => {
  const requestApiKey = req.headers["x-api-key"];

  if (requestApiKey !== apiKey) {
    return res.status(403).json({ error: "Forbidden: Invalid API Key" });
  }

  next();
};

module.exports = validateApiKey;
