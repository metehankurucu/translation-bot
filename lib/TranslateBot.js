const { Telegraf } = require("telegraf");
const translate = require("./TranslateAPI");

const bot = new Telegraf(process.env.BOT_TOKEN);

const targetLang = {};

const commands = `Available commands
/languages to see available languages
/setlang to set target language you wat to translate
`;

bot.start((ctx) => {
  ctx.reply(
    "Hello, this is a translation bot to help you.\ntype /setTarget to set target language you want to translate"
  );
  ctx.reply(commands);
});

bot.help((ctx) => {
  ctx.reply(commands);
});

bot.command("/setlang", (ctx) => {
  const language = ctx.message.text.split(" ")[1];
  if (language) {
    targetLang[ctx.from.id] = language;
    ctx.reply(`OK your target language is ${language}`);
  } else {
    ctx.reply(`Undefined language code. 
Please type '/setlang languageCode' 
for example '/setlang en'
/help for more info
    `);
  }
});

bot.command("/languages", async (ctx) => {
  const languages = await translate.getLanguages();
  let reply = "";
  languages[0].forEach((language) => {
    reply += `${language.name} -> [${language.code}](/setlang ${language.code})\n`;
  });
  ctx.replyWithMarkdown(reply);
  ctx.reply(
    `Now type the "/setlang languageCode" to set target language with language code you want."`
  );
});

bot.on("message", async (ctx) => {
  console.log(ctx.message);
  const lang = targetLang[ctx.from.id] || "en";
  const [translation] = await translate.translate(ctx.message.text, lang);
  ctx.reply(translation);
  ctx.reply("/help");
});

module.exports = bot;
