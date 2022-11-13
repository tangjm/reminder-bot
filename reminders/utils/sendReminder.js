const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

module.exports = async function sendReminder(channelId, msg, mentions) {
	const msgWithMentions = mentions.length > 0
		? msg + '\n' + mentions.join('')
		: msg;
	try {
		const res = await rest.post(Routes.channelMessages(channelId), {
			body: {
				content: msgWithMentions,
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
