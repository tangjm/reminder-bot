const cronJob = require('node-cron');
const sendReminder = require('./sendReminder.js');

const scheduleOptionsGeneric = {
	timezone: 'Europe/London',
	scheduled: true,
	recoverMissedExecutions: false,
};

module.exports = function genericReminder(reminderId, msg, mainChannelId, scheduleExpression, scheduleOptions = scheduleOptionsGeneric) {
	if (reminderId) {
		scheduleOptions.name = reminderId;
	}
	cronJob.schedule(scheduleExpression, async () => {
		try {
			await sendReminder(mainChannelId, msg);
			console.log('Sent ', reminderId);
		}
		catch (e) {
			console.log('Failed to send reminder');
		}
	}, scheduleOptions);
};

