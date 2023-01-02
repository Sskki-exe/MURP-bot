const Discord = require('discord.js');
const fs = require('fs');

/**
 * Initialise
 */
const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.MessageContent,
		Discord.GatewayIntentBits.GuildMembers,
	],
});

const discordInfo = require("./Credentials/discord.json");
const BOT_TOKEN = discordInfo["bot_token"];
const TAVERN_ID = discordInfo["tavern_id"];

// Import commands folder
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./discord-commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./discord-commands/${file}`);
    client.commands.set(command.name, command);
}

/**
 * On Ready
 */
client.once('ready', () => {
    client.channels.cache.get(TAVERN_ID).send("The Tavern is open!");
});

/**
 * While Running
 */
const buzz = require('./buzz.js');
client.on('messageCreate', message => {
    // ignore self
    if (message.author.bot) {
        console.log('bot: ' + message.content);
        return
    }
    const args = message.content.split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if (command && (message.channel == TAVERN_ID)) {
        console.log(`  ${message.author.username} -${cmd}: ${args}`);
        command.execute(message, args);
    } else {
        buzz.buzz(message);
    }
})

client.login(BOT_TOKEN); // Start bot