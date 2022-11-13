require('dotenv').config();
const cronJob = require('node-cron');
const fs = require('node:fs');
const path = require('node:path');
const genericReminder = require('./reminders/utils/genericReminder.js');
const { addGuildSuffix, generateMentionsList } = require('./utils.js');

function setUpDefaultReminders(guildObj) {
	const { systemChannelId, id: guildId } = guildObj;
	const currentTasks = cronJob.getTasks();

	// Import reminders and set them up if they are not already setup.
	const remindersPath = path.join(__dirname, 'reminders');
	const reminderFiles = fs
		.readdirSync(remindersPath)
		.filter(file => file.endsWith('Reminder.js'));

	for (const reminderFile of reminderFiles) {
		const reminderFilePath = path.join(remindersPath, reminderFile);
		const reminder = require(reminderFilePath);

		const mentionsList = generateMentionsList(reminder.getMentions());

		if (!currentTasks.has(reminder.getName())) {
			genericReminder(systemChannelId,
				addGuildSuffix(reminder.getName(), guildId),
				reminder.getMsg(),
				reminder.getScheduleExpression(),
				reminder.isActive(),
				mentionsList);
		}
	}
}


module.exports = {
	setUpDefaultReminders,
};
