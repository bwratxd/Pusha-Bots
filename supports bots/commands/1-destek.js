const { Discord, MessageEmbed} = require("discord.js");
const oziayar = require("../Settings/config.json");
const { green , red } = require("../Settings/config.json");
const { MessageActionRow, MessageButton } = require('discord-buttons');

module.exports = {
    name: "destek",
    aliases: ["destek"],

    run: async (client, message, args, embed, prefix) => {

      var istek = new MessageButton()
      .setID("istek")
      .setLabel("Öneri/İstek")
      .setStyle("green")

      var sikayet = new MessageButton()
      .setID("sikayet")
      .setLabel("Şikayet")
      .setStyle("red")

      var evet = new MessageButton()
      .setID("evt")
      .setLabel("Evet")
      .setStyle("green")

      var hayır = new MessageButton()
      .setID("hyr")
      .setLabel("Hayır")
      .setStyle("red")

      const row = new MessageActionRow()
      .addComponent(evet)
      .addComponent(hayır)

      let msg = await message.channel.send(`Lütfen **20 saniye** içerisinde hangi hizmeti kullanmak istediğinizi aşağıdaki butonlara tıklayarak belirtin.`,{buttons: [istek,sikayet]})

    var filter = (button) => button.clicker.user.id === message.author.id;
    let ozi = msg.createButtonCollector(filter, { time: 20000 })

      ozi.on("collect", async (button) => {

        const filter = m => m.author === message.author;
				var cevaplar = {};
        istek: cevaplar["Öneri"]

      if(button.id === "istek") {
await button.reply.defer()
      msg.edit(`Lütfen 60 saniye içerisinde önerinizi belirtiniz.`,{components: null});

        message.channel.awaitMessages(filter, { max: 1 }).then(async function (collected) {
        collected.each(msj => cevaplar["Öneri"] = msj.content);

      msg.edit(`Öneriniz başarıyla iletildi!`,{components: null});

let channel = client.channels.cache.get(oziayar.ÖneriİstekChannelID)
const ozi = new MessageEmbed()
.setAuthor("Öneri / İstek", client.user.avatarURL())
.setFooter(message.author.tag, message.author.avatarURL())
.setDescription(`**Gönderen:** ${message.author} - \`${message.author.id}\``)
.setTimestamp()
.addField("Mesaj İçeriği", cevaplar["Öneri"])
.setColor("RANDOM")
await channel.send({ embed: ozi })
})

}

      if(button.id === "sikayet") {
await button.reply.defer()
      msg.edit(`Lütfen 60 saniye içerisinde şikayetinizi belirtiniz.`,{components: null}); 

        message.channel.awaitMessages(filter, { max: 1 }).then(async function (collected) {
        collected.each(msj => cevaplar["Şikayet"] = msj.content);

      msg.edit(`Şikayetiniz başarıyla iletildi!`,{components: null});

let channel = client.channels.cache.get(oziayar.SikayetChannelID)
const ozi = new MessageEmbed()
.setAuthor("Şikayet", client.user.avatarURL())
.setFooter(message.author.tag, message.author.avatarURL())
.setDescription(`**Gönderen:** ${message.author} - \`${message.author.id}\``)
.setTimestamp()
.addField("Mesaj İçeriği", cevaplar["Şikayet"])
.setColor("RANDOM")
await channel.send({ embed: ozi })
})
}

});


}}