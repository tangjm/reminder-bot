const MentionsEnum = require('./reminders/schemas/Mentions.js');

function removeGuildSuffix(reminderName) {
	return reminderName.split('-')[0];
}

function addGuildSuffix(reminderName, guildSuffix) {
	return reminderName + '-' + guildSuffix;
}


function makeUserIdList(userIdArray) {
	return userIdArray.map(mentionUser);
}

function mentionEveryone() {
	return '@everyone';
}

function mentionUser(userId) {
	return `<@${userId}>`; 
}

function makeMentionsList(mentions, userIdArray) {
	console.log("makeMentionsList -mentions:", mentions);
	const mentionsList = [];
	switch (mentions) {
	case MentionsEnum.EVERYONE:
		mentionsList.push(mentionEveryone()); 
		break;
	case MentionsEnum.SELF:
		mentionsList.push(makeUserIdList(userIdArray));
		break;
	case MentionsEnum.NONE:
		break;
	}
	console.log("makeMentionsList - mentionsList", mentionsList);
	return mentionsList;
}

module.exports = {
	removeGuildSuffix,
	addGuildSuffix,
	makeMentionsList,
};
