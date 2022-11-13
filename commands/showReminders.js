const { SlashCommandBuilder } = require('discord.js');
const genericOperationsTable = global.genericOperationsTable;

async function execute(interaction) {
	await interaction.deferReply({ ephemeral: true });

	const guildId = interaction.guildId;
	const responseData = genericOperationsTable.get('showall')(guildId)();
	const messageContent = '```json\n' + JSON.stringify(responseData, null, 4) + '\n```';

	await interaction.editReply({ content: messageContent });
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showreminders')
		.setDescription('Show all reminders'),
	execute,
};