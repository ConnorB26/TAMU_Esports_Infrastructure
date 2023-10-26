import { config, rateLimit } from "./utilities/config";
import { commands } from "./commands";
import { client } from "./utilities/config";
import { populateCaches } from "./utilities/populateCache";
import roleCommandCache from "./cache/roleCommandCache";
import { variableCache } from "./models/variableCache";
import { startTwitchPolling } from "./services/twitchService";
import { CommandInteractionOptionResolver, Events } from "discord.js";
import { cleanupMembership } from "./utilities/membership";
import { registerUser } from "./utilities/users";
import { create, update, findOne } from "./services/qotdLeaderboardService";
import { User } from "./models/user";
import EventSource from 'eventsource';
import * as userService from './services/userService';
import discordSettingCache from "./cache/discordSettingCache";
import botVariableCache from "./cache/botVariableCache";


// Setup bot
client.once(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user?.tag}!`);

    // Start twitch polling
    startTwitchPolling();
});

// Howdy reply
client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return;

    if (message.mentions.users.has(client.user!.id) && message.content.toLowerCase().includes('howdy')) {
        message.reply('Howdy!');
    }
});

// QOTD Event Handling
client.on(Events.MessageCreate, async (message) => {
    if (botVariableCache.get("qotd_asked") && message.channelId !== discordSettingCache.get("qotd_channel_id")){
        if (message.reference && message.reference.messageId){
            const user_reply = await message.channel.messages.fetch(message.reference.messageId);

            // someone asked the question of the day
            if (user_reply.id == botVariableCache.get("qotd_question")){
                // check if user has already asked this question today
                const qotd_responses = botVariableCache.get("qotd_responses") || [];

                if (qotd_responses.includes(message.author.id)){
                    await message.reply({content: "You have already asked a question of the day today!"});
                }else{
                    qotd_responses.push(message.author.id);
                    botVariableCache.set("qotd_responses", qotd_responses);

                    console.log(botVariableCache.get("qotd_responses"));

                    // add a point to the user in the database
                    const user = await findOne(message.author.id);
                    if (user){
                        await update(message.author.id, {score: user.score + 1});
                    }else{
                        await create({discord_id: message.author.id, score: 1});
                    }
                }
            }
        }
    }
})


// Command handling
let apiConnected = false;

const userCommandTimestamps = new Map<string, number[]>();
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand() || !interaction.guild) {
        return;
    }

    if (!apiConnected) {
        await interaction.reply({ ephemeral: true, content: 'There was an error retrieving information, please try again later.' });
        return;
    }

    const commandName = interaction.commandName;
    let fullCommandName = commandName;
    const userId = interaction.user.id;

    // Check if there's a subcommand group
    const opts = interaction.options as CommandInteractionOptionResolver;
    if (opts.getSubcommandGroup(false)) {
        fullCommandName += ` ${opts.getSubcommandGroup()}`;
    }

    // Check if there's a subcommand
    if (opts.getSubcommand(false)) {
        fullCommandName += ` ${opts.getSubcommand()}`;
    }

    // Get the user roles from the interaction
    let memberRoles: string[] = [];
    if ('cache' in interaction.member!.roles) {
        memberRoles = interaction.member?.roles.cache.map(role => role.id) || [];
    }

    // Check if user can execute the command
    const hasPermission = memberRoles?.some(roleId => {
        const roleCommands = roleCommandCache.get(roleId);
        return roleCommands && (roleCommands.includes(fullCommandName) || roleCommands.includes(`${commandName} *`) || roleCommands.includes('All'));
    });

    if (!hasPermission) {
        await interaction.reply({ ephemeral: true, content: 'You do not have permission to execute this command.' });
        return;
    }

    // Rate limit
    const now = Date.now();
    const timestamps = userCommandTimestamps.get(userId) || [];

    const rateLimitWindowMillis = rateLimit.minutes * 60 * 1000;
    const relevantTimestamps = timestamps.filter(ts => now - ts < rateLimitWindowMillis);

    if (relevantTimestamps.length >= rateLimit.commands) {
        const timeLeft = ((relevantTimestamps[0] + rateLimitWindowMillis - now) / 1000).toFixed(0);
        await interaction.reply({ ephemeral: true, content: `You are trying to execute too many commands in a short time. Please wait ${timeLeft} seconds before trying again.` });
        return;
    }

    // Execute command
    if (commands[commandName as keyof typeof commands]) {
        relevantTimestamps.push(now);
        userCommandTimestamps.set(userId, relevantTimestamps);

        commands[commandName as keyof typeof commands].execute(interaction);
    }
});

// Error event handler
client.on(Events.Error, (error) => {
    console.error('Error occurred:', error.message);
});

// Clear up data of anyone who has been kicked/banned or has left the main server
client.on(Events.GuildMemberRemove, async member => {
    if (member.guild.id !== config.DISCORD_GUILD_ID) {
        return;
    }

    cleanupMembership(member.id);
});

// Handle modal submissions
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isModalSubmit()) return;
    await interaction.deferReply({ ephemeral: true });

    switch (interaction.customId) {
        case 'register':
            const uin = interaction.fields.getTextInputValue('uinInput');
            const firstName = interaction.fields.getTextInputValue('firstNameInput');
            const lastName = interaction.fields.getTextInputValue('lastNameInput');
            const email = interaction.fields.getTextInputValue('emailInput');

            const user: User = {
                uin: uin,
                first_name: firstName,
                last_name: lastName,
                email: email,
                discord_id: interaction.user.id,
                has_paid_dues: false
            };

            try {
                await registerUser(user);
                await interaction.editReply(`You have registered successfully!`);
            } catch (error) {
                await interaction.editReply(`${error}`);
            }
            break;
        case 'edit':
            const oldUser: User = await userService.findOneDiscord(interaction.user.id);
            const newFirstName = interaction.fields.getTextInputValue('firstNameInput');
            const newLastName = interaction.fields.getTextInputValue('lastNameInput');
            const newEmail = interaction.fields.getTextInputValue('emailInput');

            const newUser: User = {
                uin: oldUser.uin,
                first_name: newFirstName,
                last_name: newLastName,
                email: newEmail,
                discord_id: interaction.user.id,
                has_paid_dues: oldUser.has_paid_dues
            };

            try {
                await userService.update(oldUser.uin, newUser);
                await interaction.editReply(`You have updated your profile successfully!`);
            } catch (error) {
                await interaction.editReply(`${error}`);
            }
            break;
    }
});

// Server sent events
const headers = {
    'Authorization': `Bearer ${config.BACKEND_DISCORD_TOKEN}`
};
const eventSource = new EventSource(`${config.BASE_URL}/sse`, { headers: headers });
eventSource.onmessage = ({ data }) => {
    const parsedData = JSON.parse(data);
    console.log('Received SSE message:', parsedData);
};

eventSource.onerror = (event: MessageEvent & { message?: string }) => {
    const errorMessage = event.message;

    if (!errorMessage) {
        console.error('Error occurred with no message:', event);
        return;
    }

    if (errorMessage.includes('ECONNREFUSED') || errorMessage.includes('EAI_AGAIN')) return;

    console.error('Error occurred:', errorMessage);
};

eventSource.onopen = async () => {
    await populateCaches();
    apiConnected = true;
};

// Log in bot
client.login(config.DISCORD_TOKEN);