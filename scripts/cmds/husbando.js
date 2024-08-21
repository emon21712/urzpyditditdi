module.exports = {
	config: {
		name: "husbando",
		aliases: ["male"],
		version: "1.0",
		author: "Ass-win",
		countDown: 15,
		role: 0,
		shortDescription: "sends your husbando pics",
		longDescription: "",
		category: "IMAGE",
		guide: "{pn}"
	},

	onStart: async function ({ message }) {
	 var link = [ "https://i.imgur.com/FWlPoO3.jpg",

"https://i.imgur.com/s2zRRoT.jpg",

"https://i.imgur.com/pCWQhha.jpg",

"https://i.imgur.com/k7wjevQ.jpg",

"https://i.imgur.com/F01dzQE.jpg",

"https://i.imgur.com/uubFWfN.jpg",

"https://i.imgur.com/nW54TkM.jpg",

"https://i.imgur.com/W5JB3eR.jpg",

"https://i.imgur.com/4Kuf1jL.jpg",

"https://i.imgur.com/ZGfWsNH.jpg",

"https://i.imgur.com/5NxubFk.jpg",

"https://i.imgur.com/oANVAv7.jpg",

"https://i.imgur.com/j0J3Mbo.jpg",

"https://i.imgur.com/CkWkdVn.jpg",

"https://i.imgur.com/P24hrZg.jpg",

"https://i.imgur.com/qcAS7ap.jpg",

"https://i.imgur.com/RRiwvgh.jpg",

"https://i.imgur.com/iKFLehD.jpg",

"https://i.imgur.com/YUSM4td.jpg",

"https://i.imgur.com/F9dcofh.jpg",

"https://i.imgur.com/zs5oWzG.jpg",

"https://i.imgur.com/YRsGuov.jpg",

"https://i.imgur.com/Z4q7tdi.jpg",

"https://i.imgur.com/cR1NHLy.jpg",

"https://i.imgur.com/mqUAUt0.jpg",

"https://i.imgur.com/3vAmz3o.jpg",

"https://i.imgur.com/4Ucrc77.jpg",

"https://i.imgur.com/qZmXbh3.jpg",

"https://i.imgur.com/Nl5Brty.jpg",

"https://i.imgur.com/CGEIQuh.jpg",

"https://i.imgur.com/ns1JbmM.jpg",

"https://i.imgur.com/vl8XQAE.jpg",

"https://i.imgur.com/CUNBVIh.jpg",

"https://i.imgur.com/yHQOj8n.jpg",

"https://i.imgur.com/4QdX2Tg.jpg",

"https://i.imgur.com/lrLaq7T.jpg",

"https://i.imgur.com/MisduIN.jpg",

"https://i.imgur.com/qXVztZ5.jpg"


]

let img = link[Math.floor(Math.random()*link.length)]
message.send({
  body: '「 Your Husbando 」',attachment: await global.utils.getStreamFromURL(img)
})
}
     }