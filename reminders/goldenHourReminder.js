const MentionsEnum = require('./schemas/Mentions.js');
const { Reminder } = require('./schemas/Reminder.js');
const { messages } = require('./utils/messages.js');

module.exports = new Reminder('goldenHourReminder',
	messages.golden_hour_reminder,
	'0 12 * * 1-5',
	false,
	MentionsEnum.NONE,
);