const cronJob = require('node-cron');
const genericReminder = require('./reminders/utils/genericReminder.js');
const { addGuildSuffix, removeGuildSuffix } = require('./utils.js');
// Generic operations on scheduled reminders
global.genericOperationsTable = new Map();

const genericOperationsTable = global.genericOperationsTable;

function install_generic_operations_on_reminders() {
	genericOperationsTable.set('activate',
		(guildId) => {
			return (reminderName) => {
				console.log('reminderName', reminderName);
				const reminderId = addGuildSuffix(reminderName, guildId);
				const reminder = cronJob.getTasks().get(reminderId);
				if (!reminder) {
					return reminderName + 'does not exist. Please check for spelling errors.';
				}
				const isActive = reminder.options.scheduled;
				if (!isActive) {
					reminder.start();
					reminder.options.scheduled = true;
				}
				return 'reminder is active';
			};
		});
	genericOperationsTable.set('deactivate',
		(guildId) => {
			return (reminderName) => {
				const reminderId = addGuildSuffix(reminderName, guildId);
				const reminder = cronJob.getTasks().get(reminderId);
				if (!reminder) {
					return reminderName + 'does not exist. Please check for any spelling errors.';
				}
				const isActive = reminder.options.scheduled;
				if (isActive) {
					reminder.stop();
					reminder.options.scheduled = false;
				}
				return 'reminder is no longer active';
			};
		});
	genericOperationsTable.set('create', 
		(guildId) => {
			return (reminder, channelId) => {
				// check if reminder already exists
				if (cronJob.getTasks().get(reminder.getName()) !== undefined) {
					return 'reminder already exists';
				}
				genericReminder(channelId, 
						reminder.getName(), 
						reminder.getMsg(),
						reminder.getScheduleExpression(),
						reminder.isActive(),
						reminder.getMentions());
				return 'reminder has been scheduled';
			}
		});
	genericOperationsTable.set('delete', 
		(guildId) => {
			return (reminderName) => {
				const reminderId = addGuildSuffix(reminderName, guildId);
				const successful = cronJob.getTasks().delete(reminderId);
				if (!successful) {
					return reminderName + 'does not exist. Please check for any spelling errors.';
				}
				return 'reminder has been deleted';
			}
		});
	genericOperationsTable.set('showall',
		(guildId) => {
			return () => {
				const allReminders = cronJob.getTasks();
				const reminders = allReminders.keys();

				const reminderList = [];
				for (const reminder of reminders) {
					if (reminder.endsWith(guildId)) {
						const reminderObj = {
							[removeGuildSuffix(reminder)]: {
								'isActive': allReminders.get(reminder).options.scheduled,
							},
						};
						reminderList.push(reminderObj);
					}
				}
				const responseData = {
					total_reminders: reminderList.length,
					reminderList,
				};

				return responseData;
			};
		});
}


module.exports = {
	install_generic_operations_on_reminders,
};

