module.exports = {
    name: 'addbuzz',
    aliases: ['ab'],
    description: 'Creates buzz word pairs.',
    execute(message, args) {
        addBuzz(message, args);
    }
}

const fs = require('fs');

function addBuzz(m, a) {
    // Create Buzz-Response pair and check if valid
    let pair = a.join(' ').split(' : ');
    if (pair.length != 2) {
        pair = pair.join('').split(':');
        if (pair.length != 2) {
            console.log("    Invalid Pair!");
            m.channel.send("Invalid Pair!");
            return
        }
    }

    // Import existing Buzzes
    let buzzes = JSON.parse(fs.readFileSync('buzz.json'));
    pair[0] = pair[0].toLowerCase();
    buzzes[pair[0]] = pair[1];
    console.log(buzzes);

    fs.writeFile('buzz.json', JSON.stringify(buzzes), function (err) {
        if (err) {
            console.log('Error saving JSON!');
        }
    })

    m.channel.send(`**${pair[0]}** -> ${pair[1]}\nBuzz Pair made!`);
}