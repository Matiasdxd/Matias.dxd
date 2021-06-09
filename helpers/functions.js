const { MessageEmbed } = require('discord.js');
const ayar = require('../settings');
const client = global.client;
const moment = require('moment');
require('moment-duration-format');
const db = require('quick.db');
const message = require('../Events/message');
let colors = ["BLACK", "BLUE", "RED"]
colors[Math.floor(Math.random() * colors.length)]
let random = colors[Math.floor(Math.random() * colors.length)]
let embed = new MessageEmbed().setColor(random).setTimestamp()


Promise.prototype.sil = function(time) {
    if (this) this.then(s => {
        if (s.deletable) s.delete({ timeout: time * 1000 });
    });
};

class Register {

    static async man(user, admin, name, channel, msg) {
        await user.roles.add(ayar.roles.manRoles).catch(err => {})
        await user.roles.remove(ayar.roles.unregisterRoles).catch(err => {})
        await user.setNickname(name).catch(err => {})

        msg.edit(embed.setDescription(`${user} üyesi \`Erkek\` olarak kayıt edildi!`).setFooter('Mâtîas❤️')).sil(7)
        db.add(`teyit.${admin.id}.erkek`, 1)
        db.add(`teyit.${admin.id}.toplam`, 1)
        db.push(`isimler.${user.id}`, { userID: user.id, adminID: admin.id, name: name, sex: ayar.roles.manRoles[0] })
        if (user.user.username.includes(ayar.guild.tag)) user.roles.add(ayar.roles.tagRole)
    }
    static async woman(user, admin, name, channel, msg) {
        await user.roles.add(ayar.roles.womanRoles).catch(err => {})
        await user.roles.remove(ayar.roles.unregisterRoles).catch(err => {})
        await user.setNickname(name).catch(err => {})

        msg.edit(embed.setDescription(`${user} üyesi \`Kadın\` olarak kayıt edildi!`).setFooter('Mâtîas❤️')).sil(7)
        db.add(`teyit.${admin.id}.kız`, 1)
        db.add(`teyit.${admin.id}.toplam`, 1)
        db.push(`isimler.${user.id}`, { userID: user.id, adminID: admin.id, name: name, sex: ayar.roles.womanRoles[0] })
        if (user.user.username.includes(ayar.guild.tag)) user.roles.add(ayar.roles.tagRole)
    }
    static async name(user, name, channel) {
        await user.setNickname(name).catch(err => {})

        channel.send(embed.setDescription(`${user} üyesinin ismi  \`${name}\` olarak güncellendi.`).setFooter('Mâtîas❤️')).sil(7)

    }
    static async kayıtsız(user, admin, channel) {
        await user.roles.set(ayar.roles.unregisterRoles)
        await user.setNickname(`${ayar.guild.unTag} İsim | Yaş`)
        channel.send(embed.setDescription(`${user}, üyesi ${admin} tarafından kayıtsıza atıldı.`).setFooter('Mâtîas❤️')).sil(7)
    }
    static async taglıalımac(channel) {
        db.set(`taglıalım.${channel.guild.id}`, 'acik')
        channel.send(embed.setDescription(`${channel.guild.emojis.cache.get(ayar.emojis.yes)} taglı alım modu başarılı bir şekilde aktif edildi`).setFooter('Mâtîas❤️')).sil(7)
    }
    static async taglıalımkapat(channel) {
        db.delete(`taglıalım.${channel.guild.id}`)
        channel.send(embed.setDescription(`${channel.guild.emojis.cache.get(ayar.emojis.yes)} taglı alım modu başarılı bir şekilde kapatıldı`).setFooter('Mâtîas❤️')).sil(7)
    }
}
class Other {

    static async vip(user, admin, channel, msg) {
        if (user.roles.cache.has(ayar.roles.vipRole)) {
            await user.roles.remove(ayar.roles.vipRole)
            channel.send(embed.setDescription(`${user} üyesinden ${channel.guild.roles.cache.get(ayar.roles.vipRole)} rolü alındı.`).setFooter('Mâtîas❤️'))
        } else {
            await user.roles.add(ayar.roles.vipRole)
            channel.send(embed.setDescription(`${user} üyesine ${channel.guild.roles.cache.get(ayar.roles.vipRole)} rolü verildi.`).setFooter('Mêdy. ❤️ Slayex'))
        }
        await msg.react(ayar.emojis.yes)
    }
}


module.exports = { Register, Other }; // yaptığın fonksiyonları buraya girmen lazım yoksa çalıştıramazsın.
