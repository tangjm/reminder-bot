const cronJob = require('node-cron');
const sendReminder = require('./sendReminder.js');

const scheduleOptionsGeneric = {
	timezone: 'Europe/London',
	recoverMissedExecutions: false,
};

module.exports = function genericReminder(channelId, reminderId, msg, scheduleExpression, isActive, mentions) {
	const scheduleOptions = {
		name: reminderId,
		scheduled: isActive,
		... scheduleOptionsGeneric,
	};

	const scheduledTask = async () => {
		try {
			await sendReminder(channelId, msg, mentions);
			console.log('Sent ', reminderId);
		}
		catch (e) {
			console.log('Failed to send reminder');
		}
	};

	return cronJob.schedule(scheduleExpression, scheduledTask, scheduleOptions);
};

