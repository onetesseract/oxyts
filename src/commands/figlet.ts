import { CommandInteraction, Interaction, Message, MessageEmbed } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
// import { config } from '../config/commands/ping.js'; // TODO: fix this

@Discord()
export abstract class Command {
    @Slash('figlet', {'description': 'Figlet some text'})
    async run(
        @SlashOption('text', {'description': "The text to render"})
        text: string,
        inter: CommandInteraction
    ) {

    }
}