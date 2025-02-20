require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./schema");

app.use(express.json());

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log(`Connected to database`);
  })
  .catch((error) => {
    console.error(`Error connecting to the database:`, error);
  });

app.post("/api/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    await User.create({ name, email, password });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at port https://localhost:${port}`);
});
