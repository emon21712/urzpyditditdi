const axios = require('axios');

const PriyaPrefix = [
  'queen',
  'ai',
  '.ai', //Add Your Prefix Here
];

const axiosInstance = axios.create();

module.exports = {
  config: {
    name: 'ai',
    version: '2.1.0',
    role: 0,
    category: 'AI',
    author: 'Priyanshi || Priyansh',
    shortDescription: 'Artificial Intelligence',
    longDescription: 'Ask Anything To Ai For Your Answers',
  },

  onStart: async function () {},
  onChat: async function ({ message, event, args, api, threadID, messageID }) {
    const ahprefix = PriyaPrefix.find((p) => event.body && event.body.toLowerCase().startsWith(p));
    if (!ahprefix) {
      return;
    }

    const priya = event.body.substring(ahprefix.length).trim();
    if (!priya) {
      await message.reply('𝑄𝑢𝑒𝑒𝑛 𝐼𝑠 𝐻𝑒𝑟𝑒 𝑇𝑜 𝐻𝑒𝑙𝑝 𝑌𝑜𝑢 ✪');
      return;
    }

    const apply = ['𝚎𝚗𝚝𝚎𝚛 (𝚚)*', '𝙷𝚘𝚠 𝙲𝚊𝚗 𝙸 𝙷𝚎𝚕𝚙 𝚈𝚘𝚞?', '𝚀𝚞𝚊𝚛𝚢 𝙿𝚕𝚎𝚊𝚜𝚎....', '𝙷𝚘𝚠 𝙲𝚊𝚗 𝙸 𝙰𝚜𝚒𝚜𝚝 𝚈𝚘𝚞?'];
    const randomapply = apply[Math.floor(Math.random() * apply.length)];

    if (args[0] === 'hi') {
      message.reply(`${randomapply}`);
      return;
    }

    const encodedPrompt = encodeURIComponent(args.join(' '));

    await message.reply('𝚀𝚞𝚎𝚎𝚗 𝚃𝚑𝚒𝚗𝚔𝚒𝚗𝚐.....');

    const response = await axiosInstance.get(`https://priyansh-ai.onrender.com/gemini/ai?query=${encodedPrompt}`);
    const Priya = response.data;
    const priyares = `${Priya}`;

    message.reply(priyares);
  }
};