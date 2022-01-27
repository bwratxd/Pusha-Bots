const Discord = require('discord.js');
const oziayar = require('../Settings/config.json')
const { red, green, star } = require("../Settings/config.json")

module.exports = {
    name: 'başvuru',
    aliases: ['basvuru'],

    run: async(client, message, args) => {
		const embed = new Discord.MessageEmbed().setColor(oziayar.Color).setFooter(oziayar.Footer)
if(![oziayar.TagRoleID].some(role => message.member.roles.cache.get(role))) return message.react(oziayar.red)
if([oziayar.EnAltYetkiliRoleID].some(role2 => message.member.roles.cache.get(role2))) return message.react(oziayar.red) 

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if(message.channel.id === oziayar.BasvuruKomutKullanımKanalı){
	var channel = message.guild.channels.cache.find((channel) => channel.name === `${message.member.displayName}-başvuru`);
	
	var LogChannel = message.guild.channels.cache.find((channel) => channel.id === oziayar.BaşvuruLogChannelID);
	if(channel){
		return message.channel.send(`Zaten başvuru kanalınız açık! <#${channel.id}>`).then(msg => msg.delete({timeout: 6000}));
		} else {
        let category = message.guild.channels.cache.get(oziayar.BaşvuruKategoryID);
        message.guild.channels.create(`${message.member.displayName}-başvuru`, {
            parent: category,
            permissionOverwrites: [
                {id: oziayar.EveryoneRoleID, deny: ['VIEW_CHANNEL']},
                {id: message.author.id, allow: [('VIEW_CHANNEL'), ('SEND_MESSAGES')]}]
            }).then(channel => {


				const filter = m => m.author === message.author;
				var cevaplar = [];
				message.react(green)


       channel.send(`${message.author} **İsminiz ve yaşınız**`);
				channel.awaitMessages(filter, { max: 1 })
				  .then(function (collected) {
					  collected.each(msj => cevaplar.push(msj.content));

				channel.send(`${message.author} **Sunucumuzda günlük aktifliğiniz ?**`);
			    channel.awaitMessages(filter, { max: 1 })
					.then(function (collected) {
					collected.each(msj => cevaplar.push(msj.content));

				channel.send(`${message.author} **Sunucumuz için neler yapabilirsiniz**`);
				channel.awaitMessages(filter, { max: 1 })
					.then(function (collected) {
					collected.each(msj => cevaplar.push(msj.content));

				channel.send(`${message.author} **Kendiniz hakkında biraz bilgi ?**`);
				channel.awaitMessages(filter, { max: 1 })
					.then(function (collected) {
					collected.each(msj => cevaplar.push(msj.content));


								  
				channel.send("Başvurunuz başarıyla alındı, yetkili arkadaşlar sizinle ilgilenecekler, başvuru için teşekkür ederiz. Kanal birazdan silinecek...")
 
LogChannel.send(`<@&${oziayar.YetkiliAlımRoleID}> ${message.author}`)
LogChannel.send(embed.setDescription(`
${message.author.tag} (\`${message.author.id}\`) **Kullanıcısının Başvuru Formu**  

  ${star} **İsminiz ve yaşınız**
  \`${cevaplar[0]}\`

  ${star} **Sunucumuzda günlük aktifliğiniz**
  \`${cevaplar[1]}\`

  ${star} **Sunucumuz için neler yapabilirsiniz**
  \`${cevaplar[2]}\`

  ${star} **Kendiniz hakkında biraz bilgi**
  \`${cevaplar[3]}\`

${message.author}  Kullanıcısı'nın Başvurusu
${star} *Onaylamak için :* \`.onayla id\` ${green}
${star} *Reddetmek için :* \`.reddet id\` ${red}
`));
									setTimeout(function() {
										channel.delete()
									}, 3000);
							  })
							  })
							  })
							  })

setTimeout(() => {
    if(!message.guild.channels.cache.get(channel.id)) return;
    channel.delete({ reason: "Yetkili Başvuru Talep Süresi Sona Erdi." })
}, 60000)

							  }).catch(console.error);
		}
	}

}
}