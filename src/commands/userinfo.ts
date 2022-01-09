import { CommandInteraction, Interaction, Message, MessageEmbed, User } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";

@Discord()
export abstract class Command {
    @Slash('userinfo', {'description': 'Get information about a server member'})
    async run(
        @SlashOption('user', {'description': "The user to lookup", 'type': 'USER'})
        user: User,
        inter: CommandInteraction
    ) {

    }
}