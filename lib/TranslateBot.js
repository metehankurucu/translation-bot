const { Telegraf } = require("telegraf");
const translate = require("./TranslateAPI");

const bot = new Telegraf(process.env.BOT_TOKEN);

const replies = {
  start: "Hello, this is a translation bot to help you.",
  commands: `Available commands
  /languages to see available languages
  /setlang to set target language you want to translate
  `,
  undefinedLang: `Undefined language code. 
  Please type "/setlang languageCode"
  for example "/setlang en"
  /help for more info
      `,
  setLang: `Now type the "/setlang languageCode" to set target language with language code you want."`,
  setLangSuccess: "OK your target language is",
};

/**
 * Stores target languages of all users
 * [user.id] = 'target lang code'
 */
const targetLang = {};

/** /start command */
bot.start((ctx) => {
  ctx.reply(replies.start);
  ctx.reply(replies.commands);
});

/** /help command */
bot.help((ctx) => {
  ctx.reply(replies.commands);
});

/**
 * /setlang command
 * Set Target Language
 * */
bot.command("/setlang", (ctx) => {
  const language = ctx.message.text.split(" ")[1];
  if (language) {
    targetLang[ctx.from.id] = language;
    ctx.reply(`${replies.setLangSuccess} ${language}`);
  } else {
    ctx.reply(replies.undefinedLang);
  }
});

/**
 * /languages command
 * Get Available Languages
 * */
bot.command("/languages", async (ctx) => {
  const languages = await translate.getLanguages();
  let reply = "";
  languages[0].forEach(
    (language) => (reply += `${language.name} -> ${language.code}\n`)
  );
  ctx.reply(reply);
  ctx.reply(replies.setLang);
});

/** Translate Written Message */
bot.on("message", async (ctx) => {
  const lang = targetLang[ctx.from.id] || "en";
  const [translation] = await translate.translate(ctx.message.text, lang);
  ctx.reply(translation);
  ctx.reply("/help");
});

module.exports = bot;
