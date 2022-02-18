const { config } = require("../../db/index.js");

module.exports = {
    name: "prefix",
    description: "Change bot prefix",
    async execute(message, args) {
        if(!message.member.permissions.has("MANAGE_SERVER")) return message.reply({
            content: `You don't have permission to change the prefix.`
        });
        const prefix = args[0];
        if(!prefix) return message.reply({
            content: `You must specify the new prefix.`
        });
        if(prefix.length > 5 || prefix.length < 1) return message.reply({
            content: `The new prefix cannot be longer than 5 characters of shorter than 1 character!`
        });
        await config.set(`${message.guild.id}.prefix`, prefix);
        return message.reply({
            content: `The prefix for the bot has been changed to ${prefix}`
        });
    },
};