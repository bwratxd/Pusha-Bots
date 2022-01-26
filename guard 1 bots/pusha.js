const Discord = require("discord.js");
const pusha1 = require("discord.js");
const client1 = new pusha1.Client();
const ayarlar = require('./ayarlar.json');
const config = require('./pusha.json');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];
client1.on("guildMemberUpdate", async (oldMember, newMember) => {
  if (newMember.roles.cache.size > oldMember.roles.cache.size) {
  let entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
  if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
  if(config.bots.includes(entry.executor.id)) return;
  if(config.owners.includes(entry.executor.id)) return;
  if(config.guvenlid.includes(entry.executor.id)) return;

  const uyecik = newMember.guild.members.cache.get(entry.executor.id);
  if(yetkiPermleri.some(p => !oldMember.hasPermission(p) && newMember.hasPermission(p))) {
  newMember.roles.set(oldMember.roles.cache.map(r => r.id));
    uyecik.guild.members.ban(entry.executor.id, { reason: `pusha System | İzinsiz Yönetici Verme!` }).catch(e => { })	


  let channel = client1.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('Rol Verme Koruma Logu Yok!');
  const pusha = new Discord.MessageEmbed()
  .setColor(ayarlar.color)
    .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
.setDescription(`${entry.executor} üyesi izinsiz yönetici rolü verdi ve üyeden rolü alıp, rolü veren kişiyi banladım.\n─────────────────────\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\nKullanıcı: ${newMember.user} - \`${newMember.id}\`\n─────────────────────\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  channel.send(`@here`, {embed: pusha}).catch(e => { })	
        };
      };
    });

client1.on("guildMemberUpdate", async (oldMember, newMember) => {
  let guild = newMember.guild;
  if(oldMember.nickname != newMember.nickname){
  let logs = await guild.fetchAuditLogs({limit: 5, type:"MEMBER_UPDATE"}).then(e => e.entries.sort((x, y) => y.createdTimestamp - x.createdTimestamp));
  let log = logs.find(e => ((Date.now() - e.createdTimestamp) / (1000)) < 5);
  if(!log) return;
  if(oldMember.user.id === log.executor.id) return
  if(config.bots.includes(log.executor.id)) return;
  if(config.owners.includes(log.executor.id)) return;
  if(config.guvenlid.includes(log.executor.id)) return;

  const uyecik = newMember.guild.members.cache.get(log.executor.id);
  uyecik.roles.set([ayarlar.karantinarol]).catch(err => {})
    
  let channel = client1.channels.cache.get(ayarlar.defenderlog)
  if (!channel) return console.log('İsim Koruma Logu Yok!');
  const pusha = new Discord.MessageEmbed()
  .setColor(ayarlar.color)
  .setThumbnail(log.executor.avatarURL({ dynamic: true }))
  .setDescription(`${log.executor} üyesi izinsiz isim güncelledi ve kullanıcıyı karantina attım.\n─────────────────────\nYetkili: (${log.executor} - \`${log.executor.id}\`)\nİsim: \`${oldMember.nickname}\` - \`${newMember.nickname}\`\n─────────────────────\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
  channel.send(`@here`, {embed: pusha}).catch(e => { })	
return;
      }
    });

    client1.on("webhookUpdate", async (channel) => {
      const entry = await channel.guild.fetchAuditLogs({type: 'WEBHOOK_CREATE'}).then(audit => audit.entries.first());
      if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
      if(config.bots.includes(entry.executor.id)) return;
      if(config.owners.includes(entry.executor.id)) return;
      if(config.guvenlid.includes(entry.executor.id)) return;
    
      const webhooks = await channel.fetchWebhooks();
      await webhooks.map(x => x.delete({reason: "Pusha System | Webhook Silindi!"}))
      channel.guild.members.ban(entry.executor.id, {reason: "Pusha System | İzinsiz Webhook Açmak!"})
    
      channel.guild.roles.cache.forEach(async function(pusha) {
      if(pusha.permissions.has("ADMINISTRATOR") || pusha.permissions.has("BAN_MEMBERS") || pusha.permissions.has("MANAGE_GUILD") || pusha.permissions.has("KICK_MEMBERS") || pusha.permissions.has("MANAGE_ROLES") || pusha.permissions.has("MANAGE_CHANNELS")) {
        pusha.setPermissions(0).catch(err =>{});}});
    
      channel.guild.channels.cache.get(ayarlar.defenderlog).send(`${entry.executor} üyesi tarafından sunucuda izinsiz webhook açıldı, webhook silinip ve banlandı.\n─────────────────────\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\n─────────────────────\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
      client1.users.cache.get(ayarlar.sahip).send(`**${entry.executor} tarafından sunucuda izinsiz webhook açıldı, webhook silinip ve banlandı!`)
    return;
    });
    
    client1.on("emojiDelete", async (emoji, message) => {
      const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_DELETE" }).then(audit => audit.entries.first());
      if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
      if(config.bots.includes(entry.executor.id)) return;
      if(config.owners.includes(entry.executor.id)) return;
      if(config.guvenlid.includes(entry.executor.id)) return;
    
      emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`).catch(console.error);
      const uyecik = emoji.guild.members.cache.get(entry.executor.id);
      uyecik.roles.set([ayarlar.karantinarol]).catch(err => { })
    
      let channel = client1.channels.cache.get(ayarlar.defenderlog)
      if (!channel) return console.log('Emoji Silme Koruma Logu Yok!');
      const pusha = new Discord.MessageEmbed()
        .setColor(ayarlar.color)
        .setAuthor(emoji.guild.name, emoji.guild.iconURL({ dynamic: true }))
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
    .setDescription(`${entry.executor} üyesi izinsiz emoji sildi ve kullanıcıyı karantina atıp, emojiyi yeniden yükledim.\n─────────────────────\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\nEmoji: \`${emoji.name}\` - \`${emoji.id}\`\n─────────────────────\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
      channel.send(`@here`, {embed: pusha}).catch(err => { })
    return;
    });
    
    client1.on("emojiCreate", async (emoji, message) => {
      const entry = await emoji.guild.fetchAuditLogs({ type: "EMOJI_CREATE" }).then(audit => audit.entries.first());
      if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
      if(config.bots.includes(entry.executor.id)) return;
      if(config.owners.includes(entry.executor.id)) return;
      if(config.guvenlid.includes(entry.executor.id)) return;
    
      emoji.delete({reason: "Emoji Koruma Sistemi!"});
      const uyecik = emoji.guild.members.cache.get(entry.executor.id);
      uyecik.roles.set([ayarlar.karantinarol]).catch(err => { })
    
      let channel = client1.channels.cache.get(ayarlar.defenderlog)
      if (!channel) return console.log('Emoji Yükleme Koruma Logu Yok!');
      const pusha = new Discord.MessageEmbed()
      .setColor(ayarlar.color)
        .setAuthor(emoji.guild.name, emoji.guild.iconURL({ dynamic: true }))
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`${entry.executor} üyesi izinsiz emoji yükledi ve kullanıcıyı karantina atıp, emojiyi sildim.\n─────────────────────\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\nEmoji: \`${emoji.name}\` - \`${emoji.id}\`\n─────────────────────\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
      channel.send(`@here`, {embed: pusha}).catch(err => { })
    return;
    });
    
    client1.on("emojiUpdate", async (oldEmoji, newEmoji) => {
      if(oldEmoji === newEmoji) return;
      const entry = await oldEmoji.guild.fetchAuditLogs({ type: "EMOJI_UPDATE" }).then(audit => audit.entries.first());
      if(!entry || !entry.executor || Date.now()-entry.createdTimestamp > 10000) return;
      if(config.bots.includes(entry.executor.id)) return;
      if(config.owners.includes(entry.executor.id)) return;
      if(config.guvenlid.includes(entry.executor.id)) return;
    
      await newEmoji.setName(oldEmoji.name);
      const uyecik = oldEmoji.guild.members.cache.get(entry.executor.id);
      uyecik.roles.set([ayarlar.karantinarol]).catch(err => {})
    
      let channel = client1.channels.cache.get(ayarlar.defenderlog)
      if (!channel) return console.log('Emoji Güncelleme Koruma Logu Yok!');
      const pusha = new Discord.MessageEmbed()
      .setColor(ayarlar.color)
        .setAuthor(oldEmoji.guild.name, oldEmoji.guild.iconURL({ dynamic: true }))
        .setThumbnail(entry.executor.avatarURL({ dynamic: true }))
        .setDescription(`${entry.executor} üyesi izinsiz emoji güncelledi ve kullanıcıyı karantina atıp, emojiyi eski haline getirdim.\n─────────────────────\nYetkili: (${entry.executor} - \`${entry.executor.id}\`)\nEmoji: \`${oldEmoji.name}\` - \`${oldEmoji.id}\`\n─────────────────────\nTarih: \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``)
      channel.send(`@here`, {embed: pusha}).catch(err => { })
    return;
    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

client1.on("ready", async () => {
console.log(`${client1.user.username} ismi ile giriş yapıldı! Guard I Online`);
client1.user.setPresence({ activity: { name: ayarlar.botdurum }, status: ayarlar.status });
});

client1.login(ayarlar.guardbot1).catch(err => {
console.error('Guard I Giriş Yapamadı!')
console.error(err.message)
});


client1.on('warn', m => console.log(`[WARN - 1] - ${m}`));
client1.on('error', m => console.log(`[ERROR - 1] - ${m}`));
process.on('uncaughtException', error => console.log(`[ERROR] - ${error}`));
process.on('unhandledRejection', (err) => console.log(`[ERROR] - ${err}`));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
