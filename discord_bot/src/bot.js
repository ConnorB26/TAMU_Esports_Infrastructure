const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection, EmbedBuilder, Intents } = require('discord.js');
const TwitchApi = require("node-twitch").default;
const { TwitterApi } = require('twitter-api-v2');
const { CronJob } = require('cron');
const createDatabaseInstance = require('../../database/database.js');
const db = createDatabaseInstance(true);
require('dotenv').config({ path: path.resolve(__dirname, '../..', '.env') });

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
					sendTwitchNotification(result);
					isLiveMemory = true;
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
const streamNotificationChannelID = '1084332794328666115'; // 1058623616905916486
const streamPingID = '1084722237568974929'; // 1058617568178479104
async function sendTwitchNotification(streamData) {
	const embed = new EmbedBuilder()
		.setColor(0x500000)
		.setTitle(streamData.title)
		.setURL('https://www.twitch.tv/tamuesports')
		.setImage(streamData.thumbnail_url.replace('{width}x{height}', '1920x1080'))

	client.channels.cache.get(streamNotificationChannelID).send({ content: `<@&${streamPingID}> TAMU eSports is now live on Twitch!`, embeds: [embed] });
}

// Create a new client instance
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences],
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
const infoData = {
	reset_date: '',
	member_role: '',
	twitch_notif_channel: '',
	twitch_notif_role: '',
	twitter_notif_channel: '',
	twitter_notif_role: '',
};
let resetRoleCronJob;

// User added event
db.on('userAdded', async (payload) => {
	//console.log('A new user was added:', payload);
	const userTag = payload.new.discordId;

	// Give member role
	const guild = client.guilds.cache.get(DISCORD_GUILD_ID);
	const role = guild.roles.cache.get(infoData['member_role']);

	// Get member
	const member = await getUserByTag(userTag);
	if (!member) {
		return;
	}
	await member.roles.add(role);
});

// User updated event
db.on('userUpdated', async (payload) => {
	//console.log('A user was updated:', payload);

	const oldUserTag = payload.old.discordId;
	const newUserTag = payload.new.discordId;

	// Only change roles if the discord IDs are different
	if(oldUserTag === newUserTag) {
		return;
	}

	// Give next discord id member role and remove from old
	const guild = client.guilds.cache.get(DISCORD_GUILD_ID);
	const role = guild.roles.cache.get(infoData['member_role']);

	const oldMember = await getUserByTag(oldUserTag);
	if (oldMember) {
		oldMember.roles.remove(role);
	}

	const newMember = await getUserByTag(newUserTag);
	if (newMember) {
		newMember.roles.add(role);
	}
});

// User deleted event
db.on('userDeleted', async (payload) => {
	//console.log('A user was deleted:', payload);

	// Remove member role
	const userTag = payload.old.discordId;
	const guild = client.guilds.cache.get(DISCORD_GUILD_ID);
	const role = guild.roles.cache.get(infoData['member_role']);

	const oldMember = await getUserByTag(userTag);
	if (!oldMember) {
		return;
	} else {
		oldMember.roles.remove(role);
	}
});

// Info updated event
db.on('infoUpdated', async (payload) => {
	//console.log('An info field was updated:', payload);

	const guild = client.guilds.cache.get(DISCORD_GUILD_ID);

	const oldValue = payload.old.value;
	const newValue = payload.new.value;
	const key = payload.new.info;

	infoData[key] = newValue;

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

async function syncMemberRoles() {
	// Retrieve all Discord tags from the database
	const users = await db.getAllUsers().select('discordId');
	const discordTags = users.map(user => user.discordId);

	// Get the guild and the member role
	const guild = client.guilds.cache.get(DISCORD_GUILD_ID);
	const memberRole = guild.roles.cache.get(infoData['member_role']);

	// Iterate through all guild members
	guild.members.cache.each(async (member) => {
		// Check if the member has the member role
		if (member.roles.cache.has(memberRole.id)) {
			// If the member is not in the list of valid Discord tags, remove the role
			if (!discordTags.includes(member.user.tag)) {
				await member.roles.remove(memberRole);
				console.log(`Role '${memberRole.name}' removed from '${member.user.tag}'`);
			}
		}
	});
}

async function getUserByTag(tag) {
	const guild = client.guilds.cache.get(DISCORD_GUILD_ID);
	const members = await guild.members.fetch();
	return members.find(m => m.user.tag === tag);
}

async function fetchInitialInfoData() {
	await db.connect();
	const allInfoData = await db.getAllInfo();
	allInfoData.forEach(data => {
		infoData[data.info] = data.value;
	});
}

async function createCronJob(expression) {
	resetRoleCronJob = new CronJob(expression, async () => {
		// Your logic for resetting roles goes here
		const memberRoleId = infoData['member_role'];

		// Loop through the guild members and remove the member_role from each member who has it
		await guild.members.fetch().then(members => {
			members.each(async member => {
				if (member.roles.cache.has(memberRoleId)) {
					await member.roles.remove(memberRoleId);
				}
			});
		});

		// Stop the cron job after it has executed once
		resetRoleCronJob.stop();
	}, {
		scheduled: false,
		timezone: 'America/Chicago'
	});
}

fetchInitialInfoData().then(async () => {
	// Convert the reset_date value to a cron expression
	const resetDate = new Date(infoData['reset_date']);
	const cronExpression = `${resetDate.getMinutes()} ${resetDate.getHours()} ${resetDate.getDate()} ${resetDate.getMonth() + 1} *`;

	// Create the cron job with the reset_date value
	createCronJob(cronExpression);

	// Start the cron job
	resetRoleCronJob.start();

	// Log in to Discord
	client.login(DISCORD_TOKEN);
});