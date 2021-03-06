const client = require("../index");
const { config, profile } = require("../../db/index");
const { income, canLevelUp, levelUp, getProfile } = require("../modules/profile.js");
const { getConfig } = require("../modules/config.js");

const incomeCooldown = new Set();

module.exports = {
    name: "messageCreate",
    async execute(message) {
        const { prefix } = await getConfig(message.guild.id);

        if (message.author.bot) return;

        // Economy & Levels
        await getProfile(message.author.id);

        if(!incomeCooldown.has(message.author.id)) {
            await income(message.author.id);
            incomeCooldown.add(message.author.id);
            setTimeout(() => {
                incomeCooldown.delete(message.author.id);
            }, 30*1000);
        };

        if(await canLevelUp(message.author.id)) {
            await levelUp(message.author.id);
            const { level } = await getProfile(message.author.id);
            message.reply({
                content: `You have leveled up to level ${level}!`
            });
        };
        // Economy & Levels

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);

        if (!command) return;

        try {
            command.execute(message, args);
        } catch (error) {
            return console.log(error);
        };
    },
};