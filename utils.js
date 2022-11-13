const MentionsEnum = require('./reminders/schemas/Mentions.js');

function removeGuildSuffix(reminderName) {
	return reminderName.split('-')[0];
}

function addGuildSuffix(reminderName, guildSuffix) {
	return reminderName + '-' + guildSuffix;
}


function formatMentions(mentions) {
	return mentions.map(mention => `<@${mention}>`);
}

function generateMentionsList(mentions) {
	const mentionsList = [];
	switch (mentions) {
	case MentionsEnum.EVERYONE:
		mentionsList.push('@everyone'); 
		break;
	case MentionsEnum.SELF:
		mentionsList.push(formatMentions(interaction.user.id));
		break;
	case MentionsEnum.NONE:
		break;
	}
	return mentionsList;
}

module.exports = {
	removeGuildSuffix,
	addGuildSuffix,
	formatMentions,
	generateMentionsList,
};
