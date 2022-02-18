const Josh = require("@joshdb/core");
const provider = require("@joshdb/sqlite");

const profile = new Josh({
    name: "profile",
    provider
});

const config = new Josh({
    name: "config",
    provider
});

module.exports = { profile, config };