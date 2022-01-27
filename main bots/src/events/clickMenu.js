const conf = require("../configs/sunucuayar.json")
module.exports = async (menu) => {

    await menu.clicker.fetch();
    menu.reply.think(true)

    if (menu.values[0] === "couple") {
     setTimeout(() => { 
        menu.clicker.member.roles.cache.has(conf.sevgilimyok) &&
        menu.clicker.member.roles.cache.has(conf.lgbt)

        menu.clicker.member.roles.add(conf.sevgilimvar)
        menu.clicker.member.roles.remove(conf.sevgilimyok)
        menu.clicker.member.roles.remove(conf.lgbt) 
        menu.reply.edit(`<@!${menu.clicker.id}> başarıyla <@&${conf.sevgilimvar}> rolünü aldın!`)
     },750) 
    }
    if(menu.values[0] === "alone") {
setTimeout(() => { 
        menu.clicker.member.roles.cache.has(conf.sevgilimvar) &&
        menu.clicker.member.roles.cache.has(conf.lgbt)

        menu.clicker.member.roles.add(conf.sevgilimyok)
        menu.clicker.member.roles.remove(conf.sevgilimvar)
        menu.clicker.member.roles.remove(conf.lgbt)  
            menu.reply.edit(`<@!${menu.clicker.id}> başarıyla <@&${conf.sevgilimyok}> rolünü aldın!`)
 },750) 
    }
    if(menu.values[0] === "lgbt") {
setTimeout(() => { 
        menu.clicker.member.roles.cache.has(conf.sevgilimyok) &&
        menu.clicker.member.roles.cache.has(conf.sevgilimvar)

        menu.clicker.member.roles.add(conf.lgbt)
        menu.clicker.member.roles.remove(conf.sevgilimyok)
        menu.clicker.member.roles.remove(conf.sevgilimvar)       
            menu.reply.edit(`<@!${menu.clicker.id}> başarıyla <@&${conf.lgbt}> rolünü aldın!`)
 },750) 
    }
    if(menu.values[0] === "rolsuz") {
setTimeout(() => { 
        menu.clicker.member.roles.remove(conf.lgbt)
        menu.clicker.member.roles.remove(conf.sevgilimyok)
        menu.clicker.member.roles.remove(conf.sevgilimvar)       
            menu.reply.edit(`<@!${menu.clicker.id}> başarıyla üstünüzdeki Bütün rolleri aldım!`)
 },750) 
    }
    if(menu.values[0] === "vk") {
        await menu.clicker.member.roles.add("899286530680586281") 
setTimeout(() => { 
            menu.reply.edit(`<@!${menu.clicker.id}> başarıyla <@&899286530680586281> rolünü aldın!`)
 },750) 
    }
    if(menu.values[0] === "dc") {
        await menu.clicker.member.roles.add("899286509298024499") 
setTimeout(() => { 
            menu.reply.edit(`<@!${menu.clicker.id}> başarıyla <@&899286509298024499> rolünü aldın!`)
 },750) 
    }
    
    if(menu.values[0] === "rolsuzz") {
        await menu.clicker.member.roles.remove(["899286509298024499", "899286530680586281"])
setTimeout(() => { 
            menu.reply.edit(`<@!${menu.clicker.id}> başarıyla üstünüzdeki Bütün rolleri aldım!`)
 },750) 
    }
   

}
module.exports.conf = {
    name: "clickMenu",
  };

