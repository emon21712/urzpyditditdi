 module.exports = {
	config: {
		name: "birthday",
		version: "1.0",
		author: "Samir",
    aliases: ["birthday"," bday"],
		countDown: 5,
		role: 0,
		category: "USELESS",
    shortDescription: "See Admin's Birthday",
		longDescription: "Admin Birthday Countdowns",
		guide: {
			vi: "{p}{n}",
			en: "{p}{n}"
		} 
	},
  
	onStart: async function ({ event, api }) {
		const t = Date.parse("december 13, 2023 00:00:00") - Date.parse(new Date());
    const seconds = Math.floor( (t/1000) % 60 );
    const minutes = Math.floor( (t/1000/60) % 60 );
    const hours = Math.floor( (t/(1000*60*60)) % 24 );
    const days = Math.floor( t/(1000*60*60*24) );

    return api.sendMessage(`「remaining days for Bot Admin Emon's Birthday.. 」\» ${days} days ${hours} hours ${minutes} minutes ${seconds} seconds «`, event.threadID, event.messageID);
	}
};