const conf = require("../../configs/sunucuayar.json")
const { red } = require("../../configs/emojis.json")
module.exports = {
  conf: {
    aliases: ["say"],
    name: "say",
    help: "say"
  },

  run: async (client, message, args, embed) => {
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) 
    {
      message.react(red)
      return
    }
    let Tag = conf.tag 
    var TotalMember = message.guild.memberCount 
           let tag = await message.guild.members.cache.filter(member => member.user.username.includes(Tag)).size 
           let sesli = message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b);
           var Yetkili  = message.guild.members.cache.filter(b => b.roles.cache.get("923331950939365399")).size || 0;
           var boost = message.guild.premiumSubscriptionCount;
           var boostlevel = message.guild.premiumTier;
           
           message.channel.send(embed
               .setColor('RANDOM')
               .setDescription(`
\`❯\` Şu anda toplam **${sesli}** kişi seslide.
\`❯\` Sunucumuzda toplam **${message.guild.memberCount}** kullanıcı bulunmaktadır. (**${message.guild.members.cache.filter(member => member.presence.status !== "offline").size}** Aktif)
\`❯\` Sunucumuzda toplam Taglı **${tag}** kullanıcı bulunmaktadır (**+ ${Yetkili} Yetkili**)
\`>\` Sunucumuzda toplam **${boost}** takviye bulunmakta. (\`${boostlevel}. seviye\`) `)
           
)
   },
 };
