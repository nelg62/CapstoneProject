const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secret = process.env.DB_SECRET;

module.exports = (db) => {
  const router = express.Router();

  router.post("/register", async (req, res) => {
    const { username, emailId, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await db("Users").insert({
        username,
        emailId,
        password: hashedPassword,
      });

      const newUser = await db("Users").where({ emailId }).first();

      if (!newUser) {
        return res
          .status(404)
          .json({ error: "User not found after registering" });
      }

      res.status(201).json({ id: newUser.id, username, emailId });
    } catch (error) {
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  router.post("/login", async (req, res) => {
    const { emailId, password } = req.body;
    try {
      const user = await db("Users").where({ emailId }).first();
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password " });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const token = jwt.sign({ id: user.id, username: user.username }, secret, {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Failed to login user" });
    }
  });

  router.get("/me", async (req, res) => {
    console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token missing" });
    }
    try {
      const decoded = jwt.verify(token, secret);
      const user = await db("Users").where({ id: decoded.id }).first();
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({ id: user.id, username: user.username, emailId: user.email });
    } catch (error) {
      res.status(500).json({ error: "Failed to get user info" });
    }
  });

  return router;
};
