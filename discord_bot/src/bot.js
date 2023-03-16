const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const TwitchApi = require("node-twitch").default;
const { TwitterApi } = require('twitter-api-v2');
const createDatabaseInstance  = require('../../database/database.js');
const db = createDatabaseInstance(true);
require('dotenv').config({ path: path.resolve(__dirname, '../..', '.env') });

// Set up environment variables
const TOKEN = process.env.TOKEN;
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
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Database listening
db.on('documentAdded', (document) => {
	console.log('A new document was added:', document);
	// Give member role
});

db.on('documentUpdated', (updateDescription) => {
	console.log('A document was updated:', updateDescription);
	// Make sure discord ID didn't change, and if so, remove member role from old ID and add to new
});

db.on('documentDeleted', (documentKey) => {
	console.log('A document was deleted:', documentKey);
	// Remove member role
});

// If membership role changed, replace all old roles with new one
// If reset date change, reset cron job, which removes all roles upon expiration

// Use the addDocument, updateDocument, and deleteDocument functions
// Example usage:
// const newDocumentData = { field1: 'value1', field2: 'value2' };
// database.addDocument(newDocumentData).then((newDocument) => {
//   console.log('Document added:', newDocument);
// });

// Log in to Discord
client.login(TOKEN);