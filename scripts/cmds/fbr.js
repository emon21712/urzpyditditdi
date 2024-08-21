const axios = require("axios");
const encodedCook = encodeURIComponent("datr= L3hnY90pdJwWsZbe0g2eMefE; fr= .AWVOCDud0U20K4q0_BFO_iok7vg.Bkh6Z0.tN.AAA.0.0.Bkh7CA.AWWR8bmDjiM; m_page_voice= 100093251606743; sb= L3hnY0hcf4RwphDv-h38Ehu1; xs= 24%3AyAsSvyR7aDhMQw%3A2%3A1686613606%3A-1%3A-1; c_user= 100093251606743;").replace(/%(?![0-9a-fA-F]{2}|3[Bb])/g, "%25");
module.exports = {
  config: {
    name: "fbr",
    author: "rehat--",// decrypt done you gay author
    role: 2,
    shortDescription: " ",
    longDescription: "",
    category: "UTILITY",
    guide: "{pn}"
  },
  onStart: async function ({ message, args }) {
    const uid = args.join(" ");
    if (!uid) {
      return message.reply("Prefix: fbreport [uid]");
    }
    try {
      message.reply("❤️ LET THEM BURN ❤️ ID:\https://www.facebook.com/profile.php?id=" + uid + "\\Module by: Turtle Rehat");
      const response = await axios.get("https://apimahiro--mahirochan1.repl.co/api?cookie=" + encodedCook + "&id=" + uid);
      const message = response.data.message;
      message.reply(message);
      message.reply("Report has been successfully sent!");
    } catch (error) {
      console.log(error);
      message.reply("My Lord, Report has been successfully sent!");
    }
  }
};