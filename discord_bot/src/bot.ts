import { config } from "./utilities/config";
import { commands } from "./commands";
import { client } from "./utilities/config";
import { createWebsocket } from "./utilities/websocket";
import { initializeSettings, updateSetting } from "./utilities/settings";

// Setup bot
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

// Setup settings
const settings = {}//getAllSettings();
initializeSettings(settings);

// Create a WebSocket connection to the server
function handleMessage(data: any) {
    console.log(data);
    switch (data.event) {
        case 'addMember':
            break;
        case 'removeMember':
            break;
        case 'settings_changed':
            updateSetting(data.new.name, data.new.value);
            break;
        default:
            console.log(`Unhandled event: ${data.event}`);
            break;
    }
}

createWebsocket(handleMessage);