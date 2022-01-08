import axios from "axios";
import { CommandInteraction, Interaction, Message, MessageEmbed } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import { config } from '../config/commands/reddit.js';

@Discord()
export abstract class Command {
    @Slash('reddit', {'description': 'Get a random image from a specified subreddit'})
    async run(
        // @SlashOption("subreddit", {"description": "The subreddit to fetch from"})
        subreddit: string,
        // @SlashChoice("day", "day")
        // @SlashChoice("week", "week")
        // @SlashChoice("month", "month")
        // @SlashOption("time", {required: false, description: "The time period to pick from"})
        time: string | undefined | null,
        inter: CommandInteraction
    ) {
        await inter.reply("working on it");

        let params = {'sort': 'top', 'limit': 750};
        if (time && time != null && time != '') {
            params['t'] = time;
        }

        axios.get(`https://www.reddit.com/r/${subreddit}.json`, { params: params })
        .then((res) => {
            let posts = res.data.children.filter((post) => {
                return (post.data.over_18 && config.allow_nsfw && inter.channel?.isText && inter.channel['nsfw']) || !post.data.over_18
            });
            if (posts.length == 0) {
                if (res.data.children.length != 0) {
                    inter.reply(`No valid posts found. ${config.allow_nsfw ? 'You may be trying to access a nsfw sub in a sfw channel' : 'The bot owner may have disabled nsfw.'}`);
                } else {
                    inter.reply('No valid posts found.');
                }
                return;
            }
            let post = posts[Math.floor(Math.random() * posts.length)]
            let embed = new MessageEmbed()
                .setColor(config.colour)
                .setTitle(post.data.title.length > 256 ? post.data.title.slice(0, 250) + '...' : post.data.title)
                .setAuthor({name: post.data.author, url: `https://reddit.com/u/${post.data.author}`})
                .setFooter({text: `r/${subreddit} - upvotes: ${post.data.ups} - comments: ${post.data.num_comments}`})
            
            if (post.data.post_hint && post.data.post_hint == 'image') {
                embed = embed.setImage(post.data.url);
            } else {
                // TODO: other media types
                inter.editReply('We don\'t seem to support the media type of the selected post at this time.');
                return;
            }
            inter.editReply({content: '', embeds: [embed]});

        })
    }
}