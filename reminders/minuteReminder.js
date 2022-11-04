const genericReminder = require('./utils/genericReminder.js');
const { messages } = require('./utils/messages.js');

module.exports = function minuteReminder(channelId) {
	const reminderId = minuteReminder.name;
	const msg = messages.minute_reminder;
	const scheduleExpression = '* * * * *';
	genericReminder(reminderId, msg, channelId, scheduleExpression);
};