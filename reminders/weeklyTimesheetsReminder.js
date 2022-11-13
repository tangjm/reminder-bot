const MentionsEnum = require('./schemas/Mentions.js');
const { Reminder } = require('./schemas/Reminder.js');
const { messages } = require('./utils/messages.js');

module.exports = new Reminder('weeklyTimesheetsReminder',
	messages.weekly_timesheets_reminder,
	'0 17 * * FRI',
	true,
	MentionsEnum.EVERYONE,
);