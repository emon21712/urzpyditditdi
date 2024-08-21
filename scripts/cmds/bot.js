const axios = require('axios');

module.exports = {
  config: {
    name: "bot",
    version: "1.0",
    role: 0,
    author: "OtinXSandip + AceGun",
    countDown: 5,
    shortdescription: "fun chat with nemo",
    longdescription: "chat with Nemo bot",
    category: "chat",
    usages: "{pn}",
  },

  onStart: async function({ api, event, message, args }) {
    let { threadID, messageID } = event;
    const response = args.join(" ");

    if (!args[0]) {
      message.reply("hi baby 🐥");
      return;
    }

    try {
const a = "testapi";
const b = "heckerman06";
      const res = await axios.get(`https://${a}.${b}.repl.co/api/other/simsimi?message=${encodeURIComponent(response)}&lang=ph`);
      const respond = res.data.message;
      message.reply(respond, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  },

  onReply: async function({ api, event, message, args }) {
    let { threadID, messageID } = event;
    const response = args.join(" ");
    try {
const a = "testapi";
const b = "heckerman06";
      const res = await axios.get(`https://${a}.${b}.repl.co/api/other/simsimi?message=${encodeURIComponent(response)}&lang=ph`);
      const respond = res.data.message;
      message.reply(respond, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};