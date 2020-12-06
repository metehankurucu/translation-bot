const express = require("express");

const startServer = () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.get("*", (req, res) => {
    res.send("Telegram Translation Bot is running.");
  });

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
};

module.exports = startServer;
