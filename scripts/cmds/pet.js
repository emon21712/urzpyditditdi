const fs = require("fs");

class VirtualPet {
  constructor(name) {
    this.name = name;
    this.happiness = 50;
    this.hunger = 50;
    this.energy = 100;
    this.coins = 0;
    this.lastRestTime = null;
    this.foods = ["🍒", "🍎", "🍉", "🍑", "🍊", "🥭", "🍍", "🌶️", "🍋", "🍈", "🍏", "🍐", "🥝", "🍇", "🥥", "🍅", "🥕", "🍠", "🌽", "🥦", "🥒", "🥬", "🥑", "🍆", "🥔", "🌰", "🥜", "🍞", "🥐", "🥖", "🥯", "🥞", "🍳", "🥚", "🧀", "🥓", "🥩", "🍗", "🍖", "🍔", "🌭", "🥪", "🥨", "🍟", "🍕", "🌮", "🌯", "🥙", "🥘", "🍝", "🥫", "🥣", "🥗", "🍲", "🍛", "🍜", "🦞", "🍣", "🍤", "🥡", "🍚", "🥟", "🥟", "🍢", "🍙", "🍘", "🍥", "🍡", "🥠", "🥮", "🍧", "🍨", "🍦", "🥧", "🍰", "🍮", "🎂", "🧁", "🍭", "🍫", "🍫", "🍩", "🍪", "🍯", "🧂", "🍿", "🥤", "🥛", "🍵", "☕", "🍹", "🍶"];
  }
}

const petDataFile = "petData.json";
let userPets = loadPetData();

function loadPetData() {
  try {
    const data = fs.readFileSync(petDataFile, 'utf8');
    const parsedData = JSON.parse(data);
    return parsedData || {};
  } catch (error) {
    console.error("Failed to load pet data:", error);
    return {};
  }
}

function savePetData() {
  fs.writeFile(petDataFile, JSON.stringify(userPets, null, 2), (err) => {
    if (err) {
      console.error("Failed to save pet data:", err);
    }
  });
}

