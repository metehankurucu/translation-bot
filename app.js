require("dotenv").config();
const TranslateBot = require("./lib/TranslateBot");
const startServer = require("./express");

const run = async () => {
  await TranslateBot.launch();
  //run express server to deploy and launch bot properly
  //for example heroku fails without running server
  startServer();
};

run();
