const { MessageEmbed } = require("discord.js");
const { getProfile, prestige } = require("../modules/profile.js");

module.exports = {
    name: "prestige",
    description: "Prestige to reset from level 0 with a boost!",
    async execute(message, args) {
        const { level, prestige } = await getProfile(message.author.id);
        if(level < 100) return message.reply({
            content: "You must be atleast level 100 to prestige!"
        });

        await prestige(message.author.id);
        return message.reply({
            content: `You have prestiged to prestige ${prestige+1}! Your xp and level has been reset.`
        });
    },
};