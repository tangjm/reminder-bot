const genericReminder = require('./utils/genericReminder.js');
const { messages } = require('./utils/messages.js');

module.exports = function morningReminder(channelId) {
	const reminderId = morningReminder.name;
	const msg = messages.morning_reminder;
	const scheduleExpression = '0 9 * * *';
	genericReminder(reminderId, msg, channelId, scheduleExpression);
};