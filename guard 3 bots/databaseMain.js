const { Discord, Client, MessageEmbed } = require('discord.js');
const databaseclient = new Client({fetchAllMembers: true});
const pusha = require("./src/configs/sunucuayar.json");
const ayarlar = require("./src/configs/token.json");
const güvenli = require("./src/configs/güvenli.json");
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect("", {useNewUrlParser: true, useUnifiedTopology: true})
const Database = require("./src/Veritabani/roles");
class databaseMain {


static dağıtıcıOn() {
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
      const Tokens = ayarlar.databaseTokenler
      class CLIENT {
        constructor(token) {
          this.token = token;
          this.client = new Client();
          this.client.login(token).then(x => console.log(`${this.client.user.tag} Dağıtıcılar online.`));
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
            c.user.setPresence({ activity: { name: pusha.botDurum }, status: 'online' });
            let botVoiceChannel = c.channels.cache.get(pusha.botSesKanali);
            if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Hata(Database2 Sağlayıcısı): Botunuz ses kanalına bağlantıyı sağlayamadı!"));

          });

        c.on("roleDelete", async role => {
            let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
            if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000  || guvenli(entry.executor.id) ) return;
            setTimeout(() => {
            Database.findOne({guildID: role.guild.id, roleID: role.id}, async (err, roleData) => {
              if (!roleData) return;
              let yeniRol = role.guild.roles.cache.find(r => r.name === roleData.name);
              let roleMembers = roleData.members;
              roleMembers.forEach((member, index) => {
                let uye = role.guild.members.cache.get(member);
                if (!uye || uye.roles.cache.has(yeniRol.id)) return;
                setTimeout(() => {
                  uye.roles.add(yeniRol.id).catch();
                }, index*3000);
              });
            });
            }, 5000);
           });

        c.on("message", async message => {
            if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(pusha.prefix)) return;
            if (message.author.id !== güvenli.botSahip && message.author.id !== message.guild.owner.id) return;
            let args = message.content.split(' ').slice(1);
            let command = message.content.split(' ')[0].slice(pusha.prefix.length);
            if(command === "kur" || command === "kurulum" || command === "backup" || command === "setup") {
              if (!args[0] || isNaN(args[0])) return;
                message.channel.send('Hata: Dağıtma işlemi 5 saniye sonra başlayacaktır.')
                setTimeout(() => {
                  Database.findOne({guildID: pusha.sunucuID, roleID: args[0]}, async (err, roleData) => {
                    if (!roleData) return;
                    message.react("✅");
                  let yeniRol = message.guild.roles.cache.find(r => r.name === roleData.name);
                  let roleMembers = roleData.members;
                  roleMembers.forEach((member, index) => {
                    let uye = message.guild.members.cache.get(member);
                    if (!uye || uye.roles.cache.has(yeniRol.id)) return;
                    setTimeout(() => {
                      uye.roles.add(yeniRol.id).catch(console.error);
                    }, index*3000);
                  });
                });
                }, 5000);
            };
          });
          function guvenli(kisiID) {
            let uye = c.guilds.cache.get(pusha.sunucuID).members.cache.get(kisiID);
            let guvenliler = güvenli.whitelist || [];
            if (!uye || uye.id === c.user.id || uye.id === güvenli.botSahip || uye.id === uye.guild.owner.id || guvenliler.some(g => uye.id === g.slice(1) || uye.roles.cache.has(g.slice(1)))) return true
            else return false;
          };
        
      }

}

