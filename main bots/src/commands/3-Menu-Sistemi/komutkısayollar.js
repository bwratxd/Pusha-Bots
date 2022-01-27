const {MessageMenuOption , MessageMenu , MessageActionRow} = require("discord-buttons")
module.exports = {
  conf: {
    aliases: ["kısayollar"],
    name: "kısayollar",
    help: "kısayollar",
    owner: true
  },
  
      run: async(client,message,args,embed) => {

        client.api.channels(message.channel.id).messages.post({
            data: {
                "content": "**✰ Marino**, bot komutlarını incelemek için aşağıdaki menüyü kullan!\n@here @everyone",
                "components": [{
                    "type": 1, "components": [{
                        "type": 3, "custom_id": "kısayollar", "options": [
                            { "label": "Davet Komutları", "description": "Davet Komutları kategorisinin yardım bilgileri için tıkla!", "value": "invite", },
                            { "label": "Genel Komutlar", "description": "Genel Komutlar kategorisinin yardım bilgileri için tıkla!", "value": "genel", },
                            { "label": "Kayıt Komutları", "description": "Kayıt Komutları kategorisinin yardım bilgileri için tıkla!", "value": "kayıt", },
                            { "label": "Kurucu Komutları", "description": "Kurucu Komutları kategorisinin yardım bilgileri için tıkla!", "value": "kurucu", },
                            { "label": "Moderasyon Komutları", "description": "Moderasyon Komutları kategorisinin yardım bilgileri için tıkla!", "value": "moderasyon", },
                            { "label": "Stat Komutları", "description": "Stat Komutları kategorisinin yardım bilgileri için tıkla!", "value": "stat", },
                            { "label": "Yetkili Komutları", "description": "Yetkili Komutları kategorisinin yardım bilgileri için tıkla!", "value": "yetkili", }

                        ], "placeholder": "Komutlar hakkında yardım almak için tıkla!", "min_values": 1, "max_values": 1
                    }],
                }
                ]
            }
        })

  }}
