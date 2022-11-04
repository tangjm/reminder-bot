const genericReminder = require('./utils/genericReminder.js');
const { messages } = require('./utils/messages.js');

module.exports = function weeklyTimesheetsReminder(channelId) {
	const reminderId = weeklyTimesheetsReminder.name;
	const msg = messages.weekly_timesheets_reminder;
	const scheduleExpression = '0 17 * * FRI';
	genericReminder(reminderId, msg, channelId, scheduleExpression);
};