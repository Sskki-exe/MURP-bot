module.exports = {buzz};
function buzz(message){
    const msg = message.content.toLowerCase();
    console.log(`${message.author.username}: ${msg}`);

    // import buzzes
    const fs = require('fs');
    let buzzes = JSON.parse(fs.readFileSync('buzz.json'));
    
    // check if word in buzzes
    for (const word of msg.split(' ')) {
        //console.log(word);
        if (Object.keys(buzzes).includes(word)){
            message.channel.send(buzzes[word]);
            return
        }
    }
    if (Object.keys(buzzes).includes(msg)){
        console.log(msg);
        message.channel.send(buzzes[msg]);
    }
}