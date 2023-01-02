module.exports = {
    name: 'removebuzz',
    aliases: ['rb', 'db', 'deletebuzz'],
    description: 'Deletes buzz word pairs.',
    execute(message, args) {
        if (message.author.username == "skjhfds") {
            addBuzz(message, args);
        } else {
            message.channel.send("You do not have permission to use this command!");
        }
    }
}

const fs = require('fs');

function addBuzz(m, a) {

    // Import existing Buzzes
    let buzzes = JSON.parse(fs.readFileSync('buzz.json'));
    try {
        delete buzzes[a.join(' ')];
        m.channel.send(`**${a.join(' ')}**\nBuzz deleted!`)
    } catch (err) {
        m.channel.send("Buzz not found!");
        return
    }
    console.log(buzzes);

    fs.writeFile('buzz.json', JSON.stringify(buzzes), function (err) {
        if (err) {
            console.log('Error saving JSON!');
        }
    })
}