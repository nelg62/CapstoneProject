const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.CLOUD_DB_SECRET;

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); //Unauthorized

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

module.exports = (db) => {
  const router = express.Router();

  // Register a new user  POST Route
  router.post("/register", async (req, res) => {
    const { username, emailId, password } = req.body;
    try {
      // Hash the password before storing in the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user into the database
      await db.transaction(async (trx) => {
        await trx("Users").insert({
          username,
          emailId,
          password: hashedPassword,
        });
      });

      // Retrieve the newly created user from the database
      const newUser = await db("Users").where({ emailId }).first();

      if (!newUser) {
        return res
          .status(404)
          .json({ error: "User not found after registering" }); // User not Created
      }

      res.status(201).json({ id: newUser.id, username, emailId }); // User Created
    } catch (error) {
      console.error("Error during registration", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  // Login a user  POST Route
  router.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    try {
      // Retrieve the user from the databse
      const user = await db("Users").where({ emailId }).first();
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password " });
      }

      // Compare the provided password with the stored hash password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Generate a JWT token for the user
      const token = jwt.sign({ id: user.id, username: user.username }, secret, {
        expiresIn: "1h",
      });

      res.json({
        user: { id: user.id, username: user.username, emailId: user.emailId },
        token,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to login user" });
    }
  });

  // Get the authenticated users info  GET Route
  router.get("/me", authenticateToken, async (req, res) => {
    console.log(req.headers.authorization);

    const authHeader = req.headers.authorization;
    // Check Authentication token exists
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }
    try {
      // Retrieve the user from the database using the decoded JWT token
      const decoded = jwt.verify(token, secret);
      const user = await db("Users").where({ id: decoded.id }).first();
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ id: user.id, username: user.username, emailId: user.emailId });
    } catch (error) {
      res.status(500).json({ error: "Failed to get user info" });
    }
  });

  return router;
};
