import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption } from "discordx";
import figlet from 'figlet';
import { logger } from "../logger.js";

@Discord()
export abstract class Command {
    @Slash('figlet', {'description': 'Figlet some text'})
    async run(
        @SlashOption('text', {'description': "The text to render"})
        text: string,
        inter: CommandInteraction
    ) {
        figlet(text, (err, data) => {
            if (err) {
                inter.reply('Something went wrong rendering your text.');
                logger.error('figlet rendering', err);
            } else {
                inter.reply(`\`\`\`${data}\`\`\``)
            }
        })
        
    }
}