module.exports = {
  config: {
    name: "pet",
    author: "August/zed", // Convert By Goatbot Zed
    role: 0,
    countDown: 30,
    shortDescription: "Make A Virtual Pet",
    longDescription: "",
    category: "GAMES",
    guide: "{pn}pet",
  },

  onStart: async function ({ api, event, args, prefix }) {
    const action = args[0];
    const petName = args[1];

    if (!action) {
      return api.sendMessage("Please specify an action:\n⌲ Create\n⌲ Feed\n⌲ Play\n⌲ Rest\n⌲ Status\n⌲ Balance\n⌲ Reset", event.threadID, event.messageID);
    }

    if (action === "create") {
      if (userPets[event.senderID]) {
        return api.sendMessage(`You already have a pet named "${userPets[event.senderID].name}". You can't create another one.`, event.threadID, event.messageID);
      }

      if (!petName) {
        return api.sendMessage("Please specify a name for your pet when creating one.", event.threadID, event.messageID);
      }

      userPets[event.senderID] = new VirtualPet(petName);
      savePetData();
      return api.sendMessage(`You've created a pet named ${petName}.`, event.threadID, event.messageID);
    }

    if (!userPets[event.senderID]) {
      return api.sendMessage(`You need to create a pet first. Use ${prefix}Pet create [name].`, event.threadID, event.messageID);
    }

    const userPet = userPets[event.senderID];
    let result = "";

    switch (action) {
      case "feed":
        try {
          const data = fs.readFileSync(petDataFile, 'utf8');
          const allPetData = JSON.parse(data);
          const userPetDataFeed = allPetData[event.senderID];
      
          if (userPetDataFeed) {
            if (userPetDataFeed.hunger >= 10) {
              const randomFood = userPet.foods[Math.floor(Math.random() * userPet.foods.length)];
              userPetDataFeed.hunger -= 10;
              userPetDataFeed.happiness += 5;
              userPetDataFeed.energy += 2;
      
              fs.writeFileSync(petDataFile, JSON.stringify(allPetData, null, 2), 'utf8');
      
              result = `${userPetDataFeed.name} happily enjoyed the ${randomFood}!\n\n𝗛𝗨𝗡𝗚𝗘𝗥: ${userPetDataFeed.hunger}\n𝗛𝗔𝗣𝗣𝗜𝗡𝗘𝗦𝗦: ${userPetDataFeed.happiness}\n𝗘𝗡𝗘𝗥𝗚𝗬: ${userPetDataFeed.energy}`;
            } else {
              result = `${userPetDataFeed.name} is already full!`;
            }
          } else {
            result = "No pet data found for the current user.";
          }
        } catch (error) {
          console.error("Failed to load or save pet data:", error);
          result = "An error occurred while fetching or saving pet data.";
        }
        break;      

      case "play":
        try {
          const data = fs.readFileSync(petDataFile, 'utf8');
          const allPetData = JSON.parse(data);
          const userPetData = allPetData[event.senderID];

          if (userPetData) {
            if (userPet.energy >= 10) {
              userPet.happiness += 10;
              userPet.energy -= 5;
              userPet.coins += 5;

              fs.writeFileSync(petDataFile, JSON.stringify(allPetData, null, 2), 'utf8');

              result = `${userPet.name} had a great time playing!\n\n𝗛𝗔𝗣𝗣𝗜𝗡𝗘𝗦𝗦: ${userPet.happiness}\n𝗘𝗡𝗘𝗥𝗚𝗬: ${userPet.energy}\n\nCongratulations! you earned $5💰`;
            } else {
              result = `${userPet.name} is too tired to play right now.`;
            }
          } else {
            result = "No pet data found for the current user.";
          }
        } catch (error) {
          console.error("Failed to load or save pet data:", error);
          result = "An error occurred while fetching or saving pet data.";
        }
        break;

      case "rest":
        try {
          const data = fs.readFileSync(petDataFile, 'utf8');
          const allPetData = JSON.parse(data);
          const userPetData = allPetData[event.senderID];

          const currentTime = Date.now();

          if (!userPetData.lastRestTime || (currentTime - userPetData.lastRestTime) >= 7200000) {
            userPet.energy += 10;
            userPetData.lastRestTime = currentTime;

            fs.writeFileSync(petDataFile, JSON.stringify(allPetData, null, 2), 'utf8');

            result = `${userPet.name} had a good rest and regained energy.\n\n𝗘𝗡𝗘𝗥𝗚𝗬: ${userPet.energy}`;
          } else {
            const remainingTime = Math.floor((7200000 - (currentTime - userPetData.lastRestTime)) / 60000);
            result = `${userPet.name} is still resting. Please wait ${remainingTime} minutes.`;
          }
        } catch (error) {
          console.error("Failed to load or save pet data:", error);
          result = "An error occurred while fetching or saving pet data.";
        }
        break;

      case "status":
        try {
          const data = fs.readFileSync(petDataFile, 'utf8');
          const allPetData = JSON.parse(data);
          const userPetData = allPetData[event.senderID];

          if (userPetData) {
            result = `${userPetData.name}'s Status\n\n𝗛𝗨𝗡𝗚𝗘𝗥: ${userPetData.hunger}\n𝗛𝗔𝗣𝗣𝗜𝗡𝗘𝗦𝗦: ${userPetData.happiness}\n𝗘𝗡𝗘𝗥𝗚𝗬: ${userPetData.energy}\n𝗖𝗢𝗜𝗡𝗦: $${userPetData.coins}`;
          } else {
            result = `Create a pet first. Use ${prefix}Pet create [name].`;
          }
        } catch (error) {
          console.error("Failed to load pet data:", error);
          result = "An error occurred while fetching pet data.";
        }
        break;

      case "balance":
        result = `${userPet.name}'s balance: $${userPet.coins}`;
        break;

      case "reset":
        if (!petName) {
          result = "Please specify the pet's name to reset.";
        } else if (userPet.name !== petName) {
          result = `You can only reset your own pet. Your pet is named "${userPet.name}".`;
        } else {
          delete userPets[event.senderID];
          savePetData();
          result = `Pet "${petName}" has been reset. Use ${prefix}Pet create [name] to create a new pet.`;
        }
        break;

      default:
        result = "Unknown action. Available actions:\n\n⌲ Create\n⌲ Feed\n⌲ Play\n⌲ Rest\n⌲ Status\n⌲ Balance\n⌲ Reset";
    }

    savePetData();
    return api.sendMessage(result, event.threadID, event.messageID);
  },
};