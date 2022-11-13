const MentionsEnum = require('./schemas/Mentions.js');
const { Reminder } = require('./schemas/Reminder.js');
const { messages } = require('./utils/messages.js');

module.exports = new Reminder('minuteReminder',
	messages.minute_reminder,
	'* * * * *',
	false,
	MentionsEnum.NONE,
);