const Discord = require("discord.js");
const ayarlar = require("../configs/sunucuayar.json")

const moment = require("moment");
moment.locale("tr");

module.exports = async (button) => {


if(button.id === "XI")
{
await button.reply.think(true)
await button.reply.edit(`
\`\`\`
- .invite (stat [user])
- .topdavet (topdavet)
\`\`\`
`)
}

if(button.id === "XII")
{
await button.reply.think(true)
await button.reply.edit(`
\`\`\`
- .afk (afk [sebep])
- .avatar (avatar [UserID/@User])
- .banner (banner [UserID/@User])
- .booster (boost [nick])
- .profil (profil / [@üye])
- .tag (tag)
- .yardım (yardım)
- .çek (çek [@üye])
- .git (git [@üye])
- .market (coinmarket) 
- .satınal (satınal) 
- .görev (görev [user])
- .coin [ekle/sil/gönder] [kullanıcı] [sayı]
\`\`\`
`)
}

if(button.id === "XIII")
{
await button.reply.think(true)
await button.reply.edit(`
\`\`\`
- .taglı-alım [aç/kapat]
- .kayıt (kayıt [user] İsim Yaş)
- .bağlantı-kes ([user])
- .isim (isim [user] [name | age])
- .isimler (isimler [user])
- .top-teyit (top-teyit)
- .unregister (unregister [user])
\`\`\`
`)
}

if(button.id === "XIV")
{
await button.reply.think(true)
await button.reply.edit(`
\`\`\`
- .kilit ([aç/kapat])
- .tagsay (tagsay)
- .banliste (banlist)
- .rolbilgi (@role)
- .cezapuansil ([user])
- .isimsil ([user])
- .sicilsil ([user])
- .yasaklı-tag (ekle/sil/liste [yasaklıtag])
- .ekip ([ekle-sil-liste-kontrol-bilgi])
- .ekip-ses ([@ekiprol])
- .yetkilises (yetkilises)
- .yoklama (toplantı)
- .allmute (allmute [kanal])
- .allunmute (allunmute [kanal])
- .toplutaşı (toplutaşı [kanal])
\`\`\`
`)
}

if(button.id === "XV")
{
await button.reply.think(true)
await button.reply.edit(`
\`\`\`
- .yargı (yargı [user] [reason])
- .jail (jail [user] [reason])
- .vmute (vmute [user] [time] [reason])
- .mute (mute [user] [time] [reason])
- .reklam (reklam [user] [reason])
- .unban (unban [userID])
- .unmute (unmute [user] / [userID])
- .unvmute (unvmute [user] / [userID])
- .unjail (unjail [user] / [userID])
- .unreklam (unreklam [user] / [userID])
- .sicil (sicil [user])
- .topceza (topceza)
- .cezapuan (cezapuan [user])
- .cezasorgu (cezasorgu [Ceza ID])
- .yargılist (yargıliste)
- .allmute (allmute [kanal])
- .allunmute (allunmute [kanal])
- .toplutaşı (toplutaşı [kanal])
\`\`\`
`)
}

if(button.id === "XVI")
{
await button.reply.think(true)
await button.reply.edit(`
\`\`\`
- .stat (stat [user])
- .top (top)
- .nerede (sesbilgi)
- .topcoin (topcoin)
\`\`\`
`)
}

if(button.id === "XVII")
{
await button.reply.think(true)
await button.reply.edit(`
\`\`\`
- .ystat (yetkim [user])
- .cezapuan (cezapuan [user])
- .kes (kes [user])
- .rolsüz (rolsüz)
- .say (say)
- .snipe (snipe)
- .sesli (sesli)
- .sicil (sicil [user])
- .yetkili (yetkili [user])
- .taglı (taglı [user])
- .rol (r [al/ver] [user] [@role])
- .rollog (rollog [user])
- .seslisay (sesli)
- .sil (sil [miktar])
\`\`\`
`)
}

if(button.id === "XVIII")
{
await button.reply.think(true)
await button.reply.edit(`
\`\`\`
- .vkcezalı
- .vkyönetici

- .dccezalı
- .dcyönetici

- .streamer
- .streamercezalı
- .StreamerSorumlusu

\`\`\`
`)
}

if(button.id === "XVIII")
{
await button.reply.think(true)
await button.reply.edit(`
\`\`\`
- .vkcezalı
- .vkyönetici

- .dccezalı
- .dcyönetici

- .streamer
- .streamercezalı
- .StreamerSorumlusu

\`\`\`
`)
}

if(button.id === "XIX")
{
await button.reply.think(true)
await button.reply.edit(`
\`\`\`
- .musician
- .soruncozme

- .terapist
- .special
\`\`\`
`)
}

}
module.exports.conf = {
  name: "clickButton"
};