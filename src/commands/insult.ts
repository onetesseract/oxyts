import { CommandInteraction, User } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import axios from "axios";
import { config } from '../config/commands/insult.js'

@Discord()
export abstract class Command {
    @Slash('insult', {'description': 'Get an insult (optionally insulting someone'})
    async run(
        @SlashOption("name", {type: "USER", required: false, description: "Insult a particular someone"})
        who: User | undefined | null,
        inter: CommandInteraction
    ) {
        await inter.reply('working on it');

        if (who && who != null) {
            axios.get('https://insult.mattbas.org/api/insult.json', {
                params: {
                    "who": `<>`,
                }
            }).then((res) => {
                // console.log(res.data);
                inter.editReply(`<@${who.id}>` + res.data.insult);
            }).catch((err) => {
                inter.editReply(config.error)
            });
        } else {
            axios.get('https://insult.mattbas.org/api/insult.json').then((res) => {
                inter.editReply(res.data.insult);
            }).catch((err) => {
                inter.editReply(config.error)
            });
        }
    }
}