require('dotenv').config();
const pg = require('pg');
const express = require('express');
const cronJob = require('node-cron');
const fs = require('node:fs');
const path = require('node:path');

const { install_generic_operations_on_reminders } = require('./genericOperations.js');

install_generic_operations_on_reminders();

// Log in Reminder Discord Bot
const { Client, GatewayIntentBits, Collection } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Setup slash commands
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	else {
		console.log(
			`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
		);
	}
}

// Setup with event handlers
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


client.login(process.env.DISCORD_TOKEN);

// Express server
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/reminders', (req, res) => {
	const activeTasks = cronJob.getTasks();

	const responseData = {
		'number_of_reminders': activeTasks.size,
		'reminders': [],
	};

	activeTasks.forEach((_, name) => responseData.reminders.push({ name }));
	res.status(200).send(responseData);
});

app.get('/', (req, res) => {
	if (!client.isReady()) {
		client.login(process.env.DISCORD_TOKEN)
			.then(console.log)
			.catch(console.error);
	}
	res.send('Client is ready: ' + client.isReady());
});

app.listen(PORT, () => {
	console.log('Express server listening on port', PORT);
});

// Connect to PostgresSQL database

// const connectionString = `postgres://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}/${process.env.PG_DATABASE}`;

// const pgClient = new pg.Client(connectionString);

// pgClient.connect(function(err) {
// 	if (err) {
// 		return console.err('Could not connect to postgres', err);
// 	}
// 	console.log('Ready! Copnnected to postgres');
// 	pgClient.query('SELECT NOW() AS time', function(err, result) {
// 		if (err) {
// 			return console.err('Error running query', err);
// 		}
// 		console.log(result);
// 		console.log(result.rows[0].time);
// 		pgClient.end();
// 	});
// });
