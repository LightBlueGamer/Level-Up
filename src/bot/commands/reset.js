const { config, profile } = require("../../db/index.js");

module.exports = {
    name: "reset",
    description: "Reset database",
    async execute(message, args) {
        if(message.author.id !== "232466273479426049") return message.reply({
            content: `You don't have permission to reset the db.`
        });
        await profile.delete(profile.all);
    },
};