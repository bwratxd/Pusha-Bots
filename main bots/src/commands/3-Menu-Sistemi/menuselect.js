const {MessageMenuOption , MessageMenu , MessageActionRow} = require("discord-buttons")
module.exports = {
  conf: {
    aliases: ["sm3","select-menu3"],
    name: "selectmenu3",
    help: "select-menu3",
    owner: true
  },
  
      run: async(client,message,args,embed) => {

        /* Select Menü  1. Rolleri*/
        const KutuRol1 = new MessageMenuOption()
        .setLabel('Sevgilim Var')
        .setDescription(`Sevgilim Var Rolünü Almak İçin Tıkla.`)
        .setEmoji("899680497427431424")
        .setValue('couple');
       
        const KutuRol12 = new MessageMenuOption()
        .setLabel('Sevgilim Yok')
        .setDescription(`Sevgilim Yok Rolünü Almak İçin Tıkla.`)
        .setEmoji("899680497427431424")
        .setValue('alone');

        const KutuRol13 = new MessageMenuOption()
        .setLabel('LGBT')
        .setDescription(`LGBT Rolünü Almak İçin Tıkla.`)
        .setEmoji("899680497427431424")
        .setValue('lgbt');

        const KutuRol14 = new MessageMenuOption()
        .setLabel('Rolsüz')
        .setDescription(`Rollerini Temizlemek İçin Tıkla.`)
        .setEmoji("🗑️")
        .setValue('rolsuz');
      

        /* Select Menü 1 Tanım*/
        const Menu = new MessageMenu()
        .setID("relation")
        .setPlaceholder("İlişki Rolleri")
        .addOption(KutuRol1)
        .addOption(KutuRol12)
        .addOption(KutuRol13)
        .addOption(KutuRol14)


        /* Select Menü 2. Rolleri */
        const KutuRol15 = new MessageMenuOption()
        .setLabel('VK')
        .setDescription(`Vampir Köylü Rolü Almak İçin Tıkla`)
        .setEmoji("899680497427431424")
        .setValue('vk');

        const KutuRol16 = new MessageMenuOption()
        .setLabel('DC')
        .setDescription(`Doğruluk Cesaretlik Rolü Almak İçin Tıkla.`)
        .setEmoji("899680497427431424")
        .setValue('dc');

        const KutuRol17 = new MessageMenuOption()
        .setLabel('Rolsüz')
        .setDescription(`Rollerini Temizlemek İçin Tıkla.`)
        .setEmoji("🗑️")
        .setValue('rolsuzz');

        /* Select Menü 2 Tanım */

        const Menu2 = new MessageMenu()
        .setID("oyun")
        .setPlaceholder(`Oyun Rolleri`)
        .addOption(KutuRol15)
        .addOption(KutuRol16)
        .addOption(KutuRol17)

        
        /* Select Menü 1 */
        const RoleMenu = new MessageActionRow()
        .addComponent(Menu)

        /* Select Menu 2 */
        const RoleMenu2 = new MessageActionRow()
        .addComponent(Menu2)


        message.channel.send(`Rol seçmek için aşağıdaki menüyü kullanabilirsiniz.?\n @here @everyone`, {
          components: [
            RoleMenu,
            RoleMenu2],
        });
  }}