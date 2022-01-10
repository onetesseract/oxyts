import { CommandInteraction, Interaction, Message, MessageEmbed } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import 'axios';
import { config } from '../config/commands/gimme.js'; // TODO: fix this
import axios from "axios";
import { logger } from "../logger.js";

@Discord()
export abstract class Command {
    @Slash('gimme', {'description': 'Get a cool image from various sources'})
    async run(
        @SlashChoice("nasa", "nasa")
        @SlashChoice("meme", "meme")
        @SlashChoice("dog", "dog")
        @SlashChoice("cat", "cat")
        @SlashOption("type", { description: "what type of image to get" })
        type: string,
        inter: CommandInteraction
    ) {
        await inter.deferReply();

        switch(type) {

            case "nasa": {
                axios.get('https://api.nasa.gov/planetary/apod', { params: {
                    "api_key": config.keys.nasa
                }}).then((res) => {
                    console.log(`RES: ${res}`)
                    const embed = new MessageEmbed()
                        .setDescription(res.data["explanation"])
                        .setImage(res.data["hdurl"] ?? res.data["url"])
                        .setColor(config?.colours?.nasa ?? config.colour);
                    inter.editReply({ content: '', embeds: [embed] })
                }).catch((err) => {
                    logger.warn(`Error fetching NASA image api: ${err}`);
                    inter.editReply(config?.errors?.nasa ?? config.error);
                });
                break;
            }

            case "meme": {
                axios.get('http://meme-api.herokuapp.com/gimme')
                .then((res) => {
                    const embed = new MessageEmbed()
                        .setImage(res.data["url"])
                        .setColor(config?.colours?.meme ?? config.colour);
                    inter.editReply({ content: '', embeds: [embed] })
                }).catch((err) => {
                    logger.warn(`Error fetching meme image api: ${err}`);
                    inter.editReply(config?.errors?.meme ?? config.error);
                });
                break;
            }

            default: {
                inter.editReply(config.notimpl);
            }
        }
    }
}