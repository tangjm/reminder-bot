const cronJob = require('node-cron');

// Express server
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
	const activeTasks = cronJob.getTasks();

	const responseData = {
		'number_of_reminders': activeTasks.size,
		'reminders': [],
	};

	activeTasks.forEach((_, name) => responseData.reminders.push({ name }));
	res.status(200).send(responseData);
});

app.listen(PORT, () => {
	console.log('Express server listening on port', PORT);
});

