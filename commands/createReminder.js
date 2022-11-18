const { SlashCommandBuilder } = require('discord.js');
const MentionsEnum = require('../reminders/schemas/Mentions');
const { Reminder } = require('../reminders/schemas/Reminder');
const { addGuildSuffix, makeMentionsList } = require('../utils');
const genericOperationsTable = global.genericOperationsTable;

async function execute(interaction) {
	const guildId = interaction.guildId;
	const channelId = interaction.options.getChannel('select-channel').id;
	const reminderName = interaction.options.getString('remindername');
	const msg = interaction.options.getString('message');
	const scheduleExpression = interaction.options.getString('schedule-expression');
	const mentions = interaction.options.getString('mentions');
	const userId = interaction.user.id;

	const mentionsList = makeMentionsList(mentions, [userId]);

	const reminder = new Reminder(
		addGuildSuffix(reminderName, guildId),
		msg,
		scheduleExpression,
		true,
		mentionsList,
	);
	const result = genericOperationsTable.get('create')(guildId)(reminder, channelId);
	await interaction.reply({ content: result, ephemeral: true });
}

const mentionOptions = [
	{ name: '@Everyone', value: MentionsEnum.EVERYONE },
	{ name: '@Self', value: MentionsEnum.SELF },
	{ name: 'None', value: MentionsEnum.NONE },
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createreminder')
		.setDescription('Create a new reminder. Usage: /createreminder <reminderName>')
		.addStringOption(option =>
			option.setName('remindername')
				.setDescription('Name of new reminder')
				.setRequired(true))
		.addChannelOption(option =>
			option.setName('select-channel')
				.setDescription('Channel to which the reminder will be sent.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('message')
				.setDescription('Enter your reminder message.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('schedule-expression')
				.setDescription('Provide the reminder schedule using cron syntax.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('mentions')
				.setDescription('Specify any mentions for your reminder.')
				.addChoices(...mentionOptions)
				.setRequired(true)),
	execute,
};
