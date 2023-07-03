import { config } from "./config";
import { commands } from "./commands";
import { updateSettings } from './store/settingsStore';
import { client } from "./config";
import WebSocket from 'ws';

client.once("ready", () => {
    console.log("Discord bot is ready! 🤖");
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
        commands[commandName as keyof typeof commands].execute(interaction);
    }
});

client.login(config.DISCORD_TOKEN);

// Create a WebSocket connection to the server
const ws = new WebSocket(`ws://backend:8080`, {
    headers: {
        Authorization: `Bearer ${config.WEB_SOCKET_TOKEN}`
    }
});

ws.on('open', function open() {
    console.log('connected');
});

ws.on('close', function close() {
    console.log('disconnected');
});

ws.on('message', function incoming(message) {
    console.log(message);
    const data = JSON.parse(message.toString());
    console.log(`Received: ${data}`);

    switch (data.event) {
        case 'addMember':
            break;
        case 'removeMember':
            break;
        case 'settingUpdated':
            break;
        default:
            console.log(`Unhandled event: ${data.event}`);
    }
});