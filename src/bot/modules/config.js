const { config } = require("../../db/index.js");

async function getConfig(guildId) {
    return await config.ensure(guildId, {
        prefix: "!"
    })
}

module.exports = {
    getConfig
}