const express = require("express");
const bcrypt = require("bcrypt");

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

  return router;
};
