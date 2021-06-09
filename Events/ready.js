const Discord = require("discord.js");
const ayar = require('../settings.js');
module.exports = async client => {
    client.user.setPresence({ activity: { type: "WATCHING", name: ayar.bot.botStatus }, status: 'online' })
};