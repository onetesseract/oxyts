import { Message, TextChannel } from "discord.js";
import { Discord, On } from "discordx";
import { config } from "../config/events/autoreply.js";
import { client } from "../index.js";
import { logger } from "../logger.js";

export let replies: Reply[] = [];

class Reply {
    delay: Number | null;
    server: string | null;
    channel: string | null;
    user: string | null;
    ignore_case: boolean | null;
    match_type: string;
    match_value: string | null;
    response: string;
    negate: string[];
    reply_direct: boolean;

    check(message: Message): boolean {
        // it let message = _message[0]; // todo: why
        let checks = {};
        checks['server'] = this.server ? this.server == message.guildId : true;
        checks['channel'] = this.channel ? this.channel == message.channelId : true;
        checks['user'] = this.user ? this.user == message.author.id : true;
        // logger.silly(this, checks);
        this.negate.forEach((n) => {
            checks[n] = !checks[n];
        })

        for (let k in checks) {
            if (!checks[k]) { return false; }
        }

        switch (this.match_type) {
            case 'whole': {
                return this.ignore_case ? message.content.toLowerCase() == this.match_value?.toLowerCase() : message.content == this.match_value;
            };
            case 'contains': {
                return this.ignore_case ? message.content.toLowerCase().includes((this.match_value ?? '').toLowerCase()) : message.content.includes(this.match_value ?? '');
            }
            case 'any': {
                return true;
            }
            default: {
                logger.error(`Cannot find match type ${this.match_type}`);
                return false;
            }
        }
    }
}

function from_reply(conf): Reply {
    logger.info('conf', conf);
    let r = new Reply();
    r.delay = conf.delay ?? null;
    r.server = conf.server ?? null;
    r.channel = conf.channel ?? null;
    r.user = conf.user ?? null;
    r.ignore_case = conf.ignore_case ?? null;
    r.match_type = conf.match_type;
    r.match_value = conf.match_value ?? null;
    r.response = conf.response;
    r.negate = conf.negate ?? [];
    r.reply_direct = conf.reply_direct ?? false;
    return r;
}

function init_replies() {
    config['replies'].forEach((i) => {
        replies.push(from_reply(i));
    });
    logger.info(`Loaded ${config['replies'].length} replies`);
}

init_replies();

@Discord()
abstract class Event {
    @On('messageCreate')
    async run(
        _message: Message
    ) {
        let message = _message[0]; // todo: why?
        logger.silly(message.author.username, message.content);
        // if (message.author == '692350815679152179') { return; }
        if (message.content == '~rl-auto' && message.author.id == '692312512900890644') {
            init_replies();
            message.reply('done lol');
        }
        replies.forEach(async (reply) => {
            if (reply.check(message)) {
                if (reply.reply_direct) {
                    message.reply(reply.response);
                } else {
                    message.channel.send(reply.response);
                }
            }
        })
    }
}