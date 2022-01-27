const Discord = require('discord.js');
const oziayar = require('../Settings/config.json')
const { çizgi, red, star } = require("../Settings/config.json")

module.exports = {
    name: 'reddet',
    aliases: ['reddet'],


  run: async(client, message, args) => {   
 if (!message.member.roles.cache.has((oziayar.YetkiliAlımRoleID)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('**Bu komutu kullanabilmek için Yetkili Almı Yetkisine Sahip Olman Gerek**').setColor("Black"));
 let kullanıcı = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription('**Bir üye etiketlemen gerekiyor**').setColor("Black"));
  let member = message.guild.member(kullanıcı)

  message.react(red)

  client.channels.cache.get(oziayar.BaşvuruDurumLog).send(`
  ${kullanıcı}, Maalesef ! Başvurunuz **kabul edilmedi** ve **yetkili ekibimize** onaylanmadınız. ${red}

  ${star} **Sizi onaylamayan kişi :** ${message.author} 

  **Önemli:** ||\`[ DM Kutunuzu açınız, size özelden ek olarak ulaşılacaktır. ]\`||
  ${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}${çizgi}
`) 
    member.send(`Maalesef Başvurun \`reddedilmiştir!\` ${red}`);
  
  
  let embed = new Discord.MessageEmbed() 
  .setDescription(`${kullanıcı} Adlı Üyenin Yetkili Başvurusu \`reddedildi\``) 
  .setFooter(`Yetkili Alım`)
  return message.channel.send(embed).then(m => m.delete({timeout: 5000}))
  
}
}