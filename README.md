
### Reminder Bot 

A discord bot for sending out scheduled reminders.

### Scopes and permissions

- bot 
- application.commands (to enable slash commands)
- Send Messages

### Details 

The node-cron package is used to manage reminders using cron expression syntax to specify the schedules.

The discord.js wrapper is used to make it easier to interface with the Discord API.


Currently, cronjobs are shared across all guilds.
We have one large table that maps reminder names to their corresponding cron jobs. 

This should work fine for multiple guilds as users should specify a `channelId` for their reminders. 

But we need to make changes so that users can only see reminders specific to their guild.

### Usage 

#### Starting bot 

```bash 
npm start 
``` 
#### Deploy slash commands 

Deploy commands to all guilds our bot is a member of.

- Only deploy to a single guild for now as we need to keep reminders separate for each guild.

```bash
node deploy-commands-global.js
```


Deploy commands to a specific guild (useful for testing purposes).


```bash
node deploy-commands-guild-specific.js 
```

### Feature list 

Fixed reminders 

- [_] Sends a last working day of the month reminder for users to submit HiBob timesheets.
- [x] Sends a weekly reminder at a fixed time every Friday.
- [x] Sends a lunchtime reminder. 
- [x] Sends a morning greeting reminder. 
- [x] Sends a reminder for every minute.
 

Slash commands

 - [_] Users can update timings of specific reminders.
 - [x] Users can activate/deactivate reminders.
 - [x] Users can view all reminders.
 - [ ] Users can create a reminder.
 - [ ] Users can delete a reminder.



### Backlog 

- [ ] Make reminders under the reminders/ folder guild-specific 
- [ ] Make slash commands interact with guild specific reminders. 
- [ ] Add createReminder slash command to create a guild specific reminder. 
- [ ] Add deleteReminder slash command to delete a guild specific reminder. 
- [ ] Add updateReminder slash command to update a guild specific reminder. 