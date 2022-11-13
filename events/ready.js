const { Events } = require('discord.js');
const { setUpDefaultReminders } = require('../setUpDefaultReminders.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		// Setup an instance of each default reminder for each guild.
		const guildIdToGuildMapping = await client.guilds.fetch();
		guildIdToGuildMapping.forEach(async partialGuildObj => {
			const guild = await partialGuildObj.fetch();
			setUpDefaultReminders(guild);
		});
	},
};