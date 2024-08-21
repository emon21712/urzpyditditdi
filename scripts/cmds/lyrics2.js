
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  config : {
  name: 'lyrics2',
  version: '1.0.5',
  author: 0,
  author: 'JARiF',
  description: 'Get song lyrics.',
  category: "media",
  usages: '/Lyrics [song name]',
  countDown: 5,
},

onStart: async function ({ api, event, args, message }) {
  const { threadID, messageID } = event;
  const query = args.join(' ');

  if (!query) {
    message.reply('Please provide a song name to get lyrics.');
    return;
  }

  try {
    const headers = { 'User-Agent': 'Mozilla/5.0' };
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}+lyrics`;
    const googleResponse = await axios.get(googleUrl, { headers });
    const $ = cheerio.load(googleResponse.data);
    const data = $('div[data-lyricid]');
    let lyrics, authors;

    if (data.length > 0) {
      const content = data.html().replace('</span></div><div.*?>', '\</span>');
      const parse = cheerio.load(content);
      lyrics = parse('span[jsname]').text();
      authors = $('div.auw0zb').text().replace(/(\+)\*/g, '$1 ').trim();
    } else {
      const musixmatchUrl = `https://www.musixmatch.com/search/${encodeURIComponent(query)}`;
      const musixmatchResponse = await axios.get(musixmatchUrl, { headers });
      const mxmMatch = musixmatchResponse.data.match(/<a class="title" href="(.*?)"/);

      if (mxmMatch) {
        const mxmUrl = `https://www.musixmatch.com${mxmMatch[1]}`;
        const mxmResponse = await axios.get(mxmUrl, { headers });
        lyrics = cheerio.load(mxmResponse.data)('.lyrics__content__ok').text();
        authors = cheerio.load(mxmResponse.data)('.mxm-track-title__artist-link').text().replace(/(\+)\*/g, '$1 ').trim();
      }
    }

    if (lyrics && lyrics.trim() !== '') {
      message.reply(`Lyrics:\\${lyrics}\\Author: ${authors || 'Not Found'}`);
    } else {
      message.reply('Sorry, no result found.');
    }
  } catch (error) {
    message.reply(error.message);
  }
}
}