const axios = require('axios');
const stringSimilarity = require('string-similarity');

module.exports = {
 config: {
 name: 'chat',
 version: '1.1',
 author: 'JARiF',
 category: "simSimi-bn",
 cooldown: 0,
 role: 0,
 },

 onStart: async function ({ api, args, message, event }) {
 try {
 const simsimiBN = args.join(' ');
 if (!simsimiBN) {
 message.reply(`You can't tell me something?`);
 return;
 }

 const apiUrl = `https://simsimi.vyturex.com/chat?ques=${encodeURIComponent(simsimiBN)}`;
 const response = await axios.get(apiUrl);
 const chatAnswer = response.data;

 if (!chatAnswer) {
 message.reply('What? :)');
 } else {
 message.reply(chatAnswer);
 }

 } catch (error) {
 message.reply('Error occurred: ' + error.message);
 }
 }
};