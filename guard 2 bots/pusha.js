const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const axios = require("axios")
const client = new Discord.Client();
const ms = require("ms")
client.rolLimit = new Map();
client.kanalKoruma = new Map();
client.rolName = new Map()
client.ownerst = ["904104903532740648"]; // KURUCU
client.evulate = [],
client.channelLimit = new Map()
client.channelName = new Map()
client.blackList = []
client.banLimit = new Map()
client.roleBackup = new Map()
client.roleCreate = new Map()["904104903532740648","894927267040469062","894927769002209310","894928027987898378","894928121797672960","894928149417173054","894928250269233182","894867049434738689","894867049434738689","894867481779392542","904104903532740648"],// Güvenli bot ID
client.botroles = ["904104903532740648","894927267040469062","894927769002209310","894928027987898378","894928121797672960","894928149417173054","894928250269233182","894867049434738689","894867049434738689","894867481779392542","904104903532740648"]// YLER GİDİNCE YETKİSİ GİTMİYECEK BOTLARIN ID
let kanal = "923331957339873352" // LOG KANAL
let ustKanal = "923331957339873352" // YETKİSİ YETMEYİNCE BLABLA

client.on("ready", () => {
    client.user.setActivity("M A R İ N O 🖤 Pusha");
    console.log(client.user.tag)
})

client.on("guildUnavailable", async (guild) => {
    let arr = ["ADMINISTRATOR", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "VIEW_AUDIT_LOG"]
    guild.roles.cache.filter(a => arr.some(x => a.permissions.has(x)) == true && guild.members.cache.get(client.user.id).roles.highest.rawPosition > a.rawPosition && !client.botroles.includes(a.id)).map(huh => {
        client.roleBackup.set(huh.id, huh.permissions.bitfield)
        huh.setPermissions(0)
    })
    client.channels.cache.get(kanal).send(` Sunucu kullanılamaz hale geldiği için koruma amacıyla yetkileri kapadım!`)
});

client.on("guildUpdate", async (oldGuild, newGuild) => {
    await newGuild.fetchAuditLogs({
        type: "GUILD_UPDATE"
    }).then(async (audit) => {
        let ayar = audit.entries.first();
        let hedef = ayar.target;
        let yapan = ayar.executor;
        if (Date.now() - ayar.createdTimestamp > 5000) return;
        if (yapan.id == client.user.id) return;
        if (client.ownerst.includes(yapan.id)) return;
        if (oldGuild.name !== newGuild.name) {
            newGuild.setName("✰ M A R İ N O #GELİYORUZZ")
            newGuild.members.ban(yapan.id, {
                reason: "Sunucu ismi değiştirmek."
            })
            client.blackList.push(yapan.id)
            client.channels.cache.get(kanal).send(` <@${yapan.id}> | (\`${yapan.id}\`) kişisi tarafından sunucu ismi değiştirildi. Kişi banlandı, Sunucu ismi eski haline çevirildi.`)
        }
        if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
            newGuild.members.ban(yapan.id, {
                reason: "Sunucu ÖZEL URL değiştirmek."
            }).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapan.id + "> sunucu ismi değiştirdi fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
            client.blackList.push(yapan.id)
        }
    })
})

client.on("guildUpdate", async (oldGuild, newGuild) => {
    let url = "marino"
    if (newGuild.vanityURLCode == url) return
    if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
        let wat = await oldGuild.fetchAuditLogs({
            type: "GUILD_UPDATE"
        })
        let yapanpic = oldGuild.members.cache.get(wat.entries.first().executor.id)
        axios({
            method: "patch",
            url: `https://discord.com/api/v6/guilds/${oldGuild.id}/vanity-url`,
            data: {
                code: url
            },
            headers: {
                authorization: `Bot ${client.token}`
            }
        }).then(() => {
            client.channels.cache.get(kanal).send(`🔐 Sunucu Özel URLsi \`${oldGuild.vanityURLCode}\`, ${yapanpic} | (\`${yapanpic.id}\`) kişisi tarafından değiştirildi. Kişi banlandı, URL eski haline çevirildi.`)
            newGuild.members.ban(yapanpic.id).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapan.id + "> url değişti fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
        }).catch(e => {
            newGuild.members.ban(yapanpic.id).catch(e => client.channels.cache.get(ustKanal).send("@here <@" + yapan.id + "> url değişti fakat yetkim yetmediği için kullanıcıyı banlayamadım"))
            console.error(e)
        })
    }
})


client.on("message", async message => {
    if (message.author.bot) return;
    if (message.author.id !== "904104903532740648") return
    if (message.channel.type !== "text") return;
    if (!message.guild) return;
    let prefikslerim = ["."];
    let tokuchim = false;
    for (const içindeki of prefikslerim) {
        if (message.content.startsWith(içindeki)) tokuchim = içindeki;
    }
    if (!tokuchim) return;
    const args = message.content.slice(tokuchim.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const event = message.content.toLower;
    const split = message.content.split('"');
    switch (command) {
        case "eval":
            if (args.join(" ").toLowerCase().includes('token')) return message.channel.send("Wow, you're smart.")
            const clean = text => {
                if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
                else return text;
            }
            try {
                const code = args.join(" ");
                let evaled = await eval(code);
                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);
                message.channel.send(clean(evaled), {
                    code: "xl"
                });
            } catch (err) {
                message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            }
            break

    }
});

client.on("disconnect", () => console.log("Bot bağlantısı kesildi"))
client.on("reconnecting", () => console.log("Bot tekrar bağlanıyor..."))
client.on("error", e => console.log(e))
client.on("warn", info => console.log(info));

process.on("uncaughtException", err => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Beklenmedik Hata: ", errorMsg);
    process.exit(1);
});

process.on("unhandledRejection", err => {
    console.error("Yakalanamayan Hata: ", err);
});

client.login("")