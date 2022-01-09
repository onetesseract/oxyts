import { CommandInteraction, Interaction, Message, MessageEmbed, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export abstract class Command {
    @Slash('serverinfo', {'description': 'Get information about the current server'})
    async run(
        inter: CommandInteraction
    ) {

    }
}