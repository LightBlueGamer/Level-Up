const { profile } = require("../../db/index.js");
const { randomNum } = require("./general.js");

async function getProfile(userId) {
    return await profile.ensure(userId, {
        prestige: 0,
        level: 1,
        xp: 0,
        balance: 0,
        bank: 0
    })
};

async function booster(userId, baseValue, boost) {
    const { prestige } = await getProfile(userId);
    return baseValue + (baseValue*(prestige*boost));
};

async function canLevelUp(userId) {
    const { xp, level } = await getProfile(userId);
    return xp >= (level * 150);
};

async function levelUp(userId) {
    await profile.set(`${userId}.xp`, 0);
    await profile.inc(`${userId}.level`);
};

async function income(userId) {
    const xp = await booster(userId, randomNum(2,5), 0.10)
    const money = await booster(userId, randomNum(1,3), 0.05)
    await profile.math(`${userId}.xp`, `+`, xp);
    await profile.math(`${userId}.balance`, `+`, money);
};

module.exports = {
    getProfile,
    booster,
    canLevelUp,
    levelUp,
    income
};