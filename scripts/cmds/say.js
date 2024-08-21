const axios = require('axios');
const fs = require('fs-extra');

module.exports = {
  config: {
    name: "say",
    version: "1.6",
    author: "Samir Œ",
    countDown: 5,
    role: 0,
    category: "Fun",
    ShortDescription: "text to voice",
    LongDescription: "bot will make your text into voice.",
    guide: {
      en: "{pn} your text (default will be -bn)| {pn} your text -[use two words ISO 639-1 code, ex: English-en, Bangla-bn, Hindi-hi or more, search Google for your language code]"
    }
  },

  onStart: async function ({ api, args, message, event }) {
    const { getPrefix } = global.utils;
    const p = getPrefix(event.threadID);

    let text;

    if (event.type === "message_reply") {
      text = event.messageReply.body;
    } else {
      text = args && args.length > 0 ? args.join(" ") : '';
    }

    if (!text) {
      return message.reply(`provide some text 🫵\n\nExample:\n${p}say hi there`);
    }

    const path = "./tts.mp3";
    const urlPrefix = "https://tts.samirxrichioe.repl.co/speak?text=";

    try {
      if (text.length <= 150) {
        const response = await axios({
          method: "get",
          url: `${urlPrefix}${encodeURIComponent(text)}&voice=Ivy`,
          responseType: "stream"
        });

        const writer = fs.createWriteStream(path);
        response.data.pipe(writer);
        writer.on("finish", () => {
          // Send the text as an attachment
          message.reply({
            body: text,
            attachment: fs.createReadStream(path)
          }, () => {
            fs.remove(path);
          });
        });
      } else {
        const chunks = text.match(/.{1,150}/g);

        for (let i = 0; i < chunks.length; i++) {
          const response = await axios({
            method: "get",
            url: `${urlPrefix}${encodeURIComponent(chunks[i])}&voice=Ivy`,
            responseType: "stream"
          });

          const writer = fs.createWriteStream(path, { flags: i === 0 ? 'w' : 'a' });
          response.data.pipe(writer);

          if (i === chunks.length - 1) {
            writer.on("finish", () => {
              // Send the text as an attachment
              message.reply({
                body: text,
                attachment: fs.createReadStream(path)
              }, () => {
                fs.remove(path);
              });
            });
          }
        }
      }
    } catch (err) {
      console.error(err);
      message.reply("An error occurred while trying to convert your text to speech or send it as an attachment. Please try again later.");
    }
  }
};