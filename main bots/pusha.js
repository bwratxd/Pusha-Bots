const { Client, Collection, Discord } = require("discord.js");
require("discord-reply")
const client = (global.client = new Client({ fetchAllMembers: true }));
require('discord-buttons')(client)
const settings = require("./src/configs/settings.json");
const conf = require("./src/configs/sunucuayar.json");
const { Mute2, Unmute} = require("./src/configs/emojis.json");
const fs = require("fs");
client.commands = new Collection();
client.aliases = new Collection();
client.invites = new Collection();
client.cooldown = new Map();

const map = new Map();
const lımıt = 4;
const TIME = 180000;
const DIFF = 2000;

//RANK KISMI//
client.ranks = [
  { role: "923331950956150806", coin: 10000 },
  { role: "923331950956150807", coin: 12000 },
  { role: "923331950956150808", coin: 14000 },
  { role: "923331950956150809", coin: 18000 },
  { role: "923331950956150810", coin: 20000 },
  { role: "923331950956150811", coin: 22000 },
  
  { role: "923331950918369408", coin: 24000 },
  { role: "923331950918369409", coin: 24000 }, 
  { role: "923331950939365403", coin: 24000 }, 
  { role: "923331950939365404", coin: 24000 }, 

  { role: "923331950956150813", coin: 24000 },
  { role: "923331950956150814", coin: 26000 },
  { role: "923331950972923924", coin: 28000 },
  { role: "923331950972923925", coin: 30000 },
  { role: "923331950972923926", coin: 32000 },

  { role: "923331950939365396", coin: 34000 },
  { role: "923331950939365397", coin: 34000 },

  { role: "923331950972923930", coin: 34000 },
  { role: "923331950972923931", coin: 38000 },
  { role: "923331950972923932", coin: 40000 },
  ]

  //KOMUT ÇALIŞTIRMA
fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`[pusha] ${files.length} komut yüklenecek.`);
  files.forEach(f => {
    fs.readdir("./src/commands/" + f, (err2, files2) => {
      files2.forEach(file => {
        let props = require(`./src/commands/${f}/` + file);
        console.log(`[pusha KOMUT] ${props.conf.name} komutu yüklendi!`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
          client.aliases.set(alias, props.conf.name);
        });
      })
    })
  });
});
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(settings.token)
  .then(() => console.log("Bot Başarıyla Bağlandı!"))
  .catch(() => console.log("[HATA] Bot Bağlanamadı!"));

setInterval(() => {
  let GuildID = "923331950779990087"
  let OneMonth = "923331950826094748"
  let ThreeMonth = "923331950826094749"
  let SixMonth = "923331950826094750"
  let NineMonth = "923331950826094751"
  let OneYear = "923331950826094752"
  const server = client.guilds.cache.get(GuildID); 
  server.members.cache.forEach(async member => {
if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 30) {await member.roles.add(OneMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 90) {await member.roles.remove(OneMonth)
  await member.roles.add(ThreeMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 180) {await member.roles.remove(ThreeMonth)
await member.roles.add(SixMonth)}

if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 270) {await member.roles.remove(SixMonth)
  await member.roles.add(NineMonth)}

  if(Date.now() - member.joinedAt > 1000 * 60 * 60 * 24 * 365) {await member.roles.remove(NineMonth)
    await member.roles.add(OneYear)}

        })
  }, 1000 * 60 * 60 * 24 * 7)


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on("message", msg => {
  let InviteGuardReg = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;  
    if (InviteGuardReg.test(msg.content)) {
      try {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
              msg.delete();
              msg.delete();
              msg.delete();
                return msg.reply('Reklam yapman yasak!').then(ozixd => ozixd.delete({ timeout: 3000 }));

        }              
      } catch(err) {
        console.log(err);
      }
    }
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.guild) return
  if (message.member.hasPermission("ADMINISTRATOR")) return;
  if (message.member.roles.cache.get(conf.chatMute)) return;
    if (map.has(message.author.id)) {
      const userData = map.get(message.author.id);
      const { lastMessage, timer } = userData;
      const difference = message.createdTimestamp - lastMessage.createdTimestamp;
      let msgCount = userData.msgCount;

      if (difference > DIFF) {
          clearTimeout(timer);
          userData.msgCount = 1;
          userData.lastMessage = message;
          userData.timer = setTimeout(() => {
              map.delete(message.author.id);
          }, TIME);
          map.set(message.author.id, userData)
      }
      else {
          msgCount++;
          if (parseInt(msgCount) === lımıt) {
        let messages = await message.channel.messages.fetch({ limit: 100 });
        let filtered = messages.filter((x) => x.author.id === message.author.id).array().splice(0, 7);
        message.channel.bulkDelete(filtered);
              message.member.roles.add(conf.chatMute);
              message.channel.send(`${Mute2} Sohbet kanallarını kirletme sebebiyle \`3 dakika\` süresince susturuldunuz, mesajlar temizlendi. Lütfen yavaşlayın. ${message.author}`).then(ozixd => ozixd.delete({ timeout: 5000 }))

              setTimeout(() => {
                  message.member.roles.remove(conf.chatMute);
                  message.channel.send(`${Unmute} Sohbet kanallarını kirletme sebebiyle 3 dakika süresince susturmanız bitti. Lütfen tekrarlamayınız. ${message.author}`).then(ozixd => ozixd.delete({ timeout: 5000 }))
              }, 180000);//9000000
          } else {
              userData.msgCount = msgCount;
              map.set(message.author.id, userData)
          }
      }
  }
  else {
      let fn = setTimeout(() => {
          map.delete(message.author.id)
      }, TIME);
      map.set(message.author.id, {
          msgCount: 1,
          lastMessage: message,
          timer: fn
      })
  }
});

const mentionRegex = /<@!?&?\d+>/g;
 
client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return
  if (message.member.hasPermission('ADMINISTRATOR')) return;

if (mentionRegex.test(message.content) && message.content.match(mentionRegex).length >= 4) {
      message.member.roles.add(conf.chatMute);
      message.channel.send(`${Mute2} Birden çok kişiyi etiketlediğin için \`15 dakika\` boyunca susturuldun. ${message.author}`);
      setTimeout(() => {
          message.member.roles.remove(conf.chatMute);
     message.channel.send(`${Unmute} Birden çok kişiyi etiketleme sebebiyle olan, Muten açıldı lütfen tekrar insanları etiketleme. ${message.author}`)
      }, 900000);//9000000
      if (message.deletable) message.delete({ timeout: 5000 }).catch(console.error);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////