// middleware/validateApiKey.js
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ error: "API key missing" });
  }

  // Validate the API key (replace 'your_api_key' with your actual key or logic to retrieve it)
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  // If valid, proceed to the next middleware or route handler
  next();
};

module.exports = validateApiKey;
