const Discord = require('discord.js');
const oziayar = require('../Settings/config.json')
const { çizgi, green, star } = require("../Settings/config.json")

module.exports = {
    name: 'onayla',
    aliases: ['onayla'],


  run: async(client, message, args) => {   
    if (!message.member.roles.cache.has((oziayar.YetkiliAlımRoleID)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu komutu kullanabilmek için Yetkili Almı Yetkisine Sahip Olman Gerek')  
    let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription('**Bir üye etiketlemen gerekiyor**').setColor("Black"));
  let member = message.guild.member(kullanıcı)

  message.react(green)

   member.roles.add(oziayar.VerilecekYetkiliRolleriID)
   client.channels.cache.get(oziayar.BaşvuruDurumLog).send(`
  ${kullanıcı}, Tebrikler! Başvurunuz **kabul edildi** ve **yetkili ekibimize** onaylandınız. ${green}

  ${star} **Sizi onaylayan kişi :** ${message.author} 

  **Önemli:** ||\`[ DM Kutunuzu açınız, size özelden ek olarak ulaşılacaktır. ]\`||
  ${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}
`) 
    member.send(`Başvurun başarıyla **onaylanmıştır**! ${green} Desteklerin için \`teşekkürler!\` ${green}`);
  
  let embed = new Discord.MessageEmbed() 
  .setDescription(`${kullanıcı} üyesine başarıyla yetki aldırıldı!`) 
  .setFooter(`Yetkili Alım`)
  return message.channel.send(embed).then(m => m.delete({timeout: 5000}))
  
}
}