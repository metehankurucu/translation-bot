require("dotenv").config();
const TranslateBot = require("./lib/TranslateBot");
const startServer = require("./express");

const run = async () => {
  await TranslateBot.launch();
  startServer();
};

run();
