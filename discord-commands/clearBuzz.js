module.exports = {
    name: 'clearbuzz',
    aliases: ['cb'],
    description: 'Clears all buzz word pairs.',
    execute(message, args) {
        if (message.author.username == "skjhfds") {
            const fs = require('fs');
            fs.writeFile('buzz.json', JSON.stringify({}), function (err) {
                if (err) {
                    console.log('Error saving JSON!');
                }
            })
            message.channel.send("All buzzes deleted!");
        } else {
            message.channel.send("You do not have permission to use this command!");
        }
    }
}