static fetchCmdDatabase() {
    databaseclient.on("message", async message => {
        if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(pusha.prefix)) return;
        if (message.author.id !== güvenli.botSahip && message.author.id !== message.guild.owner.id) return;
        let args = message.content.split(' ').slice(1);
        let command = message.content.split(' ')[0].slice(pusha.prefix.length);
        let embed = new MessageEmbed().setColor("#2f3236").setAuthor("Pusha - GÜVENLİ SİSTEMİ", "https://i.pinimg.com/originals/83/df/a4/83dfa4bd8729fceba2fc7d3e7bf13ac0.gif").setFooter(pusha.botDurum);
        if (command === "güvenli") {
          let hedef;
          let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name === args.join(" "));
          let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
          if (rol) hedef = rol;
          if (uye) hedef = uye;
          let guvenliler = güvenli.rolYonet || [];
          if (!hedef) return message.channel.send(embed.addField("İzinli Üyeler/Roller", guvenliler.length > 0 ? guvenliler.map(g => (message.guild.roles.cache.has(g.slice(1)) || message.guild.members.cache.has(g.slice(1))) ? (message.guild.roles.cache.get(g.slice(1)) || message.guild.members.cache.get(g.slice(1))) : g).join('\n') : "Bulunamadı!"));
          if (guvenliler.some(g => g.includes(hedef.id))) {
            guvenliler = guvenliler.filter(g => !g.includes(hedef.id));
            güvenli.rolYonet = guvenliler;
            fs.writeFile("./src/configs/güvenli.json", JSON.stringify(pusha), (err) => {
              if (err) console.log(err);
            });
            message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından güvenli listeden kaldırıldı!`));
          } else {
            güvenli.rolYonet.push(`y${hedef.id}`);
            fs.writeFile("./src/configs/güvenli.json", JSON.stringify(pusha), (err) => {
              if (err) console.log(err);
            });
            message.channel.send(embed.setDescription(`${hedef}, ${message.author} tarafından güvenli listeye eklendi!`));
          };
        };
      
      // Rolü oluşturtup geri dağıtma kısmı
        if(command === "kur" || command === "kurulum" || command === "backup" || command === "setup") {
          if (!args[0] || isNaN(args[0])) return message.channel.send("Hata: Eski Rolün ID'sini Giriniz!");
      
          Database.findOne({guildID: pusha.sunucuID, roleID: args[0]}, async (err, roleData) => {
            if (!roleData) return message.channel.send(embed.setDescription("Hata: Belirtilen Rolün ID'si Veritabanında bulunamadı."));
            message.react("✅");
            let yeniRol = await message.guild.roles.create({
              data: {
                name: roleData.name,
                color: roleData.color,
                hoist: roleData.hoist,
                permissions: roleData.permissions,
                position: roleData.position,
                mentionable: roleData.mentionable
              },
              reason: "Rol Silindiği İçin Tekrar Oluşturuldu!"
            });
      
            setTimeout(() => {
              let kanalPermVeri = roleData.channelOverwrites;
              if (kanalPermVeri) kanalPermVeri.forEach((perm, index) => {
                let kanal = message.guild.channels.cache.get(perm.id);
                if (!kanal) return;
                setTimeout(() => {
                  let yeniKanalPermVeri = {};
                  perm.allow.forEach(p => {
                    yeniKanalPermVeri[p] = true;
                  });
                  perm.deny.forEach(p => {
                    yeniKanalPermVeri[p] = false;
                  });
                  kanal.createOverwrite(yeniRol, yeniKanalPermVeri).catch(console.error);
                }, index*5000);
              });
            }, 5000);
          });
        };
      });
}

 static async dMain() {
        databaseclient.on("ready", async () => {
            databaseclient.user.setPresence({ activity: { name: pusha.botDurum }, status: pusha.botStatu });
            let botVoiceChannel = databaseclient.channels.cache.get(pusha.botSesKanali);
            if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Hata(Database): Bot ses kanalına bağlanamadı!"));
          });
        
        // Güvenli kişi fonksiyonu
function guvenli(kisiID) {
    let uye = databaseclient.guilds.cache.get(pusha.sunucuID).members.cache.get(kisiID);
    let guvenliler = güvenli.whitelist || [];
    if (!uye || uye.id === databaseclient.user.id || uye.id === güvenli.botSahip || uye.id === uye.guild.owner.id || guvenliler.some(g => uye.id === g.slice(1) || uye.roles.cache.has(g.slice(1)))) return true
    else return false;
  };
  
  function rolYonet(kisiID) {
    let uye = databaseclient.guilds.cache.get(pusha.sunucuID).members.cache.get(kisiID);
    let guvenliler = güvenli.rolYonet || [];
    if (!uye || uye.id === databaseclient.user.id || uye.id === güvenli.botSahip || uye.id === uye.guild.owner.id || guvenliler.some(g => uye.id === g.slice(1) || uye.roles.cache.has(g.slice(1)))) return true
    else return false;
  };
  const yetkiPermleri = ["ADMINISTRATOR"];
  // Cezalandırma fonksiyonu
  function cezalandir(kisiID, tur) {
    let uye = databaseclient.guilds.cache.get(pusha.sunucuID).members.cache.get(kisiID);
    if (!uye) return;
    if (tur == "jail") return uye.roles.cache.has(pusha.boosterRolü) ? uye.roles.set([pusha.boosterRolü, pusha.jailRolü]) : uye.roles.set([pusha.jailRolü]);
    if (tur == "ban") return uye.ban({ reason: "pusha Guard Koruma" }).catch();
  };
     databaseclient.on("guildMemberUpdate", async (oldMember, newMember) => {
    if (newMember.roles.cache.size > oldMember.roles.cache.size) {
      let entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
      if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000  || guvenli(entry.executor.id) || rolYonet(entry.executor.id)) return;
      if (yetkiPermleri.some(p => oldMember.hasPermission(p) && newMember.hasPermission(p))) {
        cezalandir(entry.executor.id, "jail");
        let logKanali = databaseclient.channels.cache.get(pusha.logKanalı);
        if (logKanali) { logKanali.send(new MessageEmbed().setColor("#2F3236").setTitle('Sağtık Yetki İşlemi Yapıldı!').setDescription(`${newMember} (__${newMember.id}__) üyesine ${entry.executor} (__${entry.executor.id}__) tarafından Sağtık Yetki İşlemi Yapıldı! Veren kişi yasaklandı ve verilen kişiden rol geri alındı.`).setFooter(pusha.botDurum)).catch(); } else { newMember.guild.owner.send(new MessageEmbed().setColor("#2f3236").setTitle('Sağtık Yetki İşlemi Yapıldı!').setDescription(`${newMember} (__${newMember.id}__) üyesine ${entry.executor} (__${entry.executor.id}__) tarafından Sağtık Yetki İşlemi Yapıldı! Veren kişi yasaklandı ve verilen kişiden rol geri alındı.`).setFooter(pusha.botDurum)).catch(err => {}); 
        if (entry.executor.id = newMember.id) return;
        newMember.roles.set(oldMember.roles.cache.map(r => r.id))      };
        if (entry.executor.id === newMember.id) return;
        newMember.roles.set(oldMember.roles.cache.map(r => r.id))
  }; 
  };    
  });
  databaseclient.on("roleCreate", async role => {
    let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
    if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id) ) return;
    role.delete({ reason: "pusha Guard Rol Koruma" });
   cezalandir(entry.executor.id, "ban");
    let logKanali = databaseclient.channels.cache.get(pusha.logKanalı);
    if (logKanali) { logKanali.send(new MessageEmbed().setColor("#2f3236").setTitle('Rol Oluşturuldu!').setDescription(`${entry.executor} (__${entry.executor.id}__) tarafından bir rol oluşturuldu! Oluşturan kişi jaile atıldı ve rol silindi.`).setFooter(pusha.botDurum)).catch(); } else { role.guild.owner.send(new MessageEmbed().setColor("#2f3236").setTitle('Rol Oluşturuldu!').setDescription(`${entry.executor} (__${entry.executor.id}__) tarafından bir rol oluşturuldu! Oluşturan kişi jaile atıldı ve rol silindi.`).setFooter(pusha.botDurum)).catch(err => {}); };
  });
  databaseclient.on("roleUpdate", async (oldRole, newRole) => {
    let entry = await newRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
    if (!entry || !entry.executor || !newRole.guild.roles.cache.has(newRole.id) || Date.now()-entry.createdTimestamp > 5000 || guvenli(entry.executor.id)) return;
    cezalandir(entry.executor.id, "ban");
    if (yetkiPermleri.some(p => !oldRole.permissions.has(p) && newRole.permissions.has(p))) {
      newRole.setPermissions(oldRole.permissions);
      newRole.guild.roles.cache.filter(r => !r.managed && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_GUILD"))).forEach(r => r.setPermissions(36818497));
    };
    newRole.edit({
      name: oldRole.name,
      color: oldRole.hexColor,
      hoist: oldRole.hoist,
      permissions: oldRole.permissions,
      mentionable: oldRole.mentionable
    });
    let logKanali = databaseclient.channels.cache.get(pusha.logKanalı);
    if (logKanali) { logKanali.send(new MessageEmbed().setColor("#2f3236").setTitle('Sunucu Rolü Güncelledi!').setDescription(`${entry.executor} (__${entry.executor.id}__) tarafından **${oldRole.name}** rolü güncellendi! Güncelleyen kişi jaile atıldı ve rol eski haline getirildi.`).setFooter(pusha.botDurum)).catch(); } else { newRole.guild.owner.send(new MessageEmbed().setColor("#2f3236").setTitle('Sunucu Rolü Güncelledi!').setDescription(`${entry.executor} (__${entry.executor.id}__) tarafından **${oldRole.name}** rolü güncellendi! Güncelleyen kişi jaile atıldı ve rol eski haline getirildi.`).setFooter(pusha.botDurum)).catch(err => {}); };
  });
  // Rol sililince yapanı banlayıp rolüü tekrar dağıtan kısım
  databaseclient.on("roleDelete", async role => {
    let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
    if (!entry || !entry.executor || Date.now()-entry.createdTimestamp > 5000  || guvenli(entry.executor.id) ) return;
    ytKapat(pusha.sunucuID)
    cezalandir(entry.executor.id, "ban");
    let yeniRol = await role.guild.roles.create({
      data: {
        name: role.name,
        color: role.hexColor,
        hoist: role.hoist,
        position: role.position,
        permissions: role.permissions,
        mentionable: role.mentionable
      },
      reason: "Rol Silindiği İçin Tekrar Oluşturuldu!"
    });
  
    Database.findOne({guildID: role.guild.id, roleID: role.id}, async (err, roleData) => {
      if (!roleData) return;
      setTimeout(() => {
        let kanalPermVeri = roleData.channelOverwrites;
        if (kanalPermVeri) kanalPermVeri.forEach((perm, index) => {
          let kanal = role.guild.channels.cache.get(perm.id);
          if (!kanal) return;
          setTimeout(() => {
            let yeniKanalPermVeri = {};
            perm.allow.forEach(p => {
              yeniKanalPermVeri[p] = true;
            });
            perm.deny.forEach(p => {
              yeniKanalPermVeri[p] = false;
            });
            kanal.createOverwrite(yeniRol, yeniKanalPermVeri).catch(console.error);
          }, index*5000);
        });
      }, 5000);
    });
  
    let logKanali = databaseclient.channels.cache.get(pusha.logKanalı);
    if (logKanali) { logKanali.send(new MessageEmbed().setColor("#2f3236").setTitle('Sunucu Rolü Silindi!').setDescription(`${entry.executor} (__${entry.executor.id}__) tarafından ${role.name} (__${role.id}__) rolü silindi, silen kişi banlandı! Rol tekrar oluşturuldu, üyelerine dağıtılmaya ve izinleri kanallara eklenmeye başlanıyor.`).setFooter(pusha.botDurum)).catch(); } else { role.guild.owner.send(new MessageEmbed().setColor("#2f3236").setTitle('Sunucu Rolü Silindi!').setDescription(`${entry.executor} (__${entry.executor.id}__) tarafından ${role.name} (__${role.id}__) rolü silindi, silen kişi banlandı! Rol tekrar oluşturuldu, üyelerine dağıtılmaya ve izinleri kanallara eklenmeye başlanıyor.`).setFooter(pusha.botDurum)).catch(err => {}); };
  });
  function ytKapat(guildID) {
    let sunucu = databaseclient.guilds.cache.get(guildID);
    if (!sunucu) return;
    sunucu.roles.cache.filter(r => r.editable && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_GUILD") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_WEBHOOKS"))).forEach(async r => {
      await r.setPermissions(0);
    });
 };
    }

    static databaseBackup() {
        let guild = databaseclient.guilds.cache.get(pusha.sunucuID);
        if (guild) {
          guild.roles.cache.filter(r => r.name !== "@everyone" && !r.managed).forEach(role => {
            let roleChannelOverwrites = [];
            guild.channels.cache.filter(c => c.permissionOverwrites.has(role.id)).forEach(c => {
              let channelPerm = c.permissionOverwrites.get(role.id);
              let pushlanacak = { id: c.id, allow: channelPerm.allow.toArray(), deny: channelPerm.deny.toArray() };
              roleChannelOverwrites.push(pushlanacak);
            });
      
            Database.findOne({guildID: pusha.sunucuID, roleID: role.id}, async (err, savedRole) => {
              if (!savedRole) {
                let newRoleSchema = new Database({
                  _id: new mongoose.Types.ObjectId(),
                  guildID: pusha.sunucuID,
                  roleID: role.id,
                  name: role.name,
                  color: role.hexColor,
                  hoist: role.hoist,
                  position: role.position,
                  permissions: role.permissions,
                  mentionable: role.mentionable,
                  time: Date.now(),
                  members: role.members.map(m => m.id),
                  channelOverwrites: roleChannelOverwrites
                });
                newRoleSchema.save();
              } else {
                savedRole.name = role.name;
                savedRole.color = role.hexColor;
                savedRole.hoist = role.hoist;
                savedRole.position = role.position;
                savedRole.permissions = role.permissions;
                savedRole.mentionable = role.mentionable;
                savedRole.time = Date.now();
                savedRole.members = role.members.map(m => m.id);
                savedRole.channelOverwrites = roleChannelOverwrites;
                savedRole.save();
              };
            });
          });
      
          Database.find({guildID: pusha.sunucuID}).sort().exec((err, roles) => {
            roles.filter(r => !guild.roles.cache.has(r.roleID) && Date.now()-r.time > 1000*60).forEach(r => {//1 saatte bir alır. Süreyi değiştirebilirsiinz.
              Database.findOneAndDelete({roleID: r.roleID});
            });
          });
          console.log(`[ ~ Pusha ~ ] Roller veritabanına yedeklenip veritabanına başarıyla işlendi.`);
        };
    }
    static async On() {
        databaseclient.login(ayarlar.databaseToken).catch(pusha => console.log("[ Pusha Database ] Discord API tarafından token'i Doğrulanamadı!"))  
    }
}

module.exports = databaseMain;