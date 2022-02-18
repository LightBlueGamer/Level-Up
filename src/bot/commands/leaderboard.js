const { config, profile } = require("../../db/index");
const { getProfile } = require("../modules/profile.js");
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "leaderboard",
    description: "Shows the leaderboard",
    async execute(message, args) {
        const users = [];
        const arg1 = args[1];

        for(const key of await (profile.keys)) {
            const { balance, bank, prestige, xp, level } = await getProfile(key);
            const user = await message.client.users.fetch(key);

            users.push({
                name: user.username,
                id: key,
                xp,
                level,
                prestige,
                balance,
                bank
            });
        };

        let page = !arg1 ? 1 : isNaN(arg1) ? 1 : parseInt(arg1);
        if(page*10>users.length) page = Math.ceil(users.length/10);
        if(page <= 0) page = 1;
        const pageIdx = page - 1;

        const sorted = users.sort((a, b) => {
            if(a.prestige < b.prestige) return 1;
            if(a.prestige === b.prestige && a.level < b.level) return 1;
            if(a.prestige === b.prestige && a.level === b.level && a.xp < b.xp) return 1;
            if(a.prestige === b.prestige && a.level === b.level && a.xp === b.xp && a.balance+a.bank < b.balance+b.bank) return 1;
            if(a.prestige === b.prestige && a.level === b.level && a.xp === b.xp && a.balance+a.bank > b.balance+b.bank) return -1;
            if(a.prestige === b.prestige && a.level === b.level && a.xp > b.xp) return -1;
            if(a.prestige === b.prestige && a.level > b.level) return -1;
            if(a.prestige > b.prestige) return -1;
            else return 0;
        });

        const top10 = sorted.slice(pageIdx * 10, pageIdx * 10 + 10);

        const embed = new MessageEmbed()
            .setTitle(`${message.guild.name} top ${pageIdx * 10 + 10}`)
            .setDescription(`Page ${page}/${Math.ceil(users.length/10)}`)
            .setColor(message.member.roles.highest.hexColor)
            .setFooter({
                text: `You are #${sorted.findIndex(x => x.id === message.author.id)+1} out of ${sorted.length}.`
            })
            for(let i=0; i<top10.length; i++) {
                const ind = top10[i];
                embed.addField(`#${sorted.indexOf(ind)+1} ${ind.name}`,`Balance: $${ind.balance} - Bank: $${ind.bank}\nPrestige: ${ind.prestige} - Level: ${ind.level} - Exp: ${ind.xp}`)
            };
            return message.reply({
                embeds: [embed]
            });
    },
};