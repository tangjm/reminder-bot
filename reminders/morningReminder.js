const MentionsEnum = require('./schemas/Mentions.js');
const { Reminder } = require('./schemas/Reminder.js');
const { messages } = require('./utils/messages.js');

module.exports = new Reminder('morningReminder',
	messages.morning_reminder,
	'0 9 * * 1-5',
	false,
	MentionsEnum.NONE,
);