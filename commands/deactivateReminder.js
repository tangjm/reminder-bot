const { SlashCommandBuilder } = require('discord.js');
const genericOperationsTable = global.genericOperationsTable;

async function execute(interaction) {
	const reminderName = interaction.options.getString('remindername');
	const guildId = interaction.guildId;
	const result = genericOperationsTable.get('deactivate')(guildId)(reminderName);
	await interaction.reply({ content: result, ephemeral: true });
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deactivatereminder')
		.setDescription('Deactivate a reminder. Usage: /deactivateReminder <reminderName>')
		.addStringOption(option =>
			option.setName('remindername')
				.setDescription('Name of reminder you would like to make inactive')
				.setRequired(true)),
	execute,
};