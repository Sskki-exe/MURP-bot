module.exports = {
    name: 'showbuzz',
    aliases: ['sb','showmethebuzz'],
    description: 'Sends JSON of buzz word pairs.',
    execute(message) {
        message.channel.send({ files: ['buzz.json'] });
    }
}