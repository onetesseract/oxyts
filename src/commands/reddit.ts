import axios from "axios";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";
import { config } from '../config/commands/reddit.js';

@Discord()
export abstract class Command {
    @Slash('reddit', {'description': 'Get a random image from a specified subreddit'})
    async run(
        @SlashOption("subreddit", {"description": "The subreddit to fetch from"})
        subreddit: string,
        @SlashChoice("day", "day")
        @SlashChoice("week", "week")
        @SlashChoice("month", "month")
        @SlashChoice("year", "year")
        @SlashChoice("all time", "all")
        @SlashOption("time", {required: false, description: "The time period to pick from", type: 'STRING'})
        time: string | undefined | null,
        inter: CommandInteraction
    ) {
        await inter.deferReply();

        let params = {'sort': 'top', 'limit': 100, 't': 'month'};
        if (time && time != null && time != '') {
            params['t'] = time;
        }

        axios.get(`https://www.reddit.com/r/${subreddit}/top.json`, { params: params })
        .then((res) => {
            let posts = res.data.data.children.filter((post: { data: { over_18: any; }; }) => {
                return (post.data.over_18 && config.allow_nsfw && inter.channel?.isText && inter.channel['nsfw']) || !post.data.over_18
            });
            if (posts.length == 0) {
                if (res.data.data.children.length != 0) {
                    inter.editReply(`No valid posts found. ${config.allow_nsfw ? 'You may be trying to access a nsfw sub in a sfw channel' : 'The bot owner may have disabled nsfw.'}`);
                } else {
                    inter.editReply('No valid posts found.');
                }
                return;
            }
            let post = posts[Math.floor(Math.random() * posts.length)]
            let embed = new MessageEmbed()
                .setColor(config.colour)
                .setTitle(post.data.title.length > 256 ? post.data.title.slice(0, 250) + '...' : post.data.title)
                .setURL(post.data.url)
                .setTimestamp(post.data.created_utc * 1000) // wants a ms time
                .setAuthor({name: post.data.author, url: `https://reddit.com/u/${post.data.author}`})
                .setFooter({text: `r/${subreddit} - upvotes: ${post.data.ups} - comments: ${post.data.num_comments}`})
            
            if (post.data.post_hint && post.data.post_hint == 'image') {
                embed = embed.setImage(post.data.url);
            } else if (post.data.selftext && post.data.selftext != '') {
                embed = embed.setDescription(post.data.selftext.length > 4096 ? post.data.selftext.slice(0, 4090) + '...' : post.data.selftext)
            } else {
                // TODO: other media types
                inter.editReply('We don\'t seem to support the media type of the selected post at this time.');
                return;
            }
            inter.editReply({embeds: [embed]});
        }).catch((err) => {
            if (err?.response?.status == 404) {
                inter.editReply(`We encountered a Not Found. ${subreddit} does not seem to exist.`);
            } else {
                inter.editReply(`We encountered a strange error fetching your content.`)
            }
        })
    }
}