const oziayar = require("../Settings/config.json");
const { green } = require("../Settings/config.json");

module.exports = {
    name: "emoji-kur",
    aliases: ["emoji-kur"],

    run: async(client, message, args) => {
    if(!oziayar.OwnerID.includes(message.author.id)) return
  const emojis = [
        { name: "green", url: "https://cdn.discordapp.com/emojis/716657219457777674.gif?size=96" },
        { name: "red", url: "https://cdn.discordapp.com/emojis/915754675742081076.gif?size=96" },
        { name: "star", url: "https://cdn.discordapp.com/emojis/920340166604890224.gif?size=96" },
        { name: "cizgi", url: "https://cdn.discordapp.com/emojis/916013869816745994.gif?size=96" }
    ]
    emojis.forEach(async (x) => {
      const emoji = await message.guild.emojis.create(x.url, x.name);
      message.channel.send(`\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`);
    });
}}