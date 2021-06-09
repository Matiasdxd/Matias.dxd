const { MessageEmbed } = require("discord.js");
module.exports.run = (client, message, args) => { 
  

  if(!message.member.roles.cache.get(ayar.roles.registerStaff) && !message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(new MessageEmbed().setDescription(`Bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`).setColor("BLUE")).then(x => x.delete({ timeout: 6500 }));
  
  let tag = "tagınız";
  const tag = message.guild.members.cache.filter(m => m.user.username.includes(tag)).size
  const swtop = message.guild.memberCount
  const ses = message.guild.channels.cache.filter(channel => channel.type == "voice").map(channel => channel.members.size).reduce((a, b) => a + b) 
  const aktif = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
  const BoostLevel = message.guild.premiumTier;
  const Boost = message.guild.premiumSubscriptionCount;

  const sayy = new MessageEmbed()
  .setTimestamp()
  .setColor('BLACK')
  .setFooter('Mâtîas❤️')
  message.react(ayar.emojis.yes)
  message.channel.send(sayy.setDescription(`\`•\`Sunucumuzda Toplam \`${swtop}\` üye bulunmakta. (\`${aktif}\`) Aktif!
  \`•\` Tagımızda toplam \`${tag}\` üye bulunmakta.
  \`•\` Sunucumuzda \`${Boost}\` takviye bulunmakta ve sunucumuz \`${BoostLevel}.\` seviye!
  \`•\` Ses kanallarında \`${ses}\` üye bulunmakta.`));
};
exports.config = {
    name: "say",
    guildOnly: true,
    aliases: ["say"],
    cooldown: 1000
};