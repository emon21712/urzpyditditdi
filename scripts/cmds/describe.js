const axios = require("axios");

module.exports = {
  config: {
    name: "describe",
aliases: ["des"],
    role: 0,
author: "OtinXShiva",
longDescription: "video & audio to text",
    category: "ai",
guide: {
en: "${pn} reply to video or audio"
}
  },
  onStart: async function ({ event, message, args, api }) {
    const lado = event.messageReply && event.messageReply.attachments && event.messageReply.attachments[0].url;
    if (!lado) {
      return message.reply("please reply to a video or audio");
    }
    const response = await axios.get(`https://sandyapi.otinxsandeep.repl.co/des?url=${encodeURIComponent(lado)}`);
    const puti = response.data.transcript;
    message.reply(puti);
  }
};