const client = require("../index");
const { config, profile } = require("../../db/index");
const { income, canLevelUp, levelUp, getProfile } = require("../modules/profile.js");

const incomeCooldown = new Set();

module.exports = {
    name: "messageCreate",
    async execute(message) {
        const prefix = await config.get(`${message.guild.id}.prefix`);

        if (message.author.bot) return;

        // Economy & Levels
        getProfile(message.author.id);
        income(message.author.id);
        if(canLevelUp(message.author.id)) {
            levelUp(message.author.id);
            const { level } = await getProfile(message.author.id);
            return message.reply({
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