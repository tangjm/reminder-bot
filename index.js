require('dotenv').config();
const express = require('express');
const cronJob = require('node-cron');
const fs = require('node:fs');
const path = require('node:path');


// Log in Reminder Discord Bot
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);


const currentTasks = cronJob.getTasks();

// Import reminders and set them up if they are not already setup.
const remindersPath = path.join(__dirname, 'reminders');
const reminderFiles = fs
	.readdirSync(remindersPath)
	.filter(file => file.endsWith('Reminder.js'));

for (const reminderFile of reminderFiles) {
	const reminderFilePath = path.join(remindersPath, reminderFile);
	const reminder = require(reminderFilePath);

	if (!currentTasks.has(reminder.name)) {
		reminder(process.env.CHANNEL_ID);
	}
}


// Express server
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	const activeTasks = cronJob.getTasks();

	const responseData = {
		'num_of_active_jobs': activeTasks.size,
		'active_jobs': [],
	};

	activeTasks.forEach((_, name) => responseData.active_jobs.push({ name }));
	res.status(200).send(responseData);
});

app.listen(PORT, () => {
	console.log('Express server listening on port', PORT);
});