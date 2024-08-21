const axios = require("axios")
module.exports = {
	config: {
		name: "movie",
		version: "1.1",
		author: "Bry",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "",
			en: ""
		},
		longDescription: {
			vi: "",
			en: ""
		},
		category: "UTILITY",
		guide:  {
			vi: "{pn} movie name",
			en: "{pn} movie name"
		}
		
	},

onStart: async function ({ event, message, getLang, usersData, api, args}) {

  let query = args.join(" ")
  if(!query) return message.reply("type the movie name beside the command")
  try{
  let res = await axios.get(`https://api.popcat.xyz/imdb?q=${encodeURIComponent(query)}`)
    
      let title = res.data.title,
        date = res.data.year,
        time = res.data.runtime,
        genres = res.data.genres,
        director = res.data.director,
        actors = res.data.actors,
        plot = res.data.plot
      var poster = res.data.poster;
     // console.log(res)
        message.reply(
        {
          body: `Title: ${title}\n ators: ${actors}\n rlease Date: ${date}\n genres: ${genres}\n drector: ${director}\n plot: ${plot}`,
          attachment: await global.utils.getStreamFromURL(poster)})
  } catch(e){
    console.log(e)
    message.reply("No result found bruh")
  }

            
}
    }