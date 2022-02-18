const { profile } = require("../../db/index.js")
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        let users = 0;
        const guilds = client.guilds.cache;
        for (const guildData of guilds) {
            users += client.guilds.cache.get(guildData[0]).memberCount;
        }
        console.log(
            `Ready! Logged in as ${
                client.user.tag
            }\nAwaiting commands in ${
                guilds.size
            } servers from ${users} users!`
        );
    },
};