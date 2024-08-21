const axios = require('axios');

module.exports = {
  config: {
    name: "xvid",
    version: "1.0",
    author: "Shikaki",
    countDown: 10,
    role: 0,
    longDescription: "Download X(Twitter) video.",
    category: "media",
    guide: {
      en: "{pn} link"
    }
  },

  onStart: async function ({ message, args }) {
    const link = args.join(" ");
    if (!link) {
      return message.reply(`Please provide the link to the Twitter video.`);
    } else {
      const BASE_URL = `https://waleapi.qhing.repl.co/api/dowloader/twitter?url=${encodeURIComponent(link)}`;

      message.reply("⬇ | ⏯️ Downloading the video for you");

      try {
        const response = await axios.get(BASE_URL);

        if (!response.data.success) {
          return message.reply(`Sorry, X video could not be downloaded. Reason: ${response.data.error || 'Unknown error'}`);
        }

        const title = response.data.result.desc;
        const videoUrl = response.data.result.SD;

        const messageResponse = {
          body: title,
          attachment: await global.utils.getStreamFromURL(videoUrl)
        };

        await message.reply(messageResponse);
      } catch (error) {
        console.error(error);
        message.reply(`Sorry, X video could not be downloaded. Reason: ${error.message}`);
      }
    }
  }
};