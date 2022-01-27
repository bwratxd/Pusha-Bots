const {MessageMenuOption , MessageMenu , MessageActionRow} = require("discord-buttons")
const { star} = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["kpanel"],
    name: "kpanel",
    help: "kpanel",
    owner: true
  },
  
      run: async(client, message, args) => {

     client.api.channels(message.channel.id).messages.post({
            data: {
                "content": `${star} \`${message.guild.name}\` Sunucusu içerisi;\nUlaşmak istediğiniz bilgilere menüden tıklamanız yeterli olucaktır.\n@here @everyone`,
                "components": [{
                        "type": 1, "components": [{
                        "type": 3, "custom_id": "kpanel", "options": [
                            { "label": "Sunucuya Katılma Tarihiniz", "value": "I", "emoji": { "id": "907344855938785320", "name": "ict_I" }, },
                            { "label": "Üzerinde Bulunan Rollerin Listesi", "value": "II", "emoji": { "id": "907344855938785320", "name": "ict_II" }, },
                            { "label": "Hesabınızın Açılış Tarihi", "value": "III", "emoji": { "id": "907344855938785320", "name": "ict_III" }, },
                            { "label": "Toplam invite Bilgileri", "value": "IV", "emoji": { "id": "907344855938785320", "name": "ict_IV" }, },
                            { "label": "Tekrar Kayıt Olma", "value": "V", "emoji": { "id": "907344855938785320", "name": "ict_V" }, },
                            { "label": "Sunucu Bilgileri", "value": "VI", "emoji": { "id": "907344855938785320", "name": "ict_VI" }, },
                            { "label": "İsim Bilgileri", "value": "VII", "emoji": { "id": "907344855938785320", "name": "ict_VII" }, },
                            { "label": "Toplam Mesaj Bilgileri", "value": "VIII", "emoji": { "id": "907344855938785320", "name": "ict_VIII" }, },
                            { "label": "Toplam Ses Bilgileri", "value": "IX", "emoji": { "id": "907344855938785320", "name": "ict_IX" }, }

                        ], "placeholder": "Kullanıcı Menüsü", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })

  }}
