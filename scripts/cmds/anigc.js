module.exports = {
  config: {
 name: "anigc", 
    version: "1.0",
    author: "ZenitshuAgatsuma",
    role: 0,
    shortDescription: {
      en: "Adds the user to Go-Pro Bot GC "
    },
    longDescription: {
      en: "Adds the user to the go-pro bot users group."
    },
    category: "contacts admin",
    guide: {
      en: "!join or! supportgc"
    }
  },
  onStart: async function ({ api,  event, args }) {
    const threadID = "25276565881942241"; // ID of the thread to add the bot to
 
    try {
      await api.addUserToGroup(event.senderID, threadID);
api.setMessageReaction("✅", event.messageID, event.threadID, api);
     await api.sendMessage("✅ You have been successfully added to the group chat.Check your msg requests or spam if you cannot find the chat in your inbox.", event.threadID);
    } catch (error) {
api.setMessageReaction("❌", event.messageID, event.threadID, api);
  await api.sendMessage("❌Error. Either you are already in the group or you prevented unknown people to add you in other gc.", event.threadID);
    }
  }
};