import { CommandInteraction, Interaction, Message, MessageEmbed } from "discord.js";
import { Discord, Slash } from "discordx";
import { config } from '../config/commands/excuses.js'; // TODO: fix this

@Discord()
export abstract class Command {
    @Slash('excuse', {'description': 'Get an excuse for something going badly'})
    async run(inter: CommandInteraction) {
        await inter.reply(`${config.excuses[Math.floor(Math.random() * config.excuses.length)]}`)
    }
}