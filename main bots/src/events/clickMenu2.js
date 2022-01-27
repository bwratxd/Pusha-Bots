const Discord = require("discord.js");
const messageUser = require("../schemas/messageUser");
const voiceUser = require("../schemas/voiceUser");
const voiceUserParent = require("../schemas/voiceUserParent");
const inviterSchema = require("../schemas/inviter");
const inviteMemberSchema = require("../schemas/inviteMember");
const nameData = require("../schemas/names")
const conf = require("../configs/settings.json")
const ayarlar = require("../configs/sunucuayar.json")
const { voice, mesaj2, star} = require("../configs/emojis.json")

const moment = require("moment");
moment.locale("tr");

module.exports = async ( menu, message, args ) => {

    await menu.clicker.fetch();
    menu.reply.think(true)

////////////////////////////////////////////////////////////////////////////////////////////

    const member = menu.clicker.member;
    const inviterData = await inviterSchema.findOne({ guildID: conf.guildID, userID: menu.clicker.member.id });
    const total = inviterData ? inviterData.total : 0;
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;
    const invMember = await inviteMemberSchema.find({ guildID: conf.guildID, inviter: menu.clicker.member.id });
    const daily = invMember ? menu.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
    const weekly = invMember ? menu.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
    const tagged = invMember ? menu.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && m.user.username.includes(conf.tag)).size : 0;

////////////////////////////////////////////////////////////////////////////////////////////

   const data = await nameData.findOne({ guildID: conf.guildID, userID: member.user.id });

////////////////////////////////////////////////////////////////////////////////////////////

 const messageData = await messageUser.findOne({ guildID: conf.guildID, userID: menu.clicker.member.id });
 const voiceData = await voiceUser.findOne({ guildID: conf.guildID, userID: menu.clicker.member.id });

      const messageWeekly = messageData ? messageData.weeklyStat : 0;
      const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
      const messageDaily = messageData ? messageData.dailyStat : 0;
      const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");
////////////////////////////////////////////////////////////////////////////////////////////

    const category = async (parentsArray) => {
      const data = await voiceUserParent.find({ guildID: conf.guildID, userID: member.id });
      const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
      let voiceStat = 0;
      for (var i = 0; i <= voiceUserParentData.length; i++) {
        voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
      }
      return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
    };


////////////////////////////////////////////////////////////////////////////////////////////

    if (menu.values[0] === "I") {
        menu.reply.edit(`Sunucuya Katılma Tarihiniz :  \`${moment(menu.clicker.member.joinedAt).format('D/MMMM/YYYY')}\``)
    }

    if (menu.values[0] === "II") {
        menu.reply.edit(`Üzerinde Bulunan Rollerin Listesi ;
        
${(menu.clicker.member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? menu.clicker.member.roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Hiç yok.')}`)
    }

    if (menu.values[0] === "III") {
        menu.reply.edit(`Hesabınızın Açılış Tarihi :  \`${moment(menu.clicker.member.user.createdAt).format("LLL")}\``)
    }

    if (menu.values[0] === "IV") {
        menu.reply.edit(`
${menu.clicker.member.toString()}, üyesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\` tarihinden  itibaren \`✰ M A R I N O\` sunucusunda toplam invite bilgileri aşağıda belirtilmiştir.
Toplam **${regular}** davet.

<a:green:907344837542567946> \`(${total} gerçek, ${bonus} bonus, ${leave} ayrılmış, ${fake} fake)\`
      
<a:green:907344837542567946> \`Günlük: ${daily}, Haftalık: ${weekly}, Taglı: ${tagged}\`
`)
    }

    if (menu.values[0] === "V") {
        await member.roles.set(ayarlar.unregRoles);

        menu.reply.edit(`${menu.clicker.member.toString()} üyesi başarıyla kayıtsıza atıldı!`)
    }

    if (menu.values[0] === "VI") {
        menu.reply.edit(`
<:pembeicon:907344847357231205> Sesli kanallardaki üye sayısı : \`${(menu.guild.members.cache.filter((x) => x.voice.channel).size)}\`
<:pembeicon:907344847357231205> Sunucudaki toplam üye sayısı : \`${(menu.guild.memberCount)}\`
<:pembeicon:907344847357231205> Sunucunun oluşturulma tarihi: \`${moment(menu.guild.createdAt).locale("tr").format("LLL")}\`
<:pembeicon:907344847357231205> Sunucu destek numarası : \`${(menu.guild.id)}\`
`)
    }

    if (menu.values[0] === "VII") {

     const ambed = new Discord.MessageEmbed()
     .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 2048 }))
     .setTitle(`${member.user.username} üyesinin isim bilgileri;`)
     .setDescription(data ? data.names.splice(0, 10).map((x, i) => `\`${i + 1}.\` \`${x.name}\` (${x.rol}) , (<@${x.yetkili}>) , **[**\`${moment(x.date).format("LLL")}\`**]**`).join("\n") : "")
              
        menu.reply.edit(ambed,true)
    }

    if (menu.values[0] === "VIII") {
        menu.reply.edit(`
${menu.clicker.member.toString()}, üyesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\` tarihinden  itibaren \`✰ M A R I N O\` sunucusunda toplam mesaj bilgileri aşağıda belirtilmiştir.

<a:green:907344837542567946> **Mesaj İstatistiği**
<:pembeicon:907344847357231205> Toplam: \`${messageData ? messageData.topStat : 0}\`

<:pembeicon:907344847357231205> Haftalık Mesaj: \`${Number(messageWeekly).toLocaleString()} mesaj\`
<:pembeicon:907344847357231205> Günlük Mesaj: \`${Number(messageDaily).toLocaleString()} mesaj\`
`)
    }

    if (menu.values[0] === "IX") {
menu.reply.edit(`
${menu.clicker.member.toString()}, üyesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\` tarihinden  itibaren \`✰ M A R I N O\` sunucusunda toplam ses bilgileri aşağıda belirtilmiştir.

<a:green:907344837542567946> **Sesli Sohbet İstatistiği**
<:pembeicon:907344847357231205> Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika] s [saniye]")}\`

<:pembeicon:907344847357231205> Haftalık Ses: \`${voiceWeekly}\`
<:pembeicon:907344847357231205> Günlük Ses: \`${voiceDaily}\`
`,true);

    }

}
module.exports.conf = {
    name: "clickMenu",
  };

