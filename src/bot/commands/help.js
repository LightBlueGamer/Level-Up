const { MessageEmbed } = require("discord.js");
const { getConfig } = require("../modules/config.js");


module.exports = {
    name: "help",
    description: "Shows available commands.",
    async execute(message, args) {
        const { prefix } = getConfig(message.guild.id);
        const commands = message.client.commands;
        
        const embed = new MessageEmbed()
        .setTitle(`Commands`)
        .setDescription(commands.map(command => `${prefix}${command.name}: ${command.description}`).join("/n"))
        return message.reply({
            embeds: [embed]
        });
    },
};