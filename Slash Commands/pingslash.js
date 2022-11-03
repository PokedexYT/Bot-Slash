const { SlashCommandsBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping del bot como va el bot"),

    async run(client, interaction){
        interaction.reply({ content: `🔹| El ping del Bot es \`${client.ws.ping}ms\``})
    }
}