const { GatewayIntentBits, Client, Collection, DiscordAPIError } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
const config = require(`${process.cwd()}/config.json`);
const fs = require('fs');
require('colors');

console.log('Bot_Prueba.Online'.green)

client.login(config.token)

    client.color = config.color;

client.slashcommands = new Collection()
const slashComandos = fs.readdirSync("./Slash Commands").filter(file => file.endsWith(".js"))
for (const file of slashComandos){
    const slash = require(`./Slash Commands/${file}`)
    console.log(`comando - Slash ${file} cargado`.yellow)
    client.slashcommands.set(slash.data.name, slash)
}
client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand) return;

    const slashComs = client.slashcommands.get(interaction.commandName)

    if(!slashComs) return;
    try{
        await slashComs.run(client, interaction)
    } catch(e){
        console.error(e)
    }
});