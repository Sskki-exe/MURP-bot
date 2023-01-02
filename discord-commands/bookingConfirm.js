module.exports = {
    name:'bookingconfirm',
    description:'Cross references toVenues and fromVenues Google Sheets to send automated emails of booking confirmations to GMs',
    execute(message, args) {
        main(message, args);
    }
}

const sheetCommands = require("../bot-js/sheetCommands");
const emailCommands = require("../bot-js/emailCommands");

async function main(m, a) {
    var matches = await sheetCommands.match(m, a);
    for (let match of matches){
        emailCommands.bookingConfirm(m, match);
    }
}