
### Reminder Bot 

A simple discord bot for setting up and managing scheduled reminders.

### Required scopes and permissions

- bot 
	- Send Messages
	- Mention Everyone
- application.commands (to enable slash commands)

### Details 

The node-cron package is used to manage reminders using cron expression syntax to specify the schedules.

The discord.js wrapper is used to make it easier to interface with the Discord API.

The design is based on a data-directed programming style.

### Usage 

Invite bot

[Invitation url](https://discord.com/oauth2/authorize?client_id=1036686395797934121&permissions=133120&scope=bot%20applications.commands)

#### Starting bot 

```bash 
npm start 
``` 

#### Deploy slash commands 

Deploy commands to all guilds our bot is a member of.

```bash
node deploy-commands-global.js
```

Deploy commands to a specific guild (useful for testing purposes).


```bash
node deploy-commands-guild-specific.js 
```

Remove guild specific test commands

```bash
node deploy-commands-guild-specific-reset.js
```

### Feature list 

Default reminders 

- [x] Sends a weekly 5pm reminder every Friday.
- [x] Sends a lunchtime reminder. 
- [x] Sends a morning greeting reminder. 
- [x] Sends a reminder for every minute.
 

Slash commands

 - [ ] Users can update timings of specific reminders.
 - [x] Users can activate/deactivate reminders.
 - [x] Users can view all reminders.
 - [x] Users can create a reminder.
 - [ ] Users can delete a reminder.



