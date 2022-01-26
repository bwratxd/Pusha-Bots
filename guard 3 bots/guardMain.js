const { Discord, Client, MessageEmbed } = require('discord.js');
const client = new Client({fetchAllMembers: true})
const pusha = require("./src/configs/sunucuayar.json");
const ayarlar = require("./src/configs/token.json");
const güvenli = require("./src/configs/güvenli.json");const request = require('request')
const fs = require('fs')
class guardMain {
    static async connect() {
        Array.prototype.shuffle = function () {
            let i = this.length;
            while (i) {
              let j = Math.floor(Math.random() * i);
              let t = this[--i];
              this[i] = this[j];
              this[j] = t;
            }
            return this;
          };
          const Tokens = ayarlar.guardTokenler
          class CLIENT {
            constructor(token) {
              this.token = token;
              this.client = new Client();
              this.client.login(token).then(x => console.log(`[ ${this.client.user.tag} ] isimli Guard aktif edildi!`));
            }
          };
          
          function createClient(token) {
            let c = new CLIENT(token);
            return c.client;
          };
          
          let clientObject = {}
          for (var i = 0; i < Tokens.length; i++) {
            let c = createClient(Tokens[i])
            clientObject[i] = c
          };
          
          for (let c in clientObject) {
            c = clientObject[c];
            c.on("ready", async () => {
              c.user.setPresence({ activity: { name: pusha.botDurum }, status: pusha.botStatu });
              });
              c.on("ready", async () => {
               
                let botVoiceChannel = c.channels.cache.get(pusha.botSesKanali);
                if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Hata(Guard Sağlayıcısı): Botunuz ses kanalına bağlantıyı sağlayamadı!"));
                
              });
                
              // Güvenli kişi fonksiyonu
              function guvenliBilesenler(kisiID) {
                let uye = c.guilds.cache.get(pusha.sunucuID).members.cache.get(kisiID);
                let guvenliler = güvenli.whitelist || [];
                if (!uye || uye.id === c.user.id || uye.id === güvenli.whitelist || uye.id === ayarlar.botSahip || uye.id === uye.guild.owner.id || guvenliler.some(g => uye.id === g.slice(1) || uye.roles.cache.has(g.slice(1)))) return true
                else return false;
              };
              // Cezalandırma fonksiyonu
              const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS", "VIEW_AUDIT_LOG"];
              function cezalandirBilesenler(kisiID, tur) {
                let uye = c.guilds.cache.get(pusha.sunucuID).members.cache.get(kisiID);
                if (!uye) return;
                if (tur == "jail") return uye.roles.cache.has(pusha.boosterRolü) ? uye.roles.set([pusha.boosterRolü, pusha.jailRolü]) : uye.roles.set([pusha.jailRolü]);
                if (tur == "ban") return uye.ban({ reason: "Pusha Guard Koruma" }).catch();
              };
              c.on("channelCreate", async channel => {
                let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
                if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenliBilesenler(entry.executor.id)) return;
                channel.delete({reason: "Pusha Guard Kanal Koruma"});
                cezalandirBilesenler(entry.executor.id, "ban");
              });
              c.on("channelUpdate", async (oldChannel, newChannel) => {
                let entry = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
                if (!entry || !entry.executor || !newChannel.guild.channels.cache.has(newChannel.id) || Date.now()-entry.createdTimestamp > 5000 || guvenliBilesenler(entry.executor.id)) return;
                cezalandirBilesenler(entry.executor.id, "ban");
              });
              c.on("channelDelete", async channel => {
                let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
                if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenliBilesenler(entry.executor.id)) return;
                cezalandirBilesenler(entry.executor.id, "ban");
              });
              c.on("channelCreate", async channel => {
                       let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_OVERWRITE_CREATE'}).then(audit => audit.entries.first());
                       if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenliBilesenler(entry.executor.id)) return;
                       channel.delete({reason: "Pusha Guard Kanal Koruma"});
                       cezalandirBilesenler(entry.executor.id, "ban");
                     });
                      c.on("channelUpdate", async (oldChannel, newChannel) => {
                       let entry = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_OVERWRITE_UPDATE'}).then(audit => audit.entries.first());
                       if (!entry || !entry.executor || !newChannel.guild.channels.cache.has(newChannel.id) || Date.now()-entry.createdTimestamp > 5000 || guvenliBilesenler(entry.executor.id)) return;
                       cezalandirBilesenler(entry.executor.id, "ban");
                     });
                     c.on("channelDelete", async channel => {
                       let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_OVERWRITE_DELETE'}).then(audit => audit.entries.first());
                       if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenliBilesenler(entry.executor.id)) return;
                       cezalandirBilesenler(entry.executor.id, "ban");
                     });
              function ytKapatBilesen(guildID) {
                let sunucu = c.guilds.cache.get(guildID);
                if (!sunucu) return;
                sunucu.roles.cache.filter(r => r.editable && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_GUILD") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_WEBHOOKS"))).forEach(async r => {
                  await r.setPermissions(0);
                });
              };
          }
    }
    static async gMain() {
        function guvenli(kisiID) {
            let uye = client.guilds.cache.get(pusha.sunucuID).members.cache.get(kisiID);
            let guvenliler = güvenli.whitelist || [];
            if (!uye || uye.id === client.user.id || uye.id === güvenli.botSahip || uye.id === uye.guild.owner.id || guvenliler.some(g => uye.id === g.slice(1) || uye.roles.cache.has(g.slice(1)))) return true
            else return false;
          };            
          const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS", "VIEW_AUDIT_LOG"];
          function cezalandir(kisiID, tur) {
            let uye = client.guilds.cache.get(pusha.sunucuID).members.cache.get(kisiID);
            if (!uye) return;
            if (tur == "jail") return uye.roles.cache.has(pusha.boosterRolü) ? uye.roles.set([pusha.boosterRolü, pusha.jailRolü]) : uye.roles.set([pusha.jailRolü]);
            if (tur == "ban") return uye.ban({ reason: " Pusha Guard Koruma" }).catch();
          };
          client.on("guildMemberRemove", async member => {
            let entry = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
            if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id)) return;
            cezalandir(entry.executor.id, "ban");
            let logKanali = client.channels.cache.get(pusha.logKanalı);
            if (logKanali) { logKanali.send(new MessageEmbed().setColor("#2F3236").setTitle('Sağ Tık Kick Atıldı!').setDescription(`${member} (__${member.id}__) üyesi, ${entry.executor} (__${entry.executor.id}__) tarafından sunucudan sağ tık ile kicklendi! Kickleyen kişi jaile atıldı.`).setFooter(pusha.botDurum)).catch(err => {}); };
          });
          client.on("guildBanAdd", async (guild, user) => {
            let entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
            if (!entry || !entry.executor || guvenli(entry.executor.id)) return;
             cezalandir(entry.executor.id, "ban");
            guild.members.unban(user.id, "Sağ Tık İle Banlandığı İçin Geri Açıldı!").catch(console.error);
            let logKanali = client.channels.cache.get(pusha.logKanalı);
            if (logKanali) { logKanali.send(new MessageEmbed().setColor("#2F3236").setTitle('Sağ Tık Ban Atıldı!').setDescription(`${user} (__${user.id}__) üyesi, ${entry.executor} (__${entry.executor.id}__) tarafından sunucudan sağ tık ile banlandı! Banlayan kişi jaile atıldı.`).setFooter(pusha.botDurum)).catch(); } else { guild.owner.send(new MessageEmbed().setColor("#2F3236").setTitle('Sağ Tık Ban Atıldı!').setDescription(`${user} (__${user.id}__) üyesi, ${entry.executor} (__${entry.executor.id}__) tarafından sunucudan sağ tık ile banlandı! Banlayan kişi jaile atıldı.`).setFooter(pusha.botDurum)).catch(err => {}); };
          });
          client.on("guildMemberAdd", async member => {
            let entry = await member.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
            if (!member.user.bot || !entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id)) return;
            cezalandir(entry.executor.id, "ban");
            cezalandir(member.id, "ban");
            let logKanali = client.channels.cache.get(pusha.logKanalı);
            if (logKanali) { logKanali.send(new MessageEmbed().setColor("#2F3236").setTitle('Sunucuya Bot Eklendi!').setDescription(`${member} (__${member.id}__) botu, ${entry.executor} (__${entry.executor.id}__) tarafından sunucuya eklendi! Ekleyen kişi ve bot banlandı.`).setFooter(pusha.botDurum)).catch(); } else { member.guild.owner.send(new MessageEmbed().setColor("#2F3236").setTitle('Sunucuya Bot Eklendi!').setDescription(`${member} (__${member.id}__) botu, ${entry.executor} (__${entry.executor.id}__) tarafından sunucuya eklendi! Ekleyen kişi ve bot banlandı.`).setFooter(pusha.botDurum)).catch(err => {}); };
          });
          client.on("guildUpdate", async (oldGuild, newGuild) => {
            let entry = await newGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
            if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id)) return;
          const settings = {
            url: `https://discord.com/api/v8/guilds/${newGuild.id}/vanity-url`,
            body: {
              code: `${pusha.sunucuURL}`
            },
            json: true,
            method: 'PATCH',
            headers: {
              "Authorization": `Bot ${ayarlar.guardToken}`
            }
          };
          request(settings, (err, res, body) => {
            if (err) {
              return console.log(err);
            }
          });
            cezalandir(entry.executor.id, "ban");
            if (newGuild.name !== oldGuild.name) newGuild.setName(oldGuild.name);
            if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
            let logKanali = client.channels.cache.get(pusha.logKanalı);
            if (logKanali) { logKanali.send(new MessageEmbed().setColor("#2F3236").setTitle('Sunucu Güncellendi!').setDescription(`${entry.executor} (__${entry.executor.id}__) tarafından sunucu güncellendi! Güncelleyen kişi banlandı ve sunucu eski haline getirildi.`).setFooter(pusha.botDurum)).catch(); } else { newGuild.owner.send(new MessageEmbed().setColor("#2F3236").setTitle('Sunucu Güncellendi!').setDescription(`${entry.executor} (__${entry.executor.id}__) tarafından sunucudan sunucu güncellendi! Güncelleyen kişi banlandı ve sunucu eski haline getirildi.`).setFooter(pusha.botDurum)).catch(err => {}); };
          });
          client.on("channelCreate", async channel => {
            let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
            if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id)) return;
            channel.delete({reason: "Pusha Guard Kanal Koruma"});
            cezalandir(entry.executor.id, "ban");
            let logKanali = client.channels.cache.get(pusha.logKanalı);
            if (logKanali) { logKanali.send(new MessageEmbed().setColor("#2F3236").setTitle('Kanal Oluşturuldu!').setDescription(`${entry.executor} (__${entry.executor.id}__) tarafından kanal oluşturuldu! Oluşturan kişi jaile atıldı ve kanal silindi.`).setFooter(pusha.botDurum)).catch(); } else { channel.guild.owner.send(new MessageEmbed().setColor("#2F3236").setTitle('Kanal Oluşturuldu!').setDescription(`${entry.executor} (__${entry.executor.id}__) tarafından kanal oluşturuldu! Oluşturan kişi jaile atıldı ve kanal silindi.`).setFooter(pusha.botDurum)).catch(err => {}); };
          });
          client.on("channelUpdate", async (oldChannel, newChannel) => {
            let entry = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
            if (!entry || !entry.executor || !newChannel.guild.channels.cache.has(newChannel.id) || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) || !pusha.channelGuard) return;
            cezalandir(entry.executor.id, "ban");
            if (newChannel.type !== "category" && newChannel.parentID !== oldChannel.parentID) newChannel.setParent(oldChannel.parentID);
            if (newChannel.type === "category") {
              newChannel.edit({
                name: oldChannel.name,
              });
            } else if (newChannel.type === "text") {
              newChannel.edit({
                name: oldChannel.name,
                topic: oldChannel.topic,
                nsfw: oldChannel.nsfw,
                rateLimitPerUser: oldChannel.rateLimitPerUser
              });
            } else if (newChannel.type === "voice") {
              newChannel.edit({
                name: oldChannel.name,
                bitrate: oldChannel.bitrate,
                userLimit: oldChannel.userLimit,
              });
            };
            oldChannel.permissionOverwrites.forEach(perm => {
              let thisPermOverwrites = {};
              perm.allow.toArray().forEach(p => {
                thisPermOverwrites[p] = true;
              });
              perm.deny.toArray().forEach(p => {
                thisPermOverwrites[p] = false;
              });
              newChannel.createOverwrite(perm.id, thisPermOverwrites);
            });
            let logKanali = client.channels.cache.get(pusha.logKanalı);
            if (logKanali) { logKanali.send(new MessageEmbed().setColor("#2F3236").setTitle('Kanal Güncellendi!').setDescription(`${entry.executor} (__${entry.executor.id}__) tarafından **${oldChannel.name}** kanalı güncellendi! Güncelleyen kişi jaile atıldı ve kanal eski haline getirildi.`).setFooter(pusha.botDurum)).catch(); } else { newChannel.guild.owner.send(new MessageEmbed().setColor("#2F3236").setTitle('Kanal Güncellendi!').setDescription(`${entry.executor} (__${entry.executor.id}__) tarafından **${oldChannel.name}** kanalı güncellendi! Güncelleyen kişi jaile atıldı ve kanal eski haline getirildi.`).setFooter(pusha.botDurum)).catch(err => {}); };
          });
          client.on("channelDelete", async channel => {
            let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
            if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id)) return;
            cezalandir(entry.executor.id, "ban");
            await channel.clone({ reason: "Pusha Guard Kanal Koruma" }).then(async kanal => {
              if (channel.parentID != null) await kanal.setParent(channel.parentID);
              await kanal.setPosition(channel.position);
              if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(kanal.id));
            });
            let logKanali = client.channels.cache.get(pusha.logKanalı);
            if (logKanali) { logKanali.send(new MessageEmbed().setColor("#2F3236").setTitle('Kanal Silindi!').setDescription(`${entry.executor} (__${entry.executor.id}__) tarafından **${channel.name}** kanalı silindi! Silen kişi jaile atıldı ve kanal tekrar açıldı.`).setFooter(pusha.botDurum)).catch(); } else { channel.guild.owner.send(new MessageEmbed().setColor("#2F3236").setTitle('Kanal Silindi!').setDescription(`${entry.executor} (__${entry.executor.id}__) tarafından **${channel.name}** kanalı silindi! Silen kişi jaile atıldı ve kanal tekrar açıldı.`).setFooter(pusha.botDurum)).catch(err => {}); };
          });
          
          function ytKapat(guildID) {
            let sunucu = client.guilds.cache.get(guildID);
            if (!sunucu) return;
            sunucu.roles.cache.filter(r => r.editable && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_GUILD") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_WEBHOOKS"))).forEach(async r => {
              await r.setPermissions(0);
            });
            let logKanali = client.channels.cache.get(pusha.logKanalı);
            if (logKanali) { logKanali.send(new MessageEmbed().setColor("#2F3236").setTitle('İzinler Kapatıldı!').setDescription(`Rollerin yetkileri kapatıldı!`).setFooter(pusha.botDurum)).catch(); } else { channel.guild.owner.send(new MessageEmbed().setColor("#2F3236").setTitle('İzinler Kapatıldı!').setDescription(`Rollerin yetkileri kapatıldı!`).setFooter(pusha.botDurum)).catch(err => {}); };
          };
          client.on("ready", async () => {
            client.user.setPresence({ activity: { name: pusha.botDurum }, status: pusha.botStatu });
            });
            client.on("ready", async () => {
             
              let botVoiceChannel = client.channels.cache.get(pusha.botSesKanali);
              if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Hata(Guard Main): Botunuz ses kanalına bağlantıyı sağlayamadı!"));
              
            });

          client.on("message", async message => {
            if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(pusha.prefix)) return;
            if (message.author.id !== güvenli.botSahip && message.author.id !== message.guild.owner.id) return;
            let args = message.content.split(' ').slice(1);
            let command = message.content.split(' ')[0].slice(pusha.prefix.length);
            let embed = new MessageEmbed().setColor("#2F3236").setAuthor("Pusha - GÜVENLİ SİSTEMİ", "https://i.pinimg.com/originals/83/df/a4/83dfa4bd8729fceba2fc7d3e7bf13ac0.gif").setFooter(pusha.botDurum);
            
            if(command === "güvenli") {
              let hedef;
              let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name === args.join(" "));
              let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
              if (rol) hedef = rol;
              if (uye) hedef = uye;
              let guvenliler = güvenli.whitelist || [];
              if (!hedef) return message.channel.send(embed.setDescription(`Güvenlik sisteminden geçebilcek kişileri etiketle veya rol etiketle!`).addField("Esgeç Listesi", guvenliler.length > 0 ? guvenliler.map(g => (message.guild.roles.cache.has(g.slice(1)) || message.guild.members.cache.has(g.slice(1))) ? (message.guild.roles.cache.get(g.slice(1)) || message.guild.members.cache.get(g.slice(1))) : g).join('\n') : "Bulunamadı!"));
              if (guvenliler.some(g => g.includes(hedef.id))) {
                guvenliler = guvenliler.filter(g => !g.includes(hedef.id));
                güvenli.whitelist = guvenliler;
                fs.writeFile("./src/configs/güvenli.json", JSON.stringify(pusha), (err) => {
                  if (err) console.log(err);
                });
                message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından güvenlik listesinden kaldırıldı!`));
              } else {
                güvenli.whitelist.push(`y${hedef.id}`);
                fs.writeFile("./src/configs/güvenli.json", JSON.stringify(pusha), (err) => {
                  if (err) console.log(err);
                });
                message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından güvenlik listesine eklendi!`));
              };
            };
          });
        client.login(ayarlar.guardToken).then(c => console.log(`[ Pusha Main Guard Online]`));  
    }
  }

module.exports = guardMain;