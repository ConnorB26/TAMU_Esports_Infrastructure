const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection, EmbedBuilder, Intents } = require('discord.js');
const TwitchApi = require("node-twitch").default;
const { TwitterApi } = require('twitter-api-v2');
const { CronJob } = require('cron');
const createDatabaseInstance = require('../database/database.js');
const db = createDatabaseInstance(true);

// Set up environment variables
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;
const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

// Set up Twitter connection
//const twitterClient = new TwitterApi('<YOUR_APP_USER_TOKEN>');
//console.log(twitterClient.v2.userTimeline('')[0]);

// Set up Twitch connection
const twitch = new TwitchApi({
	client_id: TWITCH_CLIENT_ID,
	client_secret: TWITCH_CLIENT_SECRET
});

// Check whether stream is live
let isLiveMemory = false;
const checkLive = async function getStream() {
	await twitch.getStreams({ channel: 'tamuesports' }).then(async data => {
		const result = data.data[0];

		if (result !== undefined) {
			if (result.type === 'live') {
				if (isLiveMemory === false || isLiveMemory === undefined) {
					isLiveMemory = await sendTwitchNotification(result);
				}
			}
		}

		if (result === undefined || result.type !== 'live') {
			isLiveMemory = false;
		}
	})
}

setInterval(checkLive, 15000)

// Send twitch notification embed
async function sendTwitchNotification(streamData) {
	const embed = new EmbedBuilder()
		.setColor(0x500000)
		.setTitle(streamData.title)
		.setURL('https://www.twitch.tv/tamuesports')
		.setImage(streamData.thumbnail_url.replace('{width}x{height}', '1920x1080'));

	return client.channels.fetch(settings["twitch_notif_channel"])
		.then(res => {
			if (res) {
				res.send({ content: `<@&${settings["twitch_notif_role"]}> TAMU eSports is now live on Twitch!`, embeds: [embed] });
				return true;
			}
			return false;
		})
		.catch(err => {
			console.error('Error fetching the channel:', err);
			return false;
		});
}

// Create a new client instance
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildModeration],
});

// Set up custom commands
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Set up events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, db));
	} else {
		client.on(event.name, (...args) => event.execute(...args, db));
	}
}

// Database Interactions
const settings = {
	reset_date: '',
	member_role: '',
	twitch_notif_channel: '',
	twitch_notif_role: '',
	twitter_notif_channel: '',
	twitter_notif_role: '',
};
let resetRoleCronJob;

// Member added (dues paid) event
db.on('addMember', async (payload) => {
	addMemberRole(payload.data.discord_id);
});

// Member removed event
db.on('removeMember', async (payload) => {
	removeMemberRole(payload.data.discord_id);
});

// User deleted event
db.on('userDeleted', async (payload) => {
	removeMemberRole(payload.data.discord_id);
});

// Info updated event
db.on('settingUpdated', async (payload) => {
	const oldValue = payload.old.value;
	const newValue = payload.new.value;
	const key = payload.new.name;

	settings[key] = newValue;

	const guild = client.guilds.cache.get(DISCORD_GUILD_ID);

	// If membership role changed, replace all old roles with new one
	if (key === 'member_role') {
		const oldRoleId = oldValue;
		const newRoleId = newValue;

		const oldRole = guild.roles.cache.get(oldRoleId);
		const newRole = guild.roles.cache.get(newRoleId);

		// Iterate through members with the old role and replace it with the new role
		await guild.members.fetch().then(members => {
			members.each(async member => {
				if (member.roles.cache.has(oldRoleId)) {
					await member.roles.remove(oldRole);
					await member.roles.add(newRole);
				}
			});
		});
	}

	// If reset date changed, reset the cron job to remove all roles upon expiration
	if (key === 'reset_date') {
		// Stop the current cron job
		resetRoleCronJob.stop();

		// Convert the new reset_date value to a cron expression
		const newResetDate = new Date(newValue);
		const newCronExpression = `${newResetDate.getMinutes()} ${newResetDate.getHours()} ${newResetDate.getDate()} ${newResetDate.getMonth() + 1} *`;

		// Create a new cron job with the updated reset_date value
		createCronJob(newCronExpression);

		// Start the new cron job
		resetRoleCronJob.start();
	}

});

// Get user object from id number
async function getUser(id) {
	try {
		const guild = client.guilds.cache.get(DISCORD_GUILD_ID);
		const user = await guild.members.fetch(id);
		return user;
	} catch (error) {
		console.error(`Error fetching member by Discord ID: ${error.message}`);
		return null;
	}
}

// Add member role from specified user
async function addMemberRole(id) {
	// Get user by their id number
	const member = await getUser(id);
	if (!member) {
		return;
	}

	// Get role
	const guild = client.guilds.cache.get(DISCORD_GUILD_ID);
	const memberRole = guild.roles.cache.get(settings['member_role']);

	// Remove member role
	member.roles.add(memberRole);
}

// Remove member role from specified user
async function removeMemberRole(id) {
	// Get user by their id number
	const member = await getUser(id);
	if (!member) {
		return;
	}

	// Get role
	const guild = client.guilds.cache.get(DISCORD_GUILD_ID);
	const memberRole = guild.roles.cache.get(settings['member_role']);

	// Remove member role
	member.roles.remove(memberRole);
}

async function fetchInitialSettings() {
	await db.connect();
	const allSettings = await db.getAllSettings();
	allSettings.forEach(data => {
		settings[data.name] = data.value;
	});
}

async function createCronJob(expression) {
	resetRoleCronJob = new CronJob(expression, async () => {
		// Your logic for resetting roles goes here
		const memberRoleId = settings['member_role'];

		// Loop through the guild members and remove the member_role from each member who has it
		await guild.members.fetch().then(members => {
			members.each(async member => {
				if (member.roles.cache.has(memberRoleId)) {
					await member.roles.remove(memberRoleId);
				}
			});
		});

		// Reset database info
		await db.resetDues();

		// Stop the cron job after it has executed once
		resetRoleCronJob.stop();
	}, {
		scheduled: false,
		timezone: 'America/Chicago'
	});
}

fetchInitialSettings().then(async () => {
	// Convert the reset_date value to a cron expression
	const resetDate = new Date(settings['reset_date']);
	const cronExpression = `${resetDate.getMinutes()} ${resetDate.getHours()} ${resetDate.getDate()} ${resetDate.getMonth() + 1} *`;

	// Create the cron job with the reset_date value
	createCronJob(cronExpression);

	// Start the cron job
	resetRoleCronJob.start();

	// Log in to Discord
	await client.login(DISCORD_TOKEN);
});