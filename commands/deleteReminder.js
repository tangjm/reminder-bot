const { SlashCommandBuilder } = require('discord.js');
const genericOperationsTable = global.genericOperationsTable;

async function execute(interaction) {
	const reminderName = interaction.options.getString('remindername');
	const guildId = interaction.guildId;
	const result = genericOperationsTable.get('delete')(guildId)(reminderName);
	await interaction.reply({ content: result, ephemeral: true });
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deletereminder')
		.setDescription('Delte an existing reminder. Usage: /deletereminder <reminderName>')
		.addStringOption(option =>
			option.setName('remindername')
				.setDescription('Name of reminder to delete')
				.setRequired(true)),
	execute,
}
