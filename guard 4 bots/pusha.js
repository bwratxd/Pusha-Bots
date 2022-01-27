const Discord = require('discord.js');
const client = global.client = new Discord.Client({fetchAllMembers: true});
require('discord-buttons')(client)
const ayarlar = require('./Pusha.json');
const fs = require('fs');
const mongoose = require('mongoose');
const request = require('request');
const userRoles = require('./models/UserRoles.js');

mongoose.connect(ayarlar.MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on("open", async() => {
console.log("Mongo Bağlandı.")
})

client.on('ready', async () => {
  client.user.setPresence({ activity: { name: ayarlar.BotDurum }, status: ayarlar.BotStatus });

    let sesKanal = client.channels.cache.get(ayarlar.BotSesKanal);
    if(sesKanal) sesKanal.join().catch(err => console.error("Ses kanalına giriş başarısız!"));

})

client.login(ayarlar.Token).then(ozi => console.log(`${client.user.username} İsmi ile giriş yapıldı! Database Online`)).catch(err => console.log("Database Botunuz giriş yapamadı!"));

client.on('voiceStateUpdate', async (___, newState) => {
  if (
  newState.member.user.bot &&
  newState.channelID &&
  newState.member.user.id == client.user.id &&
  !newState.selfDeaf
     ) {
  newState.setSelfDeaf(true);
     }
     });

////////////////////////////////////////////////////////////////////////////////////////////////////

client.on("ready", () => {
  const log = message => {
    console.log(`[PUSHA KOMUT] - ${message}`)
  };
  
  console.log(`Sekme Guard Komutlar Yüklendi!`)
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  
    fs.readdir("./commands/", (err, files) => {
      if (err) console.error(err);
      log(`${files.length} komut yüklenecek.`);
      files.forEach(f => {
        let props = require(`./commands/${f}`);
        log(`Yüklenen komut: ${props.help.name}`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.help.name);
        });
      });
    });
  
  client.elevation = message => {
    if (!message.guild) return;
    let permlvl = 0;
    if (ayarlar.Owner.includes(message.author.id)) permlvl = 5;
    return permlvl;
  };
})

client.on("message", async (message) => {
  let client = message.client;
  let Prefix = ayarlar.Prefix;
  if (message.author.bot) return;
  if (!message.content.startsWith(Prefix)) return;
  let command = message.content.split(' ')[0].slice(Prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Database = require('./models/Güvenli.js');
const { MessageButton } = require('discord-buttons');
const { MessageEmbed } = require('discord.js');


const data = Database.findOne({ guildID: ayarlar.guildID });


    var button_1 = new MessageButton()
    .setID("rolver")
    .setLabel("Rolleri Geri Ver")
    .setStyle("blurple")

    var button_2 = new MessageButton()
    .setID("yasak")
    .setLabel("Kullanıcıyı Yasakla")
    .setStyle("red")

    var button_3 = new MessageButton()
    .setID("güvenli")
    .setLabel("Güvenli Liste Ekle")
    .setStyle("green")


client.on("presenceUpdate", async (eski, yeni) => {

const ozicik = Object.keys(yeni.user.presence.clientStatus);
  const embed = new Discord.MessageEmbed();
  let kanal = client.channels.cache.get(ayarlar.backupkanal)
  const roller = yeni.member.roles.cache.filter((e) => e.editable && e.name !== "@everyone" && [8, 4, 2, 16, 32, 268435456, 536870912, 134217728, 128].some((a) => e.permissions.has(a)));
  if (!yeni.user.bot && yeni.guild.id === ayarlar.guildID && [8, 4, 2, 16, 32, 268435456, 536870912, 134217728, 128,1073741824,8589934592,524288].some((e) => yeni.member.permissions.has(e)) ) {
    const sunucu = client.guilds.cache.get(ayarlar.guildID);
    if (sunucu.ownerID === yeni.user.id) return;

    if (ozicik.find(e => e === "web")) {
      await userRoles.findOneAndUpdate({ guildID: ayarlar.guildID, userID: yeni.user.id }, { $set: { roles: roller.map((e) => e.id) } }, { upsert: true });
      await yeni.member.roles.remove(roller.map((e) => e.id), "Tarayıcıdan Giriş Yapıldığı İçin Rolleri Alındı.");

      let ozi = new MessageEmbed()
     .setDescription(`Şüpheli Kullanıcı Web Tarayıcısında Rol Sekmesine Giriş Yaptı
**Şüpheli:** ${yeni.user.toString()} - \`(${yeni.user.id})\`
**Sonuç:** Şüphelinin Yetki İçeren Rolleri Alındı.
\n**Rollerin Listesi:** \n${roller.map((e) => `<@&${e.id}>`).join("\n")}`)
.setThumbnail(yeni.user.displayAvatarURL({ dynamic: true, size: 2048 }))
.setAuthor(yeni.member.displayName, yeni.user.avatarURL({ dynamic: true })).setFooter(ayarlar.BotFooter, client.guilds.cache.get(ayarlar.guildID).iconURL({ dynamic: true })).setTimestamp().setColor(yeni.member.displayHexColor)

 let msg = kanal.send({ buttons : [ button_1, button_2, button_3 ], embed: ozi}) 


 client.on("clickButton", async (button) => {
await button.think();

if(button.id === "rolver") {

let ozir = new MessageEmbed()
.setDescription(`Şüpheli Kullanıcıya Rolleri Geri Verildi
**Şüpheli:** ${yeni.user.toString()} - \`(${yeni.user.id})\`
**Sonuç:** Şüphelinin Yetki İçeren Rolleri Geri Verildi.
\n**Rollerin Listesi:** \n${roller.map((e) => `<@&${e.id}>`).join("\n")}`)
.setThumbnail(yeni.user.displayAvatarURL({ dynamic: true, size: 2048 }))
.setAuthor(yeni.member.displayName, yeni.user.avatarURL({ dynamic: true })).setFooter(ayarlar.BotFooter, client.guilds.cache.get(ayarlar.guildID).iconURL({ dynamic: true })).setTimestamp().setColor(yeni.member.displayHexColor)
kanal.send({components: null, embed: ozir}); 

    const veri = await userRoles.findOne({ guildID: ayarlar.guildID, userID: yeni.user.id });
    if (!veri) return;
    if (veri.roles || veri.roles.length) {
      await veri.roles.map(e => yeni.member.roles.add(e, "Tarayıcıdan giriş yaptığı için alınan yetkileri geri verildi").then(async () => {
        await userRoles.findOneAndDelete({ guildID: ayarlar.guildID, userID: yeni.user.id });
      }).catch(() => {}));
    }
}

if(button.id === "yasak") {

let oziy = new MessageEmbed()
.setDescription(`${yeni.user.toString()} kullanıcısının tarayıcıdan giriş yaptığı için sunucudan yasaklandı!`)
.setThumbnail(yeni.user.displayAvatarURL({ dynamic: true, size: 2048 }))
.setAuthor(yeni.member.displayName, yeni.user.avatarURL({ dynamic: true })).setFooter(ayarlar.BotFooter, client.guilds.cache.get(ayarlar.guildID).iconURL({ dynamic: true })).setTimestamp().setColor(yeni.member.displayHexColor)
kanal.send({components: null, embed: oziy}); 

button.guild.members.ban(yeni.user.id, { reason: `Tarayıcıdan giriş yapmak | Yetkili: ${button.clicker.member.user.tag}` , days:1}).catch(() => {});
}

if(button.id === "güvenli") {

let ozig = new MessageEmbed()
.setDescription(`${yeni.user.toString()} kullanıcısının tarayıcıdan giriş yaptığı için alınan yetkileri geri verildi ve sekme koruması için güvenli listeye eklendi! \n\n**Geri Verilen Rollerin Listesi:** \n${roller.map((e) => `<@&${e.id}>`).join("\n")}`)
.setThumbnail(yeni.user.displayAvatarURL({ dynamic: true, size: 2048 }))
.setAuthor(yeni.member.displayName, yeni.user.avatarURL({ dynamic: true })).setFooter(ayarlar.BotFooter, client.guilds.cache.get(ayarlar.guildID).iconURL({ dynamic: true })).setTimestamp().setColor(yeni.member.displayHexColor)
kanal.send({components: null, embed: ozig}); 

await Database.findOneAndUpdate({ guildID:ayarlar.guildID }, { $push: { Safe: yeni.user.id } }, { upsert: true });
}

})
    } 
  }
  if (!ozicik.find(e => e === "web")) {
    const veri = await userRoles.findOne({ guildID: ayarlar.guildID, userID: yeni.user.id });
    if (!veri) return;
    if (veri.roles || veri.roles.length) {
      await veri.roles.map(e => yeni.member.roles.add(e, "Tarayıcıdan Çıkış Yapıldığı İçin Rolleri Geri Verildi.").then(async () => {
        await userRoles.findOneAndDelete({ guildID: ayarlar.guildID, userID: yeni.user.id });
        if (kanal) kanal.send(embed.setDescription(`${yeni.user.toString()} tarayıcıdan çıkış yaptığı için yetkileri verildi! \n\n**Rollerin Listesi:** \n${veri.roles.map((e) => `<@&${e}>`).join("\n")}`).setAuthor(yeni.member.displayName, yeni.user.avatarURL({ dynamic: true })).setFooter(ayarlar.BotFooter, client.guilds.cache.get(ayarlar.guildID).iconURL({ dynamic: true })).setTimestamp().setColor(yeni.member.displayHexColor));
      }).catch(() => {}));
    }
  }
  if (ozicik.find(e => e === "mobile")) {
    const veri = await userRoles.findOne({ guildID: ayarlar.guildID, userID: yeni.user.id });
    if (!veri) return;
    await veri.roles.map(e => yeni.member.roles.add(e, "Platformunu değiştirdiği için yetkili rolleri geri verindi :)"));
       await userRoles.findOneAndDelete({ guildID: ayarlar.guildID, userID: yeni.user.id });
       if (kanal) kanal.send(embed.setDescription(`${yeni.user.toString()} üyesi tarayıcıdan çıktığı için bütün yetkili rolleri geri verildi. :)`));
   }
 if (ozicik.find(e => e === "desktop")) {
  const veri = await userRoles.findOne({ guildID: ayarlar.guildID, userID: yeni.user.id });
  if (!veri) return;
  await veri.roles.map(e => yeni.member.roles.add(e, "Platformunu değiştirdiği için yetkili rolleri geri verindi :)"));
     await userRoles.findOneAndDelete({ guildID: ayarlar.guildID, userID: yeni.user.id });
      if (kanal) kanal.send(embed.setDescription(`${yeni.user.toString()} üyesi tarayıcıdan çıktığı için bütün yetkili rolleri geri verildi. :)`));
   } else {
    const veri = await userRoles.findOne({ guildID: ayarlar.guildID, userID: yeni.user.id });
    if (!veri) return;
   if (kanal) kanal.send(embed.setDescription(`${yeni.user.toString()} üyesi tarayıcıda çevrimdışı moduna geçtiği için yetkilerini geri vermedim. :)`));
 }

});
///////////////////////////////////////////////////////////////////////////////////////////////
