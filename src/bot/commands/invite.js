const { MessageEmbed } = require("discord.js");
const { getConfig } = require("../modules/config.js");


module.exports = {
    name: "invite",
    description: "Bot invite",
    async execute(message, args) {
        const embed = new MessageEmbed()
        .setDescription(`[Invite](https://discord.com/api/oauth2/authorize?client_id=698262384996909148&permissions=2048&scope=bot)`)
        return message.reply({
            embeds: [embed]
        });
    },
};