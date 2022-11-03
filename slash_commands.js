const fs = require("fs")
const Discord = require("discord.js")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { clientId } = require("./config.json")
const commands = []
const slashComandos = fs.readdirSync("./Slash Commands").filter(file => file.endsWith(".js"))
for (const file of slashComandos){
    const slash = require(`./Slash Commands/${file}`)
    commands.push(slash.data.toJSON())
}
const rest = new REST({ version: "9"}).setToken("MTAyMDEwMDE0NDU1MDY1ODEyOA.GDUQLC.qrxgfi7hm49AmGf4gF-lxaNmnX27vc9jUK-boA")
createSlash()
async function createSlash(){
    try{
        await rest.put(
            Routes.applicationCommands(clientId), {
                body: commands
            }
        )
        console.log("comandos Slash Cargados...".blue)
    }catch(e){
        console.error(e)
    }
}