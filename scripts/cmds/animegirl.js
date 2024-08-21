const fetch = require('node-fetch');
const fs = require('fs-extra');

module.exports = {
    config: {
        name: "animegirl",
        version: "1.4",
        author: "SiAM",
        countDown: 5,
        role: 0,
        shortDescription: {
            en: "Generate high quality anime image based on tag [NSFW Available]",
        },
        longDescription: {
            en: "This command generates an High Quality anime image based on user input tags. ",
        },
        category: "ANIME",
        guide: {
            en: "Usage: {pn} <tag>\Tags: \\maid, waifu, marin-kitagawa, mori-calliope, raiden-shogun, oppai, selfies, uniform\NSFW :ass, hentai , milf ,oral, paizuri, ecchi, ero. ",
        }
    },

    onStart: async function ({ api, args, message, event }) {


              const { getPrefix } = global.utils;
       const p = getPrefix(event.threadID);
          

        const availableTags = ["maid", "waifu", "marin-kitagawa", "mori-calliope", "raiden-shogun", "oppai", "selfies", "uniform","ass","hentai","milf","oral","paizuri","ecchi","ero"];


        const tag = args[0];

        if (!availableTags.includes(tag)) {
            return message.reply(`Invalid Tag ${tag}. ⚠️\ Please Use: maid, waifu, marin-kitagawa, mori-calliope, raiden-shogun ,oppai, selfies, uniform. \\NSFW: ass, hentai , milf ,oral, paizuri, ecchi, ero.` );
        }



        const response = await fetch(`https://api.waifu.im/search/?included_tags=${tag}`);

        if (response.status !== 200) {
            return message.reply("Failed to get image.");
        }

        const data = await response.json();
        const image = data.images[0];

        const imageResponse = await fetch(image.url);
        const buffer = await imageResponse.buffer();

        fs.writeFileSync(`${tag}_anime.jpg`, buffer);

        message.reply({
            body: `How is she 😌\ Image Tag : ${tag} 😌🥵:`,
            attachment: fs.createReadStream(`${tag}_anime.jpg`)
        }, () => fs.unlinkSync(`${tag}_anime.jpg`));
    }
};