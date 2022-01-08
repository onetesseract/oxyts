import { CommandInteraction, Interaction, Message, MessageEmbed } from "discord.js";
import { Discord, Slash } from "discordx";
import { config } from '../config/commands/ping.js'; // TODO: fix this

@Discord()
export abstract class Command {
    @Slash('ping', {'description': 'Ping the bot'})
    async run(inter: CommandInteraction) {
        await inter.reply({content: 'Ping!', ephemeral: true});
        const ping_embed = new MessageEmbed()
            .setColor(config.colour)
            .addField('Ping', 
            `Latency: ${(await inter.fetchReply() as Message).createdTimestamp - inter.createdTimestamp}ms\n\
            Websocket: ${inter.client.ws.ping}ms`, true);
        inter.editReply({embeds: [ping_embed]})
    }
}