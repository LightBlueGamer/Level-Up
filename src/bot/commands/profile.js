const { MessageEmbed } = require("discord.js");
const { getProfile } = require("../modules/profile.js");

module.exports = {
    name: "profile",
    description: "Shows a users profile",
    async execute(message, args) {
        const member = args[0]
            ? message.mentions.members.first() ||
              (await message.guild.members.fetch(args[0])) ||
              message.guild.members.cache.find((x) => x.displayName === args[0])
            : message.member;

        if (member.user.bot)
            return message.reply({
                content: "Bots don't have a profile",
            });

        const { balance, bank, xp, level, prestige } = await getProfile(member.id);

        const embed = new MessageEmbed()
        .setTitle(member.nickname ? `${member.user.tag} AkA ${member.nickname}` : member.user.tag)
        .setDescription(`Balance: ${balance}\nBank: ${bank}\nPrestige: ${prestige}\nLevel: ${level}\nXp: ${xp}`)
        .setColor(member.roles.highest.hexColor)

        message.reply({
            embeds: [embed]
        });
    },
};