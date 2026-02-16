require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./database");
const apiRouter = require("./routes/api");

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use("/", apiRouter);

app.use(express.urlencoded({ extended: true }));

app.get("/api/", (req, res) => {
  res.json({ "API success": true });
});

const PORT = process.env.PORT || 7000;

// For local development.
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log("Great! Server listening on port :: " + PORT);
  });
}

// Export for Vercel functions.
module.exports = app;
