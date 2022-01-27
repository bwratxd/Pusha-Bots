const oziayar = require("../Settings/config.json");
const { green } = require("../Settings/config.json");

module.exports = {
    name: "kanal-kur",
    aliases: ["kanal-kur"],

    run: async(client, message, args) => {
    if(!oziayar.OwnerID.includes(message.author.id)) return

    const parent = await message.guild.channels.create('📋 Yetkili basvuru', { type: 'category' });
    await message.guild.channels.create('📋・yetkili-basvuru', { type: 'text', parent: parent.id });
    await message.guild.channels.create('📋・yetkili-basvuru-onay', { type: 'text', parent: parent.id });
    await message.guild.channels.create('📋・yetkili-basvuru-log', { type: 'text', parent: parent.id });

    message.channel.send(`${green} Yetkili kategorisi kurulumu başarıyla tamamlanmıştır.`)

}}