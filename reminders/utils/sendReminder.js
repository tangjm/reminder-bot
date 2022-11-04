const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

module.exports = async function sendReminder(CHANNEL_ID, msg) {
	try {
		const res = await rest.post(Routes.channelMessages(CHANNEL_ID), {
			body: {
				content: msg,
			},
		});
		const formattedTimestamp = new Intl.DateTimeFormat('en-GB', {
			dateStyle: 'full',
			timeStyle: 'long',
			timeZone: 'Europe/London',
		}).format(res.timestemp);
		console.log('Reminder sent at: ', formattedTimestamp);
	}
	catch (error) {
		console.error(error);
	}
};