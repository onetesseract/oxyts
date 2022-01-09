import 'reflect-metadata';
import { Client } from 'discordx';
import { Intents, Interaction } from 'discord.js';
import { dirname, importx } from "@discordx/importer";
import { config } from './config/config.js';

import { logger } from './logger.js';

const client: Client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
	// botGuilds: ['846400341108850708'],
});

client.once("ready", async () => {
	// Sync guilds
	await client.guilds.fetch();

	// Initialise commands
	await client.initApplicationCommands({
		guild: {log: true},
		global: {log: true},
	});

	// Initialise permissions
	await client.initApplicationPermissions(true);

	logger.info(`Bot started, serving ${client.guilds.cache.size} guilds`)
});

client.on("interactionCreate", (inter: Interaction) => {
	try {
		client.executeInteraction(inter);
	} catch (e) {
		logger.error(`ERROR running inter`,inter, e);
	}
});

async function main() {
	await importx(dirname(import.meta.url) + "/{events,commands}/**/*.{ts,js}");
	client.login(config.token, true);
}

main();
