const genericReminder = require('./utils/genericReminder.js');
const { messages } = require('./utils/messages.js');

module.exports = function goldenHourReminder(channelId) {
	const reminderId = goldenHourReminder.name;
	const msg = messages.golden_hour_reminder;
	const scheduleExpression = '0 12 * * *';
	genericReminder(reminderId, msg, channelId, scheduleExpression);
};