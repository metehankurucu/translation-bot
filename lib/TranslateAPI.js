const { Translate } = require("@google-cloud/translate").v2;

module.exports = new Translate({ key: process.env.GOOGLE_API_KEY